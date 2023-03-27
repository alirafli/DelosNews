import { Button, Meta, Text } from "@components/elements";
import { ProtectedRoute } from "@components/modules";
import { useAuth } from "context/AuthContext";
import { useRouter } from "next/router";
import React from "react";

const Profile = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  console.log(user);
  return (
    <ProtectedRoute>
      <div className="pt-28 px-2 md:px-20 min-h-screen pb-10">
        <Meta subTitle="profile" />
        <div className="flex flex-col justify-center items-center py-10">
          <Text variant="title">username</Text>
          <Text className="text-primary mb-8">{user?.username}</Text>
          <Text variant="title">email</Text>
          <Text className="text-primary mb-8">{user?.email}</Text>
          <Text>coin</Text>
          <Text className="text-primary mb-8">
            {user?.coin?.toLocaleString("en-US")}
          </Text>
          <Button
            variant="secondary"
            onClick={() => {
              logout();
              router.push("/login");
            }}
          >
            Logout
          </Button>
        </div>

        <div>
          <Text variant="jumboSubTitle">Article you bought</Text>
          <table className="w-full border-spacing-2 border-2 border-primary break-all">
            <thead>
              <tr>
                <th className="border-2 p-1 border-primary ...">Title</th>
                <th className="border-2 p-1 border-primary ...">Link</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-2 p-1 border-primary">Michigan</td>
                <td className="border-2 p-1 border-primary ">Detroit</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Profile;
