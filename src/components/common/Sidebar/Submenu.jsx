import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";

const SidebarLink = styled(Link)`
display: flex;
color: #e1e9fc;
justify-content: space-between;
align-items: center;
padding: 20px;
list-style: none;
height: 60px;
text-decoration: none;
font-size: 18px;

&:hover {
	background: #252831;
	border-left: 4px solid green;
	cursor: pointer;
}
`;

const SidebarLabel = styled.span`
margin-left: 16px;
`;

const DropdownLink = styled(Link)`
background: #252831;
height: 60px;
padding-left: 3rem;
display: flex;
align-items: center;
text-decoration: none;
color: #f5f5f5;
font-size: 18px;

&:hover {
	background: green;
	cursor: pointer;
}
`;
const SubMenu = ({ item, currentUser }) => {
const [subnav, setSubnav] = useState(false);
let navigate = useNavigate();

const showSubnav = () => setSubnav(!subnav);

return (

	<>
	<SidebarLink
	onClick={() =>
		goToRoute("/category",{
			state: { id: item.id, email:currentUser.email },
		})
	}>
				{/* {console.log(item)} */}
		<div>
			
		{/* {item.icon} */}
		<SidebarLabel> {item.name}</SidebarLabel>
		</div>
		{/* <div>
		{item.subNav && subnav
			? item.iconOpened
			: item.subNav
			? item.iconClosed
			: null}
		</div> */}
	</SidebarLink>
	{/* {subnav &&
		item.subNav.map((item, index) => {
		return (
			<DropdownLink to={item.path} key={index}>
			{item.icon}
			<SidebarLabel>{item.title}</SidebarLabel>
			</DropdownLink>
		);
		})} */}
	</>
);
};

export default SubMenu;
