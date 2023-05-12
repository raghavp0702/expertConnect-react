import React, { useMemo, useState } from "react";
import {
  getLikesByUser,
} from "../../../api/FirestoreAPI";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import "./likebutton.scss";
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from "react-icons/ai";
import { BsFillHandThumbsUpFill, BsHandThumbsUp } from "react-icons/bs";
import { collection, doc,arrayUnion,setDoc,updateDoc } from "firebase/firestore";
import { firestore } from "../../../firebaseConfig";

export default function LikeButton({ userId, postId, currentUser }) {
  const [likesCount, setLikesCount] = useState(0);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  
let likeRef = collection(firestore, "likes");
  const handleLike = () => {
    likePost(userId, postId);
  };
  // applying to job

  // let jobRef = collection(firebase, "jobs");

  const likePost = (userId, postId) => {
    try {

      // console.log(postId);
      // console.log(userId);

      let docToLike = doc(likeRef, `${userId}_${postId}`);
      if (liked) {
        deleteDoc(docToLike);
      } else {
        setDoc(docToLike, { userId, postId });
      }

        const jobRef = doc(collection(firestore, "jobs"), postId);
        const userRef = doc(collection(firestore, "users"), userId);
         updateDoc(jobRef, { appliedBy: arrayUnion(userId) })
        .then(() => {
          // console.log("added appliedBy to job");
          updateDoc(userRef, { jobsApplied: arrayUnion(postId) });
        })
}
    catch (err) {
      console.log(err);
    }
  };

  useMemo(() => {
    getLikesByUser(userId, postId, setLiked, setLikesCount);
  }, [userId, postId]);


  return (
    <div className="like-container">
      <br />
        <hr />
      <p>{likesCount} People have applied to this job </p>
      <div className="hr-line">
        <br />
      </div>
      <div className="like-comment">
        <div className="likes-comment-inner" onClick={handleLike}>
          {liked ? (
            <BsFillHandThumbsUpFill size={30} color="#0a66c2" />
          ) : (
            <BsHandThumbsUp size={30} />
          )}
          <p className={liked ? "blue" : "black"}>Apply</p>
        </div>
        

        </div> 
      </div>
  );
}
