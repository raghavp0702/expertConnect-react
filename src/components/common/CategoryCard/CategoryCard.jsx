import React, { useState, useMemo } from "react";
import { postStatus, getCategoryStatus, updatePost, getSingleUser } from "../../../api/FirestoreAPI";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import ModalComponent from "../Modal";
import { uploadPostImage } from "../../../api/ImageUpload";
import { getUniqueID } from "../../../helpers/getUniqueId";
import { useLocation } from "react-router-dom";
import PostsCard from "../PostsCard";
import "./index.scss";

export default function CategoryCard({ currentUser,catId }) {
  let location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allStatuses, setAllStatus] = useState([]);
  const [currentPost, setCurrentPost] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  
  const [selectedCategory, setSelectedCategory] = useState({});
  const [postImage, setPostImage] = useState("");

  const sendStatus = async () => {
    let object = {
      status: status,
      timeStamp: getCurrentTimeStamp("LLL"),
      userEmail: currentUser.email,
      userName: currentUser.name,
      postID: getUniqueID(),
      userID: currentUser.id,
      postImage: postImage,
      categorySelected: selectedCategory,
    };
    await postStatus(object);
    await setModalOpen(false);
    setIsEdit(false);
    setSelectedCategory([]);
    await setStatus("");
  };

  const getEditData = (posts) => {
    setModalOpen(true);
    setStatus(posts?.status);
    setCurrentPost(posts);
    setIsEdit(true);
  };

  const updateStatus = () => {
    updatePost(currentPost.id, status, postImage);
    setModalOpen(false);
  };

  useMemo(() => {
    if (location?.state?.id) {
      getCategoryStatus(setAllStatus, location?.state?.id);
    }

    // if (location?.state?.email) {
    //   getSingleUser(setCurrentProfile, location?.state?.email);
    // }
  }, []);

  return (
    <div >
      {/* <h3>Category Page</h3>   */}
      {/* {console.log("in category Page")} */}
    <div className="post-status-main" >
      <div className="user-details">
        <img src={currentUser?.imageLink} alt="imageLink" />
        <p className="name">{currentUser?.name}</p>
        <p className="headline">{currentUser?.headline}</p>
      </div>
      <div className="post-status">
        <img
          className="post-image"
          src={currentUser?.imageLink}
          alt="imageLink"
          />
        <button
          className="open-post-modal"
          onClick={() => {
            setModalOpen(true);
            setIsEdit(false);
          }}
          >
          Start a Post
        </button>
      </div>

      <ModalComponent
        setStatus={setStatus}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        status={status}
        sendStatus={sendStatus}
        isEdit={isEdit}
        updateStatus={updateStatus}
        uploadPostImage={uploadPostImage}
        postImage={postImage}
        setPostImage={setPostImage}
        setCurrentPost={setCurrentPost}
        currentPost={currentPost}
        setSelectedCategory = {setSelectedCategory}
        />

        </div>
     
      <div> 
        {allStatuses.map((posts) => {
          return (
            <div key={posts.id}>
              <PostsCard posts={posts} id = {currentUser.id} getEditData={getEditData} />
              {/* <PostsCard posts={posts} getEditData={getEditData} /> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
