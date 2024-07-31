import React from 'react';
import { Outlet } from "react-router-dom";

const LandingPageLayout = () => {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
        <Outlet />
    </div>
  );
};

export default LandingPageLayout;
