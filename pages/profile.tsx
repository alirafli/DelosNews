import { Button, Meta, Text } from "@components/elements";
import { ProtectedRoute } from "@components/modules";
import { useAuth } from "context/AuthContext";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const router = useRouter();
  const [userLogin, setUserLogin] = useState({
    coin: 100000,
    email: "a@a.com",
    ticket: 0,
    username: "aaaaaa",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [userArticle, setUserArticle] = useState([]);
  const { user, logout, getUserDataByEmail, getUserArticle } = useAuth();

  const getData = async () => {
    try {
      const res = await getUserDataByEmail(user?.email);
      const fetchArticle = await getUserArticle(user?.email);
      setUserArticle(fetchArticle);
      setUserLogin(res[0]);
    } catch (error) {
    } finally {
      setIsLoading(false);
      console.log(userArticle);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getData();
  }, []);

  if (isLoading) return "...";
  return (
    <ProtectedRoute>
      <div className="pt-28 px-2 md:px-20 min-h-screen pb-10">
        <Meta subTitle="profile" />
        <div className="flex flex-col justify-center items-center py-10">
          <div className="flex gap-1 md:gap-32">
            <div className="flex flex-col">
              <Text variant="title">Username</Text>
              <Text className="text-primary mb-8">{userLogin?.username}</Text>

              <Text variant="title">Email</Text>
              <Text className="text-primary mb-8">{userLogin?.email}</Text>
            </div>
            <div className="flex flex-col">
              <Text>Coin</Text>
              <Text className="text-primary mb-8">
                {userLogin?.coin?.toLocaleString("en-US")}
              </Text>

              <Text>Ticket</Text>
              <Text className="text-primary mb-5">{userLogin?.ticket}</Text>
            </div>
          </div>
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
              {userArticle
                ? userArticle.map((data, key) => {
                    return (
                      <tr key={key}>
                        <td className="border-2 p-1 border-primary ">
                          {data.link}
                        </td>
                        <td className="border-2 p-1 border-primary">
                          <a href={data.title} target={"_blank"} className="text-primary-dark">{data.title}</a>
                        </td>
                      </tr>
                    );
                  })
                : "loading..."}
            </tbody>
          </table>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Profile;
