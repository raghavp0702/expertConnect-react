import React, { useEffect, useMemo, useState } from "react";
import Connections from "../Pages/Connections";
import Topbar from "../components/common/Topbar";
import { firestore } from "../firebaseConfig";
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
} from "firebase/firestore";
import { getAllUsers, addConnection, getCurrentUser } from "../api/FirestoreAPI";
import ConnectedUsers from "../components/common/ConnectedUsers/index";
import NotConnected from "../components/common/ConnectedUsers/notConnected";

import UsersFromCategories from "../components/common/ConnectedUsers/usersFromCategories";

import "../Sass/ConnectionsComponent.scss";

export default function ConnectionLayout() {
  const [currentUser, setCurrentUser] = useState({});
  const [users, setUsers] = useState([]);
  const [userConnections ,setUserConnections] = useState([]);
  
  // let userRef = collection(firestore, "users");
  // let connectionRef = collection(firestore, "connections");
  const [loginUser, setLoginUser] =useState([]);
  
    useMemo(() => {
      getCurrentUser(setCurrentUser);
      // console.log(currentUser);
    }, []);


  function getAllConnections(currentUser) {
    try {
      console.log(currentUser);
      const userRef = doc(firestore,"users",currentUser);
      const userDoc = getDoc(userRef);
      if(!userDoc)
      {
        console.log("No such document!");
      }
      else
      { 
        setLoginUser(userDoc.data());
      }
      console.log(loginUser);
        const connectionIds = loginUser.userConnections;
        const connections = [];
  
        for (const connectionId of connectionIds) {
          const connectionRef = doc(collection(firestore, "connections"), connectionId);
          // const connect = query(connectionRef, where("id", "==", connectionId));
          const unsubscribe = onSnapshot(connectionRef, (connectionDoc) => {
            const connection = connectionDoc.data();
            connections.push(connection);
            console.log("Updated connections:", connections);
          });
        }
        setUserConnections(connections);
        console.log(connections);

      } catch (error) {
      console.log("Error retrieving connections: ", error);
    }
  }


  
  // useEffect(() => {
  //   getAllUsers(setUsers);
  //   getAllConnections(currentUser);
  //   // console.log(currentUser);
  // }, []);




  return (
    <div >
      <Topbar currentUser={currentUser} />
      <Connections currentUser={currentUser} />
      
    </div>
  );
}
