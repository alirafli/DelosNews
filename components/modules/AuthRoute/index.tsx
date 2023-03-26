import { useAuth } from "context/AuthContext";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [router, user]);

  return <>{user ? null : children}</>;
};
