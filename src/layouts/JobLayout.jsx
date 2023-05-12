import React, { useMemo, useState } from "react";
import Job from "../Pages/JobPage";
import { getCurrentUser } from "../api/FirestoreAPI";
import Topbar from "../components/common/Topbar";

export default function JobLayout() {
  const [currentUser, setCurrentUser] = useState({});

  useMemo(() => {
    getCurrentUser(setCurrentUser);
    
  }, []);
  return (
    <div>
      {/* <Topbar currentUser={currentUser} /> */}
      <Job currentUser={currentUser} />
    </div>
  );
}
