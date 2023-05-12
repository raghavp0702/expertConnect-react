import React, { useState } from "react";
import ProfileCard from "./common/ProfileCard";
import ProfileEdit from "./common/ProfileEdit";
// import CategoryPosts from "./CategoryPosts/CategoryPosts"
import CategoryCard from "./common/CategoryCard/CategoryCard";

import "../Sass/HomeComponent.scss";

export default function CategoryComponent({ currentUser }) {
  const [isEdit, setisEdit] = useState(false);

  const onEdit = () => {
    setisEdit(!isEdit);
  };
  return (
    <div style={{ 
      backgroundImage: `url(${currentUser.backgroundLink})`,
      backgroundSize: 'cover',               
      backgroundRepeat:  "no-repeat",
      backgroundPosition: "center",
    }}>
     {/* Hello world */}
        <CategoryCard currentUser={currentUser} onEdit={onEdit} />
    </div>
  );
}
