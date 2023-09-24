"use client";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    console.log("session?.user changed:", session?.user);

    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/me`, { cache: "no-store" }); // Replace with your API endpoint
        if (response.ok) {
          const data = await response.json();

          setUser(data.data); // Assuming user data is in data.data
        } else {
          console.error("Error fetching user data:", response.statusText);
          setUser(null); // Set user to null in case of an error
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null); // Set user to null in case of an error
      } finally {
        setLoading(false);
      }
    };

    session?.user && fetchUserData();
  }, [session?.user]);

  // Function to update the user's data
  const updateUser = async (data) => {
    setUser((p) => ({ ...p, ...data }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
