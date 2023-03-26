import { Text } from "@components/elements";
import { ProtectedRoute } from "@components/modules";
import { useAuth } from "context/AuthContext";
import React from "react";

const Profile = () => {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="pt-28 px-20 min-h-screen">
        <div className="flex flex-col justify-center items-center py-10">
          <Text>email: {user?.email}</Text>
          <Text>coin: {user?.coin}</Text>
        </div>

        <div>
          <Text variant="jumboSubTitle">Article you bought</Text>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Profile;
