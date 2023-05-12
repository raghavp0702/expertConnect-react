import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { editProfile } from "../../../api/FirestoreAPI";
import {getDocs, doc, updateDoc, collection } from "firebase/firestore";
import { auth, firestore } from "../../../firebaseConfig";
import "./index.scss";
import { async } from "@firebase/util";

export default function ProfileEdit({ onEdit, currentUser }) {
  const [editInputs, setEditInputs] = useState(currentUser);
  const getInput = (event) => {
    let { name, value } = event.target;
    let input = { [name]: value };
    // console.log(input);
    console.log(currentUser.id);
    setEditInputs({ ...editInputs, ...input });
  };

  const categoryPush = async(categoryId)=>{
    const userRef = doc(firestore,"users",currentUser.id);
    editInputs.categorySelected.push(categoryId);
    console.log(editInputs.categorySelected);
    await updateDoc(userRef,editInputs);
  }

  useEffect(()=>{
    getAllDetails();
    getAllCategories();
    
  console.log(currentUser);
  },[])


  const [schData, setSchData] = useState([]);
  const [colData, setColData] = useState([]);
  const [comData, setComData] = useState([]);
  const [category, setCategory] = useState([]);

  
  // const [category, setCategory] = useState([]);
  const [userCategory, setUserCategory] = useState([]);
  
  const categoryRef = collection(firestore,"categories");

  const getAllCategories = async()=>{
    const category = await getDocs(categoryRef);
    console.log(category.docs.map((doc)=>({...doc.data(), id: doc.id})))
    setCategory(category.docs.map((doc)=>({...doc.data(), id: doc.id})))

    setUserCategory(currentUser.categorySelected);
  }



  const updateProfileData = async () => {
    // await editProfile(currentUser?.id, editInputs);

    const userRef = doc(firestore,"users",currentUser.id);
    console.log(editInputs);
    await updateDoc(userRef,editInputs);
    await onEdit();
  };

  const schoolref = collection(firestore,"school");
  const collegeref = collection(firestore,"college");
  const companyref = collection(firestore,"company");

  const getAllDetails = async()=>{
    const school = await getDocs(schoolref);
    const college = await getDocs(collegeref);
    const company = await getDocs(companyref);
    setSchData( school.docs.map((doc)=>({...doc.data(), id: doc.id})));
    setColData(college.docs.map((doc)=>({...doc.data(), id: doc.id})));
    setComData(company.docs.map((doc)=>({...doc.data(), id: doc.id})));
  }

  return (
    <div className="profile-card">
      <div className="edit-btn">
        <AiOutlineClose className="close-icon" onClick={onEdit} size={25} />
      </div>

      <div className="profile-edit-inputs">
        <label>Name</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Name"
          name="name"
          value={editInputs.name}
        />
        <label>Headline</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Headline"
          value={editInputs.headline}
          name="headline"
        />
        <label>Country</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Country"
          name="country"
          value={editInputs.country}
        />
        <label>City</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="City"
          name="city"
          value={editInputs.city}
        />
        <label>Company</label>
        <select name = "company" style={{height:30}} onChange={getInput}>

        <option value="" 
          className="common-option" style={{zoom: 1.5}}>None</option>
        {comData.map((s, id) => (
                <option style={{zoom: 1.5}} key={id} value={s.name}>
                  <li>{s.name}</li>
                </option>
              ))}

        </select>
        {/* <input
          onChange={getInput}
          className="common-input"
          placeholder="Company"
          value={editInputs.company}
          name="company"
        /> */}
        <label>School </label>
        <select name = "school" style={{height:30}} onChange={getInput}>

        <option value="" style={{zoom: 1.5}}>None</option>
        {schData.map((s, id) => (
                <option style={{zoom: 1.5}} key={id} value={s.name}>
                  <li>{s.name}</li>
                </option>
              ))}

        </select>

        {/* <input
          onChange={getInput}
          className="common-input"
          placeholder="School"
          name="school"
          value={editInputs.industry}
        /> */}
        <label>College</label>
        <select name = "college" style={{height:30}} onChange={getInput}>

        <option value="" style={{zoom: 1.5}}>None</option>
        {colData.map((s, id) => (
                <option style={{zoom: 1.5}} key={id} value={s.name}>
                  <li>{s.name}</li>
                </option>
              ))}

        </select>
        {/* <input
          onChange={getInput}
          className="common-input"
          placeholder="College"
          name="college"
          value={editInputs.college}
        /> */}
        <label>Website</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Website"
          name="website"
          value={editInputs.website}
        />
        <label>About</label>
        <textarea
          placeholder="About Me"
          className="common-textArea"
          onChange={getInput}
          rows={5}
          name="aboutMe"
          value={editInputs.aboutMe}
        />
        <label>Skills</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Skill"
          name="skills"
          value={editInputs.skills}
        />
      </div>
      <div className="post-card-profile">
          <h2>Categories selected to be shown</h2>
        {category?.map((c) => {
          return (
            <div key={c.id}>
             <input type="checkbox" checked={userCategory.includes(c.id)} onChange = {()=>categoryPush(c.id)} />
             <h4>{c.name}</h4>
            </div>
          );
        })}
      </div>

      <div className="save-container">
        <button className="save-btn" onClick={updateProfileData}>
          Save
        </button>
      </div>
    </div>
  );
}
