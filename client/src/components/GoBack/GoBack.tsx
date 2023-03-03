import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "./GoBack.scss";

const GoBack: React.FC = () => {
  let navigate = useNavigate();

  return (
    <div className="go-back__navigation">
      <Link to="">
        <img src="/icons/arrow-black.svg" alt="go back icon" />
      </Link>
      <p
        className="small-navigation__text go-back__text"
        onClick={() => navigate(-1)}
      >
        Back
      </p>
    </div>
  );
};

export default GoBack;
