import React, { useEffect, useState } from "react";
import JobComponent from "../components/JobComponent";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import Loader from "../components/common/Loader";

export default function JobPage({ currentUser }) {
  const [loading, setLoading] = useState(true);
  // console.log(currentUser);
  let navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (!res?.accessToken) {
        navigate("/");
      } else {
        setLoading(false);
      }
    });
  }, []);
  return loading ? <Loader /> : <JobComponent currentUser={currentUser} />;
}
