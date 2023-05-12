import React, {useState, useMemo} from 'react'
import { getCurrentUser } from '../api/FirestoreAPI';
import TopBar from "../components/common/Topbar";
import Job from "../components/common/Jobs/job"

export default function JobComponent ({currentUser}) {
  
  return (
    <div style={{ 
      backgroundImage: `url(${currentUser.backgroundLink})`,
      backgroundSize: 'cover',               
      backgroundRepeat:  "no-repeat",
      backgroundPosition: "center",
    }}>
      <TopBar></TopBar>
      <Job currentUser={currentUser}></Job>
      {/* <Home ></Home> */}
        {/* Chatcomponent */}
    </div>
  )
}
