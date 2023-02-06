import { Link } from "react-router-dom";
import { selectStatus } from "../../redux/reducers/cart.reducer";
import { useAppSelector } from "../../redux/store/store";
import { ICartCourse } from "../../utils/interface";
import HomepageCourseCard from "../Homepage/HomepageCourseCard";
import MyWishlistLoader from "../MyLearnings/MyLearningsLoader";
import EmptyMyWishlist from "./EmptyMyWishlist";

import "./mywishlist.css";
import WishlistCourseCard from "./WishlistCourseCard";
const MyWishlist = () => {
  const { wishlistCourses } = useAppSelector((store) => store.wishlistCourses);

  const status = useAppSelector(selectStatus);

  return (
    <>
      {status === "loading" ? (
        <MyWishlistLoader />
      ) : (
        <main className="mywishlist ">
          <div className="mywishlist-header">
            <div>
              <h1 className="fw-bold pb-5">My Wishlist</h1>
              <Link className="fw-bold fs-3 pb-2 me-4" to="/mylearnings">
                All Courses
              </Link>
              <Link className="fw-bold fs-3 pb-2 " to="/mywishlist">
                Wishlist
              </Link>
            </div>
          </div>
          {wishlistCourses.length === 0 ? (
            <EmptyMyWishlist />
          ) : (
            <div className="mywishlist-courses row">
              {wishlistCourses?.map((course: ICartCourse) => {
                return (
                  <div
                    key={course._id}
                    className="col-12 col-md-6 col-lg-3 mt-4 mb-5"
                  >
                    <WishlistCourseCard
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

export default MyWishlist;
