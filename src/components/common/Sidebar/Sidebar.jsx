import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import {SidebarData} from "./SidebarData";

import Topbar from "../Topbar/index";
import SubMenu from "./Submenu";
import { IconContext } from "react-icons/lib";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../firebaseConfig";



const Nav = styled.div`
background: #15171c;
height: 80px;
display: flex;
justify-content: flex-start;
align-items: center;
`;

const NavIcon = styled(Link)`
margin-left: 2rem;
font-size: 2rem;
height: 80px;
display: flex;
justify-content: flex-start;
align-items: center;
`;

const SidebarNav = styled.nav`
background: #15171c;
width: 250px;
height: 100vh;
display: flex;
justify-content: center;
position: fixed;
top: 0;
left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
transition: 350ms;
z-index: 10;
`;

const SidebarWrap = styled.div`
width: 100%;
`;

const Sidebar = ({currentUser}) => {



const [sidebar, setSidebar] = useState(false);
const [userCategory, setUserCategory] = useState([]);


const [category, setCategory] = useState([]);

  const categoryRef = collection(firestore,"categories");

  const getAllCategories = async()=>{
    const category = await getDocs(categoryRef);
    // console.log(category.docs.map((doc)=>({...doc.data(), id: doc.id})))
    setCategory(category.docs.map((doc)=>({...doc.data(), id: doc.id})))

    // setUserCategory(currentUser.currentUser.categorySelected);
  }

  useEffect(()=>{
    // getAllDetails();
    getAllCategories();
    
//   console.log(currentUser);
  },[])



const showSidebar = () => setSidebar(!sidebar);

return (
	<>
		{/* <Topbar currentUser= {currentUser}></Topbar> */}
	<IconContext.Provider value={{ color: "#aff" }}>
			<NavIcon to="#">
				<FaIcons.FaBars onClick={showSidebar} />
			</NavIcon>
		<SidebarNav sidebar={sidebar} >
		<SidebarWrap>
			<NavIcon to="#">
			<AiIcons.AiOutlineClose onClick={showSidebar} />
			</NavIcon>
			{category.map((item, index) => {
			return <SubMenu item={item} currentUser ={currentUser} key={index} />;
			})}
		</SidebarWrap>
		</SidebarNav>
	</IconContext.Provider>
	</>
);
};

export default Sidebar;
