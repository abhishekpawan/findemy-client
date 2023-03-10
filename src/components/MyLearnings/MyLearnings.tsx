import { selectStatus } from "../../redux/reducers/cart.reducer";
import { useAppSelector } from "../../redux/store/store";
import { ICartCourse, ICourse } from "../../utils/interface";
import HomepageCourseCard from "../Homepage/HomepageCourseCard";
import EmptyMyLearnings from "./EmptyMyLearnings";
import MyLearningsLoader from "./MyLearningsLoader";

import "./mylearnings.css";
import { Link } from "react-router-dom";
const MyLearnings = () => {
  const { boughtCourses } = useAppSelector((store) => store.boughtCourses);
  const { courses } = useAppSelector((store) => store.courses);
  // Get the current `status`:
  const status = useAppSelector(selectStatus);

  return (
    <>
      {status === "loading" ? (
        <MyLearningsLoader />
      ) : (
        <main className="mylearning ">
          <div className="mylearning-header">
            <div>
              <h1 className="fw-bold pb-5">My Learnings</h1>
              <Link className="fw-bold fs-3 pb-2 me-4" to="/mylearnings">
                All Courses
              </Link>
              <Link className="fw-bold fs-3 pb-2 " to="/mywishlist">
                Wishlist
              </Link>
            </div>
          </div>
          {boughtCourses.length === 0 ? (
            <EmptyMyLearnings />
          ) : (
            <div className="mylearning-courses row">
              {boughtCourses?.map((course: ICartCourse) => {
                return (
                  <div
                    key={course._id}
                    className="col-12 col-md-6 col-lg-3 mt-4 mb-5"
                  >
                    <HomepageCourseCard
                      course={course}
                      course_id={course.course_id}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </main>
      )}
    </>
  );
};

export default MyLearnings;
