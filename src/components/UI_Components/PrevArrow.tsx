import React, { FC } from "react";
import { IoIosArrowBack } from "react-icons/io";
import "./arrow.css";

interface ISlick {
  onClick?: () => void;
  className?: string;
}

const PrevArrow: FC<ISlick> = (props) => {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={`arrow ${props.className}`}
    >
      <IoIosArrowBack />
    </button>
  );
};

export default PrevArrow;
