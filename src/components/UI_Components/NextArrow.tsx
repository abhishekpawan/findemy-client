import React, { FC } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { ISlick } from "../../utils/interface";
import "./arrow.css";

const NextArrow: FC<ISlick> = (props) => {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={`arrow ${props.className}`}
    >
      <IoIosArrowForward />
    </button>
  );
};

export default NextArrow;
