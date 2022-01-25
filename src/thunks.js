import { actions } from "./redux-store";

import { createApi } from "unsplash-js";
const API_BASE = "https://jsonplaceholder.typicode.com";
const addresses = [
  {
    id: "11de72d0-1f95-11e9-9a66-219542f4f9e9",
    user_id: "44fe83d5-a6be-4b2d-934f-1c13796bb569",
    street_one: "123 Main Street",
    street_two: null,
    city: "San Francisco",
    state: "CA",
    zip_code: "94109",
    country: "US",
    created_at: "2019-01-24T05:01:12.191Z",
    updated_at: "2019-01-24T05:01:12.191Z",
    deleted_at: null
  },
  {
    id: "1c190260-1f95-11e9-9a66-219542f4f9e9",
    user_id: "44fe83d5-a6be-4b2d-934f-1c13796bb569",
    street_one: "234 Elm Street",
    street_two: null,
    city: "Oakland",
    state: "CA",
    zip_code: "94618",
    country: "US",
    created_at: "2019-01-24T05:01:29.351Z",
    updated_at: "2019-01-24T05:01:29.351Z",
    deleted_at: null
  }
];
const fetch_retry = (url, options, n = 5) =>
  fetch(url, options).catch(function(error) {
    if (n === 1) throw error;
    return fetch_retry(url, options, n - 1);
  });
const fetchUserIds = () => async dispatch => {
  const rndNumber = Math.floor(Math.random() * (10 - 1 + 1) + 1);
  const unsplash = createApi({
    accessKey: "g1P4DxsJtrMxNsrZsCVO-LBkqdUoWto7sQ0auqpQB7I"
  });
  await unsplash.photos
    .getRandom({
      count: 1
    })
    .then(result => {
      if (result.errors) {
        // handle error here
        console.log("error occurred: ", result.errors[0]);
      } else {
        // handle success here
        const photo = result.response;
        console.log(photo);
        dispatch({
          type: actions.FETCH_PHOTO,
          payload: photo
        });
      }
    });
  //return (
  fetch_retry("https://quotes.rest/quote/random?language=en&limit=1");
  return fetch_retry(`${API_BASE}/posts/${rndNumber}`)
    .then(
      response => {
        if (!response.ok) {
          return dispatch({
            type: actions.FETCH_USERS_ERROR
          });
        }

        return response.json();
      },
      err => {
        throw err;
      }
    )
    .then(
      data => {
        data = [data];
        return dispatch({
          type: actions.FETCH_USERS_SUCCESS,
          payload: data
        });
      },
      err => {
        return dispatch({
          type: actions.FETCH_USERS_ERROR
        });
      }
    );
};

const fetchAddresses = userId => dispatch => {
  return fetch(`${API_BASE}/posts/${userId}`)
    .then(
      response => {
        if (!response.ok) {
          return dispatch({
            type: actions.FETCH_ADDRESS_ERROR
          });
        }

        return response.json();
      },
      err => {
        throw err;
      }
    )
    .then(
      data => {
        return dispatch({
          type: actions.FETCH_ADDRESS_SUCCESS,
          payload: addresses
        });
      },
      err => {
        return dispatch({
          type: actions.FETCH_ADDRESS_ERROR
        });
      }
    );
};

const fetchEvents = addressId => dispatch => {
  return fetch(`${API_BASE}/posts/1`)
    .then(
      response => {
        if (!response.ok) {
          return dispatch({
            type: actions.FETCH_EVENTS_ERROR
          });
        }

        return response.json();
      },
      err => {
        throw err;
      }
    )
    .then(
      data => {
        return dispatch({
          type: actions.FETCH_EVENTS_SUCCESS,
          payload: addresses.find(a => a.id === addressId)
        });
      },
      err => {
        return dispatch({
          type: actions.FETCH_EVENTS_ERROR
        });
      }
    );
};

const fetchSelectedEventDetails = () => (dispatch, getState) => {
  const { selectedEvents, events } = getState();
  return Promise.all(
    events
      .filter(event => {
        return !!selectedEvents[event.created_at + "-" + event.id];
      })
      .map(event => {
        return fetch(API_BASE + event.url).then(
          response => {
            if (!response.ok) {
              throw new Error("Failed request");
            }
            return response.json();
          },
          err => {
            throw err;
          }
        );
      })
  )
    .then(values => {
      return dispatch({
        type: actions.EVENT_DETAILS_SUCCESS,
        payload: values
      });
    })
    .catch(err => {
      return dispatch({
        type: actions.EVENT_DETAILS_ERROR,
        payload: err
      });
    });
};

export { fetchUserIds, fetchAddresses, fetchEvents, fetchSelectedEventDetails };
