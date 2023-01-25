import { FC } from "react";
import { IFeaturedTopics } from "../../utils/interface";
import HomepageFeaturedTopicsItem from "./HomepageFeaturedTopicsItem";

const HomepageFeaturedTopics: FC<IFeaturedTopics> = (
  props: IFeaturedTopics
) => {
  return (
    <div className="featured-topics__heading col-6 col-md-3">
      <h3 className="mb-5 fw-bold fs-3">{props.field}</h3>
      {props.topics.map((topic) => {
        return (
          <HomepageFeaturedTopicsItem
            key={topic.id}
            id={topic.id}
            category={topic.category}
            noOfStudents={topic.noOfStudents}
          />
        );
      })}
    </div>
  );
};

export default HomepageFeaturedTopics;
