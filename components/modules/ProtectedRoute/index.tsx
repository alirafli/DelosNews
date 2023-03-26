import { useAuth } from "context/AuthContext";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);

  return <>{user ? children : null}</>;
};
