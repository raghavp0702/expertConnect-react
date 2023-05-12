import React, { useMemo, useState } from "react";
import Home from "../Pages/Home";
import { getCurrentUser } from "../api/FirestoreAPI";
import Topbar from "../components/common/Topbar";
import Sidebar from "../components/common/Sidebar/Sidebar.jsx"

export default function HomeLayout() {
  const [currentUser, setCurrentUser] = useState({});

  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    <div>
      <Topbar currentUser={currentUser} />
      {/* <Sidebar currentUser={currentUser}/> */}
      <Home currentUser={currentUser} />
    </div>
  );
}
