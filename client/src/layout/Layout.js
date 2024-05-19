import React from "react";
import Header from "./Header";

const Layout = ({ children, username }) => {
  return (
    <div>
      <Header username={username} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
