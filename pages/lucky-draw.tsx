import { Button, Meta, Text } from "@components/elements";
import { ProtectedRoute } from "@components/modules";
import { useEffectOnce } from "@hooks";
import { randomNumberInRange } from "@utils";
import { useAuth } from "context/AuthContext";
import React, { useEffect, useState } from "react";

const resultKey = [
  {
    type: "default",
    key: 0,
    value: 0,
    message: "Click the button!",
    show: "Click the button!",
  },
  {
    type: "coin",
    key: 1,
    value: 50000,
    message: "wow 50.000, this is a big price!",
    show: "50.000 coin",
  },
  {
    type: "coin",
    key: 2,
    value: 20000,
    message: "20.000, not bad isn't it?",
    show: "20.000 coin",
  },
  {
    type: "ticket",
    key: 3,
    value: 0,
    message: "not lucky, try again!",
    show: "zonk",
  },
  {
    type: "ticket",
    key: 4,
    value: 1,
    message: "yey, you got 1 more ticket!",
    show: "+ 1 ticket",
  },
];
const LuckyDraw = () => {
  const { user, getUserDataByEmail, getUserPrize } = useAuth();

  const [result, setResult] = useState(0);
  const [resultDetail, setResultDetail] = useState<any>({
    type: "default",
    key: 0,
    value: 0,
    message: "Click the button!",
    show: "Click the button!",
  });
  const [userLogin, setUserLogin] = useState<any>([
    { data: { isGet50: false, ticket: 0, coin: 0 }, id: "" },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setResult(randomNumberInRange(1, 4));
    setResultDetail(resultKey.filter((e) => e.key === result)[0]);
  };

  const fetchUserPrize = async () => {
    try {
      if (userLogin.data.isGet50 && resultDetail.key === 1)
        return alert("you can't get 50.000 twice");
      if (userLogin.data.ticket <= 0) return alert("you don't have any ticket");

      await getUserPrize(
        resultDetail.type,
        resultDetail.key,
        resultDetail.value,
        userLogin.id,
        userLogin.data?.ticket,
        userLogin.data?.coin
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = async () => {
    try {
      const res = await getUserDataByEmail(user?.email);
      setUserLogin(res[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffectOnce(() => {
    setIsLoading(true);
    getUserData();
  });

  useEffect(() => {
    getUserData();
    fetchUserPrize();
  }, [resultDetail]);

  if (isLoading)
    return (
      <div className="pt-28 min-h-screen">
        <Text>loading... </Text>
      </div>
    );
  return (
    <ProtectedRoute>
      <Meta subTitle="Lucky Draw" />
      <div className="pt-28 min-h-screen px-5 md:px-20">
        <Text>Price List:</Text>
        <div className="flex gap-10 flex-wrap justify-center mb-10">
          {resultKey.slice(1, 5).map((data, key) => {
            return (
              <div key={key} className="bg-primary rounded-md text-white p-5">
                <Text>{data.show}</Text>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center flex-col items-center">
          <Button onClick={handleClick}>Generate your gift!</Button>
          <Text variant="subTitle" className="mt-10">
            {resultDetail.message}
          </Text>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default LuckyDraw;
