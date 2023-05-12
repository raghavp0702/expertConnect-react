import React, { useState, useMemo } from "react";
import { postJobStatus, getJobStatus, updatePost } from "../../../api/FirestoreAPI";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import ModalComponent from "./modal";
import { uploadPostImage } from "../../../api/ImageUpload";
import { getUniqueID } from "../../../helpers/getUniqueId";
import JobCard from "./JobCard";
import "./job.scss";

export default function Job({ currentUser }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allStatuses, setAllStatus] = useState([]);
  const [currentPost, setCurrentPost] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  
  const [selectedCategory, setSelectedCategory] = useState({});
  const [postImage, setPostImage] = useState("");

  const sendStatus = async () => {
    let object = {
      status : status,
      timeStamp: getCurrentTimeStamp("LLL"),
      userID: currentUser.id,
      postImage: postImage,
      categorySelected: selectedCategory,
      appliedBy: [],
    };
    await postJobStatus(object,currentUser.id);
    await setModalOpen(false);
    setIsEdit(false);
    setSelectedCategory([]);
    await setStatus("");
  };

  const getEditData = (jobs) => {
    setModalOpen(true);
    setStatus(jobs?.status);
    setCurrentJob(jobs);
    setIsEdit(true);
  };

  const updateStatus = () => {
    updatePost(currentPost.id, status);
    setModalOpen(false);
  };

  useMemo(() => {
    getJobStatus(setAllStatus);
    // console.log(currentPost);
  }, []);

  return (
    <div>
      {/* {console.log(currentUser)} */}
    <div className="post-status-main">
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
          Write a Job Post
        </button>
      </div>

      {/* // set modal component for job ka, alag se modal componenet bana le vro */}

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
              <JobCard posts={posts} id = {currentUser.id} getEditData={getEditData} />
              {/* <PostsCard posts={posts} getEditData={getEditData} /> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
