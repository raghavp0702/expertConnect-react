import React, { useEffect, useMemo, useState } from "react";
import { getStatus } from "../api/FirestoreAPI";
import "../Sass/HomeComponent.scss";
import PostUpdate from "./common/PostUpdate";

export default function HomeComponent({ currentUser }) {
  const [allStatuses, setAllStatus] = useState([]);

  useMemo(() => {
    getStatus(setAllStatus);
    console.log(allStatuses);
  }, []);
  return (
    <div style={{ 
      backgroundImage: `url(${currentUser.backgroundLink})`,
      backgroundSize: 'cover',               
      backgroundRepeat:  "no-repeat",
      backgroundPosition: "center",
    }}>
      <PostUpdate currentUser={currentUser} />
    </div>
  );
}
