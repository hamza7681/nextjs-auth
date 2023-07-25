import React, { FC } from "react";
import Navbar from "./components/Header/Navbar";
import { Provider } from "react-redux";

const Home: FC = () => {
  return (
    <>
      <Navbar />
      <p>Hello</p>
    </>
  );
};

export default Home;
