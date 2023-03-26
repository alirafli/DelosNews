import { ProtectedRoute } from "@components/modules";
import React from "react";

const LuckyDraw = () => {
  return (
    <ProtectedRoute>
      <div className="pt-28 min-h-screen">LuckyDraw</div>
    </ProtectedRoute>
  );
};

export default LuckyDraw;
