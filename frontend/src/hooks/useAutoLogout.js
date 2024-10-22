import { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const useAutoLogout = (timeout = 3600000) => {
  const { logout } = useAuth(); // Access logout from AuthContext
  const navigate = useNavigate();
  const logoutTimer = useRef(); // Use useRef to persist the timer

  const handleLogout = useCallback(() => {
    logout(); // Call logout function
    navigate("/login"); // Redirect to login page
  }, [logout, navigate]);

  const resetTimer = useCallback(() => {
    if (logoutTimer.current) clearTimeout(logoutTimer.current); // Clear any existing timer
    logoutTimer.current = setTimeout(() => {
      handleLogout(); // Trigger logout after timeout
    }, timeout);
  }, [timeout, handleLogout]);

  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"]; // Monitor these events

    events.forEach((event) => {
      window.addEventListener(event, resetTimer); // Reset timer on any user activity
    });

    resetTimer(); // Start the timer when the component mounts

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer); // Cleanup listeners on unmount
      });
      if (logoutTimer.current) clearTimeout(logoutTimer.current); // Clear timer on unmount
    };
  }, [resetTimer]);

  return null; // This hook doesn't render anything
};

export default useAutoLogout;
