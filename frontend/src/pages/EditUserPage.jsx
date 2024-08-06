import React from "react";
import UserForm from "../components/UserForm";
import { useParams } from "react-router-dom";

const EditUserPage = () => {
  const { id } = useParams();

  const handleSuccess = () => {
    // Redirect or update UI after successful user update
    // For example: window.location.href = '/';
  };

  return <UserForm userId={id} onSuccess={handleSuccess} />;
};

export default EditUserPage;
