import React, { useMemo, useState } from "react";
import Home from "../Pages/Home";
import { getCurrentUser } from "../api/FirestoreAPI";
import Topbar from "../components/common/Topbar";
import Sidebar from "../components/common/Sidebar/Sidebar.jsx"
import CategoryComponent from "../components/CategoryComponent";

export default function CategoryLayout() {
  const [currentUser, setCurrentUser] = useState({});

  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    <div>
      {/* {console.log("category page")} */}
      <Topbar currentUser={currentUser} />
      {/* <Sidebar currentUser={currentUser}/> */}
      <CategoryComponent currentUser={currentUser} />
    </div>
  );
}
