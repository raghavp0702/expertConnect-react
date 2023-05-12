import React, { useEffect, useState } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { getAllUsers, getConnections,getCurrentUser } from "../../../api/FirestoreAPI";
import { firestore } from "../../../firebaseConfig";
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  query,
  where,
  setDoc,
  deleteDoc,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

export default function UsersFromCategories({ user, getCurrentUser, nowUser }) {

  const [isConnected, setIsConnected] = useState(false);
  const [allConnectedUsers, setAllConnectedUsers] = useState([]); //
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  
let userRef = collection(firestore, "users");

const getConnections = (userId, targetId, setIsConnected) => {

  // console.log(currentUser);

  // let userQuery = query(userRef,where("categorySelected", "array-contains", currentUser.categorySelected))
  // onSnapshot(userQuery, (response) => {
  //   const users = [];

  //   querySnapshot.forEach((doc) => {
  //     const user = doc.data();
  //     users.push(user);
  //   });

  //   const isAnyUserMatching = users.some((user) => {
  //     // Perform additional checks or comparisons if needed
  //     return user.categorySelected === currentUser.categorySelected;
  //   });

  //   setIsConnected(isAnyUserMatching);

  
};

  useEffect(() => {
    getConnections(currentUser.id, user.id, setIsConnected);
    getAllUsers(setUsers);
    getCurrentUser(setCurrentUser);

    // setAllConnectedUsers( getConnections(currentUser.id,user.id,true));
  }, [currentUser.id, user.id]);

  return isConnected ? (
    <></>
  ) : (
    <div>
    <div className="grid-child">
      <img src={user.imageLink} />
      <p className="name">{user.name}</p>
      <p className="headline">{user.headline}</p>

      <button onClick={() => getCurrentUser(user.id)}>
        <AiOutlineUsergroupAdd size={20} color={"red"} />
        Connected
      </button>
    </div>
    </div>
  );
}
