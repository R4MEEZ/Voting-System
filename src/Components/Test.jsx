import React, { useEffect } from "react";
import { db } from "./Firebase/Firebase";
import { useUser } from "./UserContext";
import { collection, getDocs } from "firebase/firestore";

export default function Test() {
  const { user } = useUser();
  const userCollectionRef = collection(db, "Votes");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await getDocs(userCollectionRef);
        data.docs.map((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
      } catch (error) {
        console.error("Error fetching votes:", error);
      }
    };

    getUsers();
  }, []);

  return (
    <div>
      <h1>Check the console for fetched data</h1>
    </div>
  );
}
