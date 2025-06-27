import React from "react";
import Header from "./Header";
import { Outlet, useNavigation } from "react-router-dom";
import Footer from "./Footer";

const AppLayout = () => {
  const navigation = useNavigation();
  if (navigation.state === "loading") {
    return <Loader />;
  }
  return (
    <>
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AppLayout;
