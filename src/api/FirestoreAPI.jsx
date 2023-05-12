import { firestore } from "../firebaseConfig";
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  query,
  where,
  setDoc,
  deleteDoc,
  getDoc,
  orderBy,
  serverTimestamp,
  getDocs,
  arrayUnion,
} from "firebase/firestore";
import { toast } from "react-toastify";

let postsRef = collection(firestore, "posts");
let userRef = collection(firestore, "users");
let likeRef = collection(firestore, "likes");
let commentsRef = collection(firestore, "comments");
let connectionRef = collection(firestore, "connections");
let jobRef = collection(firestore, "jobs");

export const postStatus = (object) => {
  addDoc(postsRef, object)
    .then(() => {
      toast.success("Post has been added successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};
export const postJobStatus = (object, userId) => {

  try {

    addDoc(jobRef, object)
    .then((docRef) => {
      console.log(userId);
      console.log(docRef);
      const jobId = docRef.id;
      console.log(jobId);

      const userRef = doc(collection(firestore, "users"), userId);
      let userData = {};
      getDoc(userRef).then((docSnapshot) => {
    if (docSnapshot.exists()) {
      userData = docSnapshot.data();
      console.log(userData);
    } else {
      console.log("User document does not exist");
    }
  })
  const jobsCreated = userData.jobsCreated || [];
      updateDoc(userRef, {
        jobsCreated: [...jobsCreated, jobId]
      })
        .then(() => {
          toast.success("Job has been added successfully");
        })
        .catch((err) => {
          console.log(err);
        });
      })
    } catch (err) {
      console.log(err);
    }
    };


    // job create ho raaha hai , with jobCreated adding in user

export const getStatus = (setAllStatus) => {
  const q = query(postsRef, orderBy("timeStamp","asc"));
  onSnapshot(q, (response) => {
    setAllStatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};
export const getJobStatus = (setAllJobStatus) => {
  const q = query(jobRef, orderBy("timeStamp"));
  onSnapshot(q, (response) => {
    setAllJobStatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const getAllUsers = (setAllUsers) => {
  onSnapshot(userRef, (response) => {
    setAllUsers(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const getSingleStatus = (setAllStatus, id) => {
  const singlePostQuery = query(postsRef, where("userID", "==", id));
  onSnapshot(singlePostQuery, (response) => {
    setAllStatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};
export const getCategoryStatus = (setAllStatus, id) => {
  const singlePostQuery = query(postsRef, where("categorySelected.id", "==", id));
  onSnapshot(singlePostQuery, (response) => {
    setAllStatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const getSingleUser = (setCurrentUser, email) => {
  const singleUserQuery = query(userRef, where("email", "==", email));
  onSnapshot(singleUserQuery, (response) => {
    setCurrentUser(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })[0]
    );
  });
};

export const postUserData = (object) => {
  addDoc(userRef, object)
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};

export const getCurrentUser = (setCurrentUser) => {
  onSnapshot(userRef, (response) => {
    setCurrentUser(
      response.docs
        .map((docs) => {
          return { ...docs.data(), id: docs.id };
        })
        .filter((item) => {
          return item.email === localStorage.getItem("userEmail");
        })[0]
    );
  });
};

export const editProfile = (userID, payload) => {
  let userToEdit = doc(userRef, userID);

  updateDoc(userToEdit, payload)
    .then(() => {
      toast.success("Profile has been updated successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};



export const likePost = (userId, postId, liked) => {
  try {
    let docToLike = doc(likeRef, `${userId}_${postId}`);
    if (liked) {
      deleteDoc(docToLike);
    } else {
      setDoc(docToLike, { userId, postId });
    }
  } catch (err) {
    console.log(err);
  }
};

export const getLikesByUser = (userId, postId, setLiked, setLikesCount) => {
  try {
    let likeQuery = query(likeRef, where("postId", "==", postId));

    onSnapshot(likeQuery, (response) => {
      let likes = response.docs.map((doc) => doc.data());
      let likesCount = likes?.length;

      const isLiked = likes.some((like) => like.userId === userId);

      setLikesCount(likesCount);
      setLiked(isLiked);
    });
  } catch (err) {
    console.log(err);
  }
};

export const postComment = (postId, comment, timeStamp, name) => {
  try {
    addDoc(commentsRef, {
      postId,
      comment,
      timeStamp,
      name,
    });
  } catch (err) {
    console.log(err);
  }
};

// export const addJob = (object) => {
//   addDoc(jobRef, object)
//     .then(() => {})
//     .catch((err) => {
//       console.log(err);
//     });
// };

export const getComments = (postId, setComments) => {
  try {
    let singlePostQuery = query(commentsRef, where("postId", "==", postId));

    onSnapshot(singlePostQuery, (response) => {
      const comments = response.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setComments(comments);
    });
  } catch (err) {
    console.log(err);
  }
};

export const updatePost = (id, status, postImage) => {
  let docToUpdate = doc(postsRef, id);
  try {
    updateDoc(docToUpdate, { status, postImage });
    toast.success("Post has been updated!");
  } catch (err) {
    console.log(err);
  }
};
export const updateJob = (id, status) => {
  let docToUpdate = doc(jobRef, id);
  try {
    updateDoc(docToUpdate, { status });
    toast.success("Job has been updated!");
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = (id) => {
  let docToDelete = doc(postsRef, id);
  try {
    deleteDoc(docToDelete);
    toast.success("Post has been Deleted!");
  } catch (err) {
    console.log(err);
  }
};
export const deleteJob = (id) => {
  let docToDelete = doc(jobRef, id);
  try {
    deleteDoc(docToDelete);
    toast.success("Post has been Deleted!");
  } catch (err) {
    console.log(err);
  }
};

export const addConnection = (currentUser ,userId,targetUser, targetId) => {
  try {
    let connectionToAdd = doc(connectionRef, `${userId}_${targetId}`);
    // let userConnectionAdd = doc(userRef)
    setDoc(connectionToAdd, { userId, targetId });


const userRef = doc(collection(firestore, "users"), userId);
const userRef2 = doc(collection(firestore, "users"), targetId);

console.log(currentUser);
console.log(targetUser);

// Add targetId to userId's userConnections array
updateDoc(userRef, {
  userConnections: arrayUnion(targetUser.uid)
}).then(() => {
  console.log("User connections updated successfully");
}).catch((error) => {
  console.log("Error updating user connections: ", error);
});

// Add userId to targetId's userConnections array
updateDoc(userRef2, {
  userConnections: arrayUnion(currentUser.uid)
}).then(() => {
  console.log("Target user connections updated successfully");
}).catch((error) => {
  console.log("Error updating target user connections: ", error);
});

  } catch (err) {
    console.log(err);
  }
};

export const getConnections = (userId, targetId, setIsConnected) => {
  try {

    if(userId === targetId)
    {
      setIsConnected(true);
      return;
    }

    let connectionsQuery = query(
      connectionRef,
      where("targetId", "==", targetId)
    );

    onSnapshot(connectionsQuery, (response) => {
      let connections = response.docs.map((doc) => doc.data());

      const isConnected = connections.some(
        (connection) => connection.userId === userId );
        // console.log(isConnected);
      setIsConnected(isConnected);
    });
  } catch (err) {
    console.log(err);
  }
};
