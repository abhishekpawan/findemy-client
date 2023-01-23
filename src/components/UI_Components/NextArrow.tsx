import React, { FC } from "react";
import { IoIosArrowForward } from "react-icons/io";
import "./arrow.css";

interface ISlick {
  onClick?: () => void;
  className?: string;
}

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
