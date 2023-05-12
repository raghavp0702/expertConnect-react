import React, { useState, useMemo,useEffect } from "react";
import { getSingleStatus, getSingleUser } from "../../../api/FirestoreAPI";
import PostsCard from "../PostsCard";
import { HiOutlinePencil } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import FileUploadModal from "../FileUploadModal/index";
import FileBackModal from "../FileUploadModal/Background";
import FileResumeModal from "../FileUploadModal/Resume";
import { Link } from 'react-router-dom'
import { auth, firestore } from "../../../firebaseConfig";
import {getDocs, doc, updateDoc, collection } from "firebase/firestore";
import { uploadImage as uploadImageAPI, uploadBackgroundImage, uploadResume } from "../../../api/ImageUpload";
import "./index.scss";
import { BsFileEarmarkImage, BsFillFileEarmarkPdfFill } from "react-icons/bs";

export default function ProfileCard({ onEdit, currentUser }) {
  let location = useLocation();
  const [allStatuses, setAllStatus] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
  const [currentImage, setCurrentImage] = useState({});
  const [currentBack, setCurrentBack] = useState({});
  const [currentResume,setCurrentResume] = useState({});
  const [progress, setProgress] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [backOpen, setBackOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  
  const getImage = (event) => {
    setCurrentImage(event.target.files[0]);
  };
  const getBack = (event) => {
    setCurrentBack(event.target.files[0]);
  };
  const getResume = (event) => {
    setCurrentResume(event.target.files[0]);
  };
  const uploadImage = () => {
    uploadImageAPI(
      currentImage,
      currentUser.id,
      setModalOpen,
      setProgress,
      setCurrentImage
    );
  };
  const uploadBackImg = () => {
    uploadBackgroundImage(
      currentBack,
      currentUser.id,
      setBackOpen,
      setProgress,
      setCurrentBack
    );
  };
  const uploadresume = () => {
    uploadResume(
      currentResume,
      currentUser.id,
      setResumeOpen,
      setProgress,
      setCurrentResume
    );
  };
  // const checkHandler = async({postId})=>
  // {
  //   const data = await updateDoc()
  // };
  
  // const [category, setCategory] = useState([]);
  // const [userCategory, setUserCategory] = useState([]);
  
  // const categoryRef = collection(firestore,"categories");

  // const getAllCategories = async()=>{
  //   const category = await getDocs(categoryRef);
  //   console.log(category.docs.map((doc)=>({...doc.data(), id: doc.id})))
  //   setCategory(category.docs.map((doc)=>({...doc.data(), id: doc.id})))

  //   setUserCategory(currentUser.categorySelected);


  // }

  // useEffect(()=>{
  //   getAllCategories();
  // },[])

  useMemo(() => {
    if (location?.state?.id) {
      getSingleStatus(setAllStatus, location?.state?.id);
    }

    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }
  }, []);

  return (
    <>
      <FileUploadModal
        getImage={getImage}
        uploadImage={uploadImage}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        currentImage={currentImage}
        progress={progress}
      />
      <FileBackModal
        getImage={getBack}
        uploadImage={uploadBackImg}
        modalOpen={backOpen}
        setModalOpen={setBackOpen}
        currentImage={currentBack}
        progress={progress}
      />
      <FileResumeModal
        getImage={getResume}
        uploadImage={uploadresume}
        modalOpen={resumeOpen}
        setModalOpen={setResumeOpen}
        currentImage={currentResume}
        progress={progress}
      />
      <div className="profile-card">
      
        {currentUser.id === location?.state?.id ? (
          <div>

          <div className="edit-btn">
            <HiOutlinePencil size={40} className="edit-icon" onClick={onEdit} />
          </div>
          <br />
          <br />
          <div className="edit-btn">
            <BsFileEarmarkImage size={40} className="edit-icon" onClick={() => setBackOpen(true)} />
          </div>
          <br />
          <br />
          <div className="edit-btn">
            <BsFillFileEarmarkPdfFill size={40} className="edit-icon" onClick={() => setResumeOpen(true)} />
          </div>
          </div>
        ) : (
          <></>
        )}
        <div className="profile-info">
          <div>
            <img
              className="profile-image"
              onClick={() => setModalOpen(true)}
              src={
                Object.values(currentProfile).length === 0
                  ? currentUser.imageLink
                  : currentProfile?.imageLink
              }
              alt="profile-image"
            />
            <h3 className="userName">
              {Object.values(currentProfile).length === 0
                ? currentUser.name
                : currentProfile?.name}
            </h3>
            <br />
            <p className="heading">
              {Object.values(currentProfile).length === 0
                ? currentUser.headline
                : currentProfile?.headline}
            </p>
            {(currentUser.city || currentUser.country) &&
            (currentProfile?.city || currentProfile?.country) ? (
              
              <p className="location">
                <br />
                {Object.values(currentProfile).length === 0
                  ? `${currentUser.city}, ${currentUser.country} `
                  : `${currentProfile?.city}, ${currentUser.country}`}
              </p>
            ) : (
              <></>
            )}
            {currentUser.website || currentProfile?.website ? (
              
              <a
                className="website"
                target="_blank"
                href={
                  Object.values(currentProfile).length === 0
                    ? `${currentUser.website}`
                    : currentProfile?.website
                }
              >
                {Object.values(currentProfile).length === 0
                  ? `${currentUser.website}`
                  : currentProfile?.website}
              </a>
            ) : (
              <></>
            )}
          </div>

          <div className="right-info">
          <br />
            <p className="college">
              {Object.values(currentProfile).length === 0
                ? currentUser.college
                : currentProfile?.college}
            </p>
            <p className="company">
              {Object.values(currentProfile).length === 0
                ? currentUser.company
                : currentProfile?.company}
            </p>
          </div>
        </div>
        <p className="about-me">
          {Object.values(currentProfile).length === 0
            ? currentUser.aboutMe
            : currentProfile?.aboutMe}
        </p>

        {currentUser.skills || currentProfile?.skills ? (
          <p className="skills">
            <span className="skill-label">Skills</span>:&nbsp;
            {Object.values(currentProfile).length === 0
              ? currentUser.skills
              : currentProfile?.skills}
          </p>
        ) : (
          <></>
        )}

         { currentUser?.resumeLink ? (
            <div>
              <Link to={currentUser.resumeLink}>View Your Resume</Link>
            </div>
         ):(
          <div>

          </div>
         )

         }
      </div>

      {/* <div className="post-card-profile">
          <h2>Categories selected to be shown</h2>
        {category?.map((c) => {
          return (
            <div key={c.id}>
             <input type="checkbox" checked={userCategory.includes(c.id)} onChange = {()=>checkHandler(c.id)} />
             <h4>{c.name}</h4>
            </div>
          );
        })}
      </div> */}
      <div className="post-card-profile">
        {allStatuses?.map((posts) => {
          return (
            <div key={posts.id}>
              <PostsCard posts={posts} />
              {/* <PostsCard posts={posts} /> */}
            </div>
          );
        })}
      </div>
    </>
  );
}
