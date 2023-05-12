import React, { useEffect, useState } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
// import { getConnections } from "../../../api/FirestoreAPI";
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
  getDoc,
  deleteDoc,
  orderBy,
  FieldPath,
  serverTimestamp,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
// const db = firebase.firestore();

export default function NotConnected({ user, getCurrentUser, currentUser }) {
  let navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(true);


  let userRef = collection(firestore,"users");
function getCurrentUser(id){
    // console.log(`${id} + ${currentUser.id}`); 
       addConnection(currentUser.id, id);
  };

  return (

    <div>

    <div className="grid-child">
      <img src={user.imageLink} />
      <p className="name">{user.name}</p>
      <br />
      <p className="headline">{user.headline}</p>
      {/* {console.log(user)} */}
      <button onClick={() => navigate("/profile", {
                state: { id: user.id, email: user.email },
              })}>
        <AiOutlineUsergroupAdd size={20} color={"red"} />
        View Profile
      </button>
    </div>
    </div>
       )
}
