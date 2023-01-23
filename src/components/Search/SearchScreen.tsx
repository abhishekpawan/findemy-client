import SearchScreenCourse from "./SearchScreenCourse";
import { BiFilter } from "react-icons/bi";
import { GrClear } from "react-icons/gr";
import { useState } from "react";

import "./searchscreen.css";

const SearchScreen = () => {
  const [isFilterPanelHide, setIsFilterPanelHide] = useState<boolean>(false);

  const filterPannelHide = () => {
    if (isFilterPanelHide) {
      setIsFilterPanelHide(false);
    } else {
      setIsFilterPanelHide(true);
    }
  };
  return (
    <main className="search">
      <div className="row">
        <h1 className="fw-bold fs-1">2,234 results for "react"</h1>
        <div className="filter ps-0 mt-4 d-flex">
          <button className="fw-bold " onClick={filterPannelHide}>
            <BiFilter /> Filter
          </button>
          <button className="fw-bold ms-4">
            <GrClear /> Clear filters
          </button>
        </div>

        <div
          className={`
            ${isFilterPanelHide ? "filter-hide" : ""}
          col-12 col-lg-2 mt-4 filter-panel`}
        >
          <div className="accordion" id="filterAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button fw-bold fs-1"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Level
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
              >
                <div className="level form-check">
                  <div>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="all-levels"
                    />
                    <label className="form-check-label" htmlFor="all-levels">
                      All Levels
                    </label>
                  </div>
                  <div>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="beginner"
                    />
                    <label className="form-check-label" htmlFor="beginner">
                      Beginner
                    </label>
                  </div>
                  <div>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="intermediate"
                    />
                    <label className="form-check-label" htmlFor="intermediate">
                      Intermediate
                    </label>
                  </div>
                  <div>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="expert"
                    />
                    <label className="form-check-label" htmlFor="expert">
                      Expert
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="accordion-item mt-2">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed fw-bold fs-1"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Ratings
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse "
                aria-labelledby="headingTwo"
              >
                <div className="level rating sform-check">
                  <div>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="4.5star"
                    />
                    <label className="form-check-label" htmlFor="4.5star">
                      4.5 & up
                    </label>
                  </div>
                  <div>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="4.0star"
                    />
                    <label className="form-check-label" htmlFor="4.0star">
                      4.0 & up
                    </label>
                  </div>
                  <div>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="3.5star"
                    />
                    <label className="form-check-label" htmlFor="3.5star">
                      3.5 & up
                    </label>
                  </div>
                  <div>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="3.0star"
                    />
                    <label className="form-check-label" htmlFor="3.0star">
                      3.0 & up
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`
            ${isFilterPanelHide ? "filter-hide" : "ps-lg-4"}
              col-12 col-lg-10 ps-0 pt-4 pt-lg-0  mt-4 courses`}
        >
          <SearchScreenCourse />
          <SearchScreenCourse />
          <SearchScreenCourse />
          <SearchScreenCourse />
          <SearchScreenCourse />
          <SearchScreenCourse />
          <SearchScreenCourse />
          <SearchScreenCourse />
        </div>
      </div>
    </main>
  );
};

export default SearchScreen;
