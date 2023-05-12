import React, { useState , useEffect} from "react";
import { Button, Modal, Progress } from "antd";
import { AiOutlinePicture } from "react-icons/ai";

import {getDocs, doc, updateDoc, collection } from "firebase/firestore";
import { auth, firestore } from "../../../firebaseConfig";
import ReactQuill from "react-quill";
import "./index.scss";


const ModalComponent = ({
  modalOpen,
  setModalOpen,
  sendStatus,
  setStatus,
  status,
  isEdit,
  updateStatus,
  uploadPostImage,
  setPostImage,
  postImage,
  currentPost,
  setCurrentPost,
  setSelectedCategory,
}) => {
  const categoryRef = collection(firestore,"categories");
const getAllCategories = async()=>{
  const ct = await getDocs(categoryRef);
  setCategory(ct.docs.map((doc)=>({...doc.data(), id: doc.id})))
  console.log(ct.docs.map((doc)=>({...doc.data(), id: doc.id})))
  
  // console.log(currentPost);
  // setUserCategory(currentUser.categorySelected);
}
  const [category, setCategory] = useState([]);
  const [progress, setProgress] = useState(0);

  const getInput = (event) => {
    // let cat = event.target;
    // let idd = cat.id;
    // let name = cat.name;
    // console.log({idd, name});
    // console.log(event.target);

    // let { id, value } = event.target.option;
    const { id, value } = event.target.options[event.target.selectedIndex];
    const g = {
      id,
      categoryName :value,
    }
    // let input = { [id]: value };
    // console.log(event.target);
    console.log(g);
    // console.log(currentUser.id);
    setSelectedCategory(g  );
  };


  const addCategory = (postid)=>{
    // const pst = await doc(firestore,"posts",currentPost.id)
    // await updateDoc(pst,currentPost.)
    // console.log(sendStatus);
    console.log(postid);
    setSelectedCategory(postid);
    // currentPost.categorySelected.push(postid);
    // await updateDoc(pst,currentPost);
  }


  useEffect(()=>{
    getAllCategories();
  },[])



  return (
    <>
      <Modal
        title="Create a post"
        centered
        open={modalOpen}
        onOk={() => {
          setStatus("");
          setModalOpen(false);
          setPostImage("");
          setCurrentPost({});
        }}
        onCancel={() => {
          setStatus("");
          setModalOpen(false);
          setPostImage("");
          setCurrentPost({});
        }}
        footer={[
          <Button
            onClick={isEdit ? updateStatus : sendStatus}
            key="submit"
            type="primary"
            disabled={status.length > 0 ? false : true}
          >
            {isEdit ? "Update" : "Post"}
          </Button>,
        ]}
      >
        <div className="posts-body">
          <ReactQuill
            className="modal-input"
            theme="snow"
            value={status}
            placeholder="Share Something Useful.."
            onChange={setStatus}
          />
          {progress === 0 || progress === 100 ? (
            <></>
          ) : (
            <div className="progress-bar">
              <Progress type="circle" percent={progress} />
            </div>
          )}
          {postImage?.length > 0 || currentPost?.postImage?.length ? (
            <img
              className="preview-image"
              src={postImage || currentPost?.postImage}
              alt="postImage"
            />
          ) : (
            <></>
          )}
        </div>
        <label for="pic-upload">
          <AiOutlinePicture size={35} className="picture-icon" />
        </label>
        <input
          id="pic-upload"
          type={"file"}
          hidden
          onChange={(event) =>
            uploadPostImage(event.target.files[0], setPostImage, setProgress)
          }
        />
        <label>Add a Category</label>

        <select onChange={getInput}>
          <option value="">None</option>
        {category.map((s) => (
                <option id={s.id} value={s.name} >
                  <li name ={s.id}>{s.name}</li>
                </option>
              ))}
              </select>
      </Modal>
    </>
  );
};

export default ModalComponent;
