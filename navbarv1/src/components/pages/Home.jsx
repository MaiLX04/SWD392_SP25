import React from "react";
import BabyThree from "../../assets/BabyThree.jpg";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <img
        src={BabyThree}
        alt="Baby Three Advertisement"
        className="advert_image"
      />
    </div>
  );
};

export default Home;
