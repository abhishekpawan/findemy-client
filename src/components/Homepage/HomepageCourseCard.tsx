import { FC, useState } from "react";
import StarRatings from "react-star-ratings";
import { useNavigate } from "react-router-dom";
import { ICourseCard } from "../../utils/interface";

const HomepageCourseCard: FC<ICourseCard> = (props: ICourseCard) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        key={props.id}
        onClick={() => {
          navigate(`/coursedetails/${props.id}`);
        }}
        className="course__card me-4 col"
      >
        <div className="course__card-img">
          <img src={props.thumbnail} alt="" />
        </div>
        <div className="description ">
          <h3 className="description--title fw-bold my-2 fs-3">
            {props.title}
          </h3>
          <div className="description--instructor-name fs-5 mb-2 ">
            {props.instructor}
          </div>
          <div className="description--rating d-flex align-item-center mb-2 fw-bold fs-4">
            <span className="rating_num me-2 pt-1">{props.rating}</span>

            <StarRatings
              rating={props.rating}
              starDimension="14px"
              starSpacing="0px"
              starRatedColor="orange"
              numberOfStars={5}
            />
            <span className="num_reviews pt-2 fw-normal fs-5 ms-2">
              ({props.num_reviews})
            </span>
          </div>
          <div className="description--price mb-2 fw-bold ">
            ₹{props.discounted_price}
            <span className="fw-normal fs-5 ms-1">₹{props.price}</span>
          </div>
        </div>
        <div className="tag__bestseller">{props.tag}</div>
      </div>
    </>
  );
};

export default HomepageCourseCard;
