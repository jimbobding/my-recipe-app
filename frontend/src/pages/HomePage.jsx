import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { isLoggedIn } = useAuth();
  const [user, setUser] = useState(null);
  const defaultImageUrl = "/defaultProfilePic/smiley.jpeg";

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("Stored user from localStorage:", storedUser);
    // console.log("user", user.image_url);
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log("Parsed user object:", parsedUser);
      setUser(parsedUser);
    }
  }, [isLoggedIn]);

  // Use the image URL from the user object or fall back to a default image
  const imageUrl = user?.image_url || defaultImageUrl;

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {isLoggedIn && user ? (
        <>
          <p>Welcome back, {user.username}!</p>
          <p>Weight: {user.weight}</p>
          <img
            src={imageUrl}
            alt={`${user.username}'s avatar`}
            style={{ width: "150px", height: "150px", borderRadius: "50%" }}
          />
        </>
      ) : (
        <p>No user is currently logged in.</p>
      )}
    </div>
  );
};

export default HomePage;
