import SearchScreenCourse from "./SearchScreenCourse";
import { BiFilter } from "react-icons/bi";
import { GrClear } from "react-icons/gr";
import { useEffect, useState } from "react";

import "./searchscreen.css";
import { useParams } from "react-router-dom";
import { ICourse } from "../../utils/interface";
import { showNotification } from "../../utils/ToastNotification";
import EmptySearchScreen from "./EmptySearchScreen";
import SearchScreenLoader from "./SearchScreenLoader";

const SearchScreen = () => {
  const [isFilterPanelHide, setIsFilterPanelHide] = useState<boolean>(false);
  const { text } = useParams();
  const [searchedCourses, setSearchedCourses] = useState<ICourse[]>([]);
  const [totalPages, setTotalPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>();
  const [totalSearchResult, setTotalSearchResult] = useState<number>();
  const [levels, setLevels] = useState<string[]>([]);
  const [ratings, setRatings] = useState<string[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  const filterPannelHide = () => {
    if (isFilterPanelHide) {
      setIsFilterPanelHide(false);
    } else {
      setIsFilterPanelHide(true);
    }
  };

  const getSearchedCourses = async () => {
    try {
      let response = await fetch(
        `http://localhost:3001/courses?limit=2&skip=0&search=${text}&levels=${levels.toString()}&ratings=${ratings.toString()}`
      );
      let data = await response.json();
      if (data.success == true) {
        setSearchedCourses(data.courses);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
        setTotalSearchResult(data.totalSearchResult);
        setLoading(false);
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      showNotification("error", error.toString());
      setLoading(false);
    }
  };
  const levelFilterChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!levels.includes(e.target.value)) {
      levels?.push(e.target.value!);
    } else if (levels.includes(e.target.value)) {
      levels.splice(levels.indexOf(e.target.value), 1);
    }
    setLevels(levels);
    getSearchedCourses();
  };

  const ratingFilterChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!ratings.includes(e.target.value)) {
      ratings?.push(e.target.value!);
    } else if (ratings.includes(e.target.value)) {
      ratings.splice(ratings.indexOf(e.target.value), 1);
    }
    setRatings(ratings);
    getSearchedCourses();
  };

  const clearFilterHandler = () => {
    setLevels([""]);
    setRatings([""]);
  };
  useEffect(() => {
    getSearchedCourses();
  }, [text, levels, ratings]);

  return (
    <>
      {isLoading ? (
        <SearchScreenLoader />
      ) : (
        <main className="search">
          <div className="row">
            <h1 className="fw-bold fs-1">
              {totalSearchResult} results for "{text}"
            </h1>
            <div className="filter ps-0 mt-4 d-flex">
              <button className="fw-bold " onClick={filterPannelHide}>
                <BiFilter /> Filter
              </button>
              <button onClick={clearFilterHandler} className="fw-bold ms-4">
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
                          value="All Levels"
                          name="All Levels"
                          onChange={(e) => levelFilterChangeHandler(e)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="all-levels"
                        >
                          All Levels
                        </label>
                      </div>
                      <div>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="beginner"
                          value="Beginner"
                          name="Beginner"
                          onChange={(e) => levelFilterChangeHandler(e)}
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
                          value="Intermediate"
                          name="Intermediate"
                          onChange={(e) => levelFilterChangeHandler(e)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="intermediate"
                        >
                          Intermediate
                        </label>
                      </div>
                      <div>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="expert"
                          value="Expert"
                          name="Expert"
                          onChange={(e) => levelFilterChangeHandler(e)}
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
                          value="4.5"
                          name="4.5"
                          onChange={(e) => ratingFilterChangeHandler(e)}
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
                          value="4.0"
                          name="4.0"
                          onChange={(e) => ratingFilterChangeHandler(e)}
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
                          value="3.5"
                          name="3.5"
                          onChange={(e) => ratingFilterChangeHandler(e)}
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
                          value="3.0"
                          name="3.0"
                          onChange={(e) => ratingFilterChangeHandler(e)}
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

            {searchedCourses.length === 0 ? (
              <EmptySearchScreen isFilterPanelHide={isFilterPanelHide} />
            ) : (
              <div
                className={`
            ${isFilterPanelHide ? "filter-hide" : "ps-lg-4"}
              col-12 col-lg-10 ps-0 pt-4 pt-lg-0  mt-4 courses`}
              >
                {searchedCourses.map((searchedCourse: ICourse) => {
                  return (
                    <SearchScreenCourse
                      key={searchedCourse._id}
                      searchedCourse={searchedCourse}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </main>
      )}
    </>
  );
};

export default SearchScreen;
