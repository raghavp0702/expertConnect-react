import React, { useState, useMemo, useEffect } from "react";
import { postStatus, getStatus, updatePost } from "../../../api/FirestoreAPI";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import ModalComponent from "../Modal";
import { uploadPostImage } from "../../../api/ImageUpload";
import { getUniqueID } from "../../../helpers/getUniqueId";
import PostsCard from "../PostsCard";
import "./index.scss";

export default function PostStatus({ currentUser ,getAllUsers}) {
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

  useEffect(() => {
    getStatus(setAllStatus);
    // console.log(allStatuses);
  }, []);

  return (
    <div >

    <div className="post-status-main" >
      <div className="user-details">
        <img src={currentUser?.imageLink} alt="imageLink" />
        <br />
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
          // console.log(allStatuses);
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
