import React, { useEffect,useMemo, useState } from "react";
import { firestore, auth, storage } from "../../../firebaseConfig";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import User from "./components/User";
import MessageForm from "./components/MessageForm";
import Message from "./components/Message";
import "./chat.scss";

import { getCurrentUser } from "../../../api/FirestoreAPI";


export default function Home(){
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  // const [img, setImg] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [currentUser , setCurrentUser] = useState([]);
  
  // let user1 = "";
  // setImg(user1.imageLink);

  useEffect(() => {
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
      setCurrentUser(users[0]);
      console.log(currentUser);
      // const g = query(usersRef, where("uid", "not-in", [user1]));
      const g = query(usersRef, where("uid", "in", connections));
    getDocs(g)
    .then((querySnapshot) => {
      // console.log("QuerySnapshot:", querySnapshot);
    if (!querySnapshot.empty) {
      const listusers = querySnapshot.docs.map((doc) => doc.data());
      setUsers(listusers);
      // console.log("Users found:", listusers);
    } else {
      console.log("No users found with IDs in connections array.");
    }
  })


    });
    return () => unsub();
  }, []);

  

  const selectUser = async (user) => {
    setChat(user);

    const user2 = user.uid;
    const user1 = currentUser.uid;
    // console.log(user);
    console.log(user1);
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    console.log(id);
    const msgsRef = collection(firestore, "messages", id, "chat");
    const q = query(msgsRef, orderBy("createdAt", "asc"));

    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });

    // get last message b/w logged in user and selected user
    const docSnap = await getDoc(doc(firestore, "lastMsg", id));
    // if last message exists and message is from selected user
    if (docSnap.data() && docSnap.data().from !== user1) {
      // update last message doc, set unread to false
      await updateDoc(doc(firestore, "lastMsg", id), { unread: false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user2 = chat.uid;
    const user1 = currentUser.uid;
    console.log(user1);
    console.log(user2);
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    let url;

    // if (img) {
    //   const imgRef = ref(
    //     storage,
    //     `images/${new Date().getTime()} - ${img.name}`
    //   );
    //   const snap = await uploadBytes(imgRef, img);
    //   const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
    //   url = dlUrl;
    // }  

    await addDoc(collection(firestore, "messages", id, "chat"), {
      text,
      from: currentUser.uid,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
    });

    await setDoc(doc(firestore, "lastMsg", id), {
      text,
      from: currentUser.uid,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      unread: true,
    });

    setText("");
    // setImg("");
  };


  return (
    <div className="home_container">
      <div className="users_container">
        {users.map((user) => (
          <User
            key={user.uid}
            user={user}
            selectUser={()=>selectUser(user)}
            user1={currentUser.uid}
            chat={chat}
          />
        ))}
      </div>
      <div className="messages_container">
        {chat ? (
          <>
            <div className="messages_user">
              <h3>{chat.name}</h3>
            </div>
            <div className="messages">
              {/* {console.log(msgs)} */}
              {msgs.length
                ? msgs.map((msg, i) => (
                    <Message key={i} msg={msg} user1={currentUser.uid} />
                  ))
                : null}
            </div>
            <MessageForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
            />
          </>
        ) : (
          <h3 className="no_conv">Select a user to start conversation</h3>
        )}
      </div>
    </div>
  );
};

