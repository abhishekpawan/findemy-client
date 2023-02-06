import { Link, useParams } from "react-router-dom";
import Lottie from "react-lottie";
import * as noSearchResult from "../../Assets/icons/nosearchresult.json";
import { FC } from "react";

const EmptySearchScreen: FC<{ isFilterPanelHide: boolean }> = (props) => {
  const { text } = useParams();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: noSearchResult,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div
      className={`
            ${props.isFilterPanelHide ? "filter-hide" : "ps-lg-4"}
              col-12 col-lg-10 ps-0 pt-4 pt-lg-0  mt-4 courses`}
    >
      <div className="row">
        <div className="empty-search d-flex flex-column justify-content-center align-items-center ">
          <Lottie options={defaultOptions} height={200} width={200} />
          <h1 className="mt-5 fw-bold">
            Sorry, we couldn't find any results for "{text}"
          </h1>
          <h2 className="mt-3 fw-bold">
            Try adjusting your search. Here are some ideas:
          </h2>
          <ul>
            <li>Make sure all words are spelled correctly</li>
            <li>Try different search terms</li>
            <li>Try more general search terms</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmptySearchScreen;
