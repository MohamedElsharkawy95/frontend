import React, { useState } from "react";
import Constants from '../src/utilities/Constants'
import UserCreateForm from "./Components/UserCreateForm";
import UserUpdateForm from "./Components/UserUpdateForm";

export default function App() {
  const [users, setusers] = useState([]);
  const [showingCreateNewuserForm, setShowingCreateNewuserForm] = useState(false);
  const [userCurrentlyBeingUpdated, setuserCurrentlyBeingUpdated] = useState(null);

  function getusers() {
    const url = Constants.API_URL_GET_ALL_POSTS;

    fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(usersFromServer => {
        console.log(usersFromServer);
        setusers(usersFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  function deleteuser(userId) {
    const url = `${Constants.API_URL_DELETE_POST_BY_ID}/${userId}`;

    fetch(url, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(responseFromServer => {
        console.log(responseFromServer);
        onuserDeleted(userId);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  return (
    <div className="container">
      <div className="row min-vh-100">
        <div className="col d-flex flex-column justify-content-center align-items-center">
          {(showingCreateNewuserForm === false && userCurrentlyBeingUpdated === null) && (
            <div>
              <h1>ASP.NET Core React Tutorial</h1>

              <div className="mt-5">
                <button onClick={getusers} className="btn btn-dark btn-lg w-100">Get users</button>
                <button onClick={() => setShowingCreateNewuserForm(true)} className="btn btn-secondary btn-lg w-100 mt-4">Create New user</button>
              </div>
            </div>
          )}

          {(users.length > 0 && showingCreateNewuserForm === false && userCurrentlyBeingUpdated === null) && renderusersTable()}

          {showingCreateNewuserForm && <UserCreateForm onuserCreated={onuserCreated} />}

          {userCurrentlyBeingUpdated !== null && <UserUpdateForm user={userCurrentlyBeingUpdated} onuserUpdated={onuserUpdated} />}
        </div>
      </div>
    </div>
  );

  function renderusersTable() {
    return (
      <div className="table-responsive mt-5">
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope="col">ActivityId</th>
              <th scope="col">Description</th>
              <th scope="col">Grade</th>
              <th scope="col">CRUD Operations</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>{user.description}</td>
                <td>{user.grade}</td>
                <td>
                  <button onClick={() => setuserCurrentlyBeingUpdated(user)} className="btn btn-dark btn-lg mx-3 my-3">Update</button>
                  <button onClick={() => { if(window.confirm(`Are you sure you want to delete the user titled "${user.title}"?`)) deleteuser(user.id) }} className="btn btn-secondary btn-lg">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    );
  }

  function onuserCreated(createduser) {
    setShowingCreateNewuserForm(false);

    if (createduser === null) {
      return;
    }

    alert(`user successfully created. After clicking OK, your new user tilted "${createduser.title}" will show up in the table below.`);

    getusers();
  }

  function onuserUpdated(updateduser) {
    setuserCurrentlyBeingUpdated(null);

    if (updateduser === null) {
      return;
    }

    let usersCopy = [...users];

    const index = usersCopy.findIndex((usersCopyuser, currentIndex) => {
      if (usersCopyuser.userId === updateduser.userId) {
        return true;
      }
    });

    if (index !== -1) {
      usersCopy[index] = updateduser;
    }

    setusers(usersCopy);

    alert(`user successfully updated. After clicking OK, look for the user with the title "${updateduser.title}" in the table below to see the updates.`);
  }

  function onuserDeleted(deleteduseruserId) {
    let usersCopy = [...users];

    const index = usersCopy.findIndex((usersCopyuser, currentIndex) => {
      if (usersCopyuser.userId === deleteduseruserId) {
        return true;
      }
    });

    if (index !== -1) {
      usersCopy.splice(index, 1);
    }

    setusers(usersCopy);

    alert('user successfully deleted. After clicking OK, look at the table below to see your user disappear.');
  }
}
