import React, { useEffect, useState } from "react";
import { auth, firestore } from "../firebaseConfig";
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  query,
  where,
  setDoc,
  getDoc,
  deleteDoc,
  orderBy,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { getAllUsers, addConnection, getCurrentUser } from "../api/FirestoreAPI";
import ConnectedUsers from "./common/ConnectedUsers";
import NotConnected from "./common/ConnectedUsers/notConnected";

import UsersFromCategories from "./common/ConnectedUsers/usersFromCategories";

import "../Sass/ConnectionsComponent.scss";

export default function ConnectionsComponent({ currentUser }) {
  const [users, setUsers] = useState([]);
  const [userConnections ,setUserConnections] = useState([]);
  const [connectedUsers , setConnectedUsers] = useState([]);
  
  // let userRef = collection(firestore, "users");
  // let connectionRef = collection(firestore, "connections");
  const [loginUser, setLoginUser] =useState([]);


 function getAllConnections(currentUser) {
    try {
      const usersRef = collection(firestore, "users");
    // create query object
    // const q = query(usersRef, where("uid", "not-in", [user1]));
    // console.log(auth.currentUser);
    const  q = query(usersRef,where("email","==",auth.currentUser.email))
    // console.log(q);
    // execute query
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      let connections = users[0].userConnections;
      // console.log(users[0]);
      // console.log(connections);

      // const g = query(usersRef, where("uid", "not-in", [user1]));
      const g = query(usersRef, where("uid", "in", connections));
    getDocs(g)
    .then((querySnapshot) => {
      // console.log("QuerySnapshot:", querySnapshot);
    if (!querySnapshot.empty) {
      const listusers = querySnapshot.docs.map((doc) => doc.data());
      setConnectedUsers(listusers);
      // console.log("Users found:", listusers);
    } else {
      console.log("No users found with IDs in connections array.");
    }
  })})

      } catch (error) {
      console.log("Error retrieving connections: ", error);
    }
  }

  useEffect(() => {
    getAllUsers(setUsers);
    getAllConnections(currentUser);
    // console.log(currentUser);
  }, []);


  return users.length > 1 ? (
    <div >
      {/* {console.log(users)} */}
      <h3>Grow your network by following them</h3>
    <div className="connections-main" >

      {users.map((user) => {
        return user.id === currentUser.id ? (
          
          <></>
          ) : (
            <div>
          <ConnectedUsers
            currentUser={currentUser}
            user={user}
            // getCurrentUser={getCurrentUser}
            />
          </div>
        );
      })}
    </div>
    <br />
    <h3>Your connections</h3>
    <div className="connections-main">
      {connectedUsers.map((user) => {
        return (
            <div>
          <NotConnected
            currentUser={currentUser}
            user={user}
            // getCurrentUser={getCurrentUser}
            />
            </div>
        )
      })}
    </div>
    <br />
    {/* <h3>from Categories</h3>
    <div className="connections-main">
      {users.map((user) => {
        return user.id === currentUser.id ? (
          <></>
          ) : (
            <div>
          <UsersFromCategories
            currentUser={currentUser}
            user={user}
            // getCurrentUser={getCurrentUser}
            />
            </div>
        );
      })}
    </div> */}
      </div>
  ) : (
    <div className="connections-main">No Connections to Add!</div>
  );
}
