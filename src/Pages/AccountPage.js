import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

import {
  collection,
  getDocs,
  updateDoc,
  doc,
  getDoc
} from "firebase/firestore";

function AccountPage() {
  const [user, setUser] = useState({});
  const [userProfile, setUserProfile] = useState();
  const [userID, setUserID] = useState(localStorage.getItem("app_userId"));

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  useEffect(() => {
    const getUserProfile = async () => {
      const docRef = doc(db, "users", userID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
        setUserProfile({ ...docSnap.data(), id: user.uid });
      } else {
        console.log("No such document");
      }
    };

    getUserProfile();
  }, [user]);

  return (
    <>
      <h1 className="title is-size-1">Account Page</h1>

      <h3 className="title is-3">Username</h3>
      <p className="subtitle">{userProfile?.displayName}</p>

      <h3 className="title is-3">Email Address</h3>
      <p className="subtitle">{userProfile?.email}</p>

      <h3 className="title is-3">Phone Number</h3>
      <p className="subtitle">{userProfile?.phoneNumber}</p>

      <h3 className="title is-3">Account Type</h3>
      <p className="subtitle">{userProfile?.accountType}</p>
    </>
  );
}

export default AccountPage;
