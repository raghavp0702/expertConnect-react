import React, { useMemo, useState } from "react";
import Chat from "../Pages/Chat";
import { getCurrentUser } from "../api/FirestoreAPI";
import Topbar from "../components/common/Topbar";

export default function ConnectionLayout() {
  const [currentUser, setCurrentUser] = useState({});

  useMemo(() => {
    getCurrentUser(setCurrentUser);
    
  }, []);
  return (
    <div>
      {/* <Topbar currentUser={currentUser} /> */}
      <Chat currentUser={currentUser} />
    </div>
  );
}
