import React, {useState, useMemo} from 'react'
import Home from './common/Chats/Home';
import { getCurrentUser } from '../api/FirestoreAPI';
import TopBar from "../components/common/Topbar";

export default function ChatComponent () {
  

  return (
    <div>
      <TopBar></TopBar>
      <Home ></Home>
        {/* Chatcomponent */}
    </div>
  )
}
