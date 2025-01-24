import React from "react";
import UserForm from "../components/UserForm";

const AddUserPage = () => {
  const handleSuccess = () => {
    // Redirect or update UI after successful user creation
    // For example: window.location.href = '/';
  };

  return <UserForm onSuccess={handleSuccess} />;
};

export default AddUserPage;
