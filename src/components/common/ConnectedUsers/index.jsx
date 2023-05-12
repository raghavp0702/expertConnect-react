import React, { useEffect, useState } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { getConnections,addConnection } from "../../../api/FirestoreAPI";

export default function ConnectedUsers({ user, getCurrentUser, currentUser }) {
  const [isConnected, setIsConnected] = useState(false);
  const [allConnectedUsers, setAllConnectedUsers] = useState([]); //

  function getCurrentUser(id){
    // console.log(`${id} + ${currentUser.id}`); 
       addConnection(currentUser.currentUser,currentUser.currentUser.id, user,id);
  };
  
  useEffect(() => {
    getConnections(currentUser.currentUser.id, user.id, setIsConnected);
    // setAllConnectedUsers( getConnections(currentUser.id,user.id,true));
  }, []);
  
  return isConnected ? (
    <></>
  ) : (
    <div>
    {/* {console.log(currentUser)} */}
    <div className="grid-child">
      <img src={user.imageLink} />
      <p className="name">{user.name}</p>
      <br />
      <p className="headline">{user.headline}</p>

      <button onClick={() => getCurrentUser(user.id)}>
        <AiOutlineUsergroupAdd size={40} />
        Connect
      </button>
    </div>
    </div>
  );
}
