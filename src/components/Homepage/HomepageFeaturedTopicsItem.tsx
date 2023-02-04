import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ITopics } from "../../utils/interface";

const HomepageFeaturedTopicsItem: FC<ITopics> = (props: ITopics) => {
  const navigate = useNavigate();
  return (
    <div
      key={props.id}
      className="featured-topics__item d-flex flex-column mb-5"
    >
      <a
        onClick={() => navigate(`/search/${props.category}`)}
        className="fw-bold mb-2 fs-4"
        href=""
      >
        {props.category}
      </a>
      <span>{props.noOfStudents} students</span>
    </div>
  );
};

export default HomepageFeaturedTopicsItem;
