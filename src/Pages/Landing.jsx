import React, { useEffect, useState } from "react";
import HomeComponent from "../components/HomeComponent";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import Loader from "../components/common/Loader";
import App from "../Landing/sample-react-mui-introduction/src/App"

export default function Home({ currentUser }) {
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (!res?.accessToken) {
        setLoading(false);
      } else {
        navigate("/");
      }
    });
  }, []);
  return loading ? <App /> : <HomeComponent currentUser={currentUser} />;
}
