import React, { FC } from "react";

const CheckoutCourse: FC<{
  course_thumbnail: string;
  title: string;
  discounted_price: number;
  original_price: number;
}> = (props) => {
  return (
    <div className="checkout-courses d-flex justify-content-between mb-4">
      <div className="d-flex">
        <div className="course-img me-2">
          <img src={props.course_thumbnail} alt={props.title} />
        </div>
        <div className="course-title fw-bold">{props.title}</div>
      </div>

      <div className="prices">
        <div className="disocunted-price fw-bold fs-3">
          ₹{props.discounted_price}
        </div>
        <div className="original-price fs-5 text-decoration-line-through">
          ₹{props.original_price}
        </div>
      </div>
    </div>
  );
};

export default CheckoutCourse;
