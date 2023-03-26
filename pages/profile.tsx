import { ProtectedRoute } from "@components/modules";
import { useAuth } from "context/AuthContext";
import React from "react";

const Profile = () => {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="pt-28 min-h-screen">
        {user?.email}
        {user?.coin}
      </div>
    </ProtectedRoute>
  );
};

export default Profile;
