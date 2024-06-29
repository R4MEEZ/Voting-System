import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "./Firebase/Firebase";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);  
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
