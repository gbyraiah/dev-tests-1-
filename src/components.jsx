import React from "react";
import { connect } from "react-redux";

import {
  fetchAddresses,
  fetchEvents,
  fetchSelectedEventDetails
} from "./thunks";
import { eventGuid, canSelectEvents, undeletedAddresses } from "./selectors";
import "./index.css";

//--> User select form

let UserSelectForm = ({ dispatch, userIds, selectedUserId, photo }) => {
  console.log(photo[0].links.download);
  return (
    <>
      {userIds.map(id => {
        return (
          <>
            <div key={id} value={id}>
              {id.title}
            </div>
            <div className="fade-in-text">
              <p>{id.body}</p>
            </div>
          </>
        );
      })}
      <img src={photo[0].links.download}></img>
    </>
  );
};
UserSelectForm = connect(state => state)(UserSelectForm);

let App = ({
  addresses,
  events,
  userIds,
  photo,
  selectedUserId,
  selectedAddressId,
  comparingEvents,
  error,
  openModalPopup
}) => {
  console.log(photo);
  return (
    <>
      {error ? <p className="error">{error}</p> : ""}
      {userIds && userIds.length ? (
        <UserSelectForm
          userIds={userIds}
          photo={photo[0].links.download}
          selectedUserId={selectedUserId}
        />
      ) : (
        ""
      )}
    </>
  );
};
App = connect(state => {
  return {
    addresses: undeletedAddresses(state.addresses),
    ...state
  };
})(App);

export { App };
