import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { ICartCourse, ICourse } from "../../utils/interface";
import { showNotification } from "../../utils/ToastNotification";
import HomepageCourseCard from "../Homepage/HomepageCourseCard";
import EmptyMyLearnings from "./EmptyMyLearnings";
import MyLearningsLoader from "./MyLearningsLoader";

const MyLearnings = () => {
  const { user } = useContext(AppContext);
  const [boughtCourses, setBoughtCourses] = useState<ICartCourse[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getBoughtCourses = async () => {
      try {
        let response = await fetch(
          `http://localhost:3001/boughtcourse/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
              "Content-Type": "application/json",
            },
          }
        );
        let data = await response.json();
        if (data.success == true) {
          setBoughtCourses(data.boughtCourse);
          setLoading(false);
        } else {
          throw new Error(data.message);
        }
      } catch (error: any) {
        showNotification("error", error.toString());
        setLoading(false);
      }
    };
    getBoughtCourses();
  }, []);

  return (
    <>
      {isLoading ? (
        <MyLearningsLoader />
      ) : (
        <main className="mylearning ">
          <div className="mylearning-header">
            <div>
              <h1 className="fw-bold pb-5">My Learnings</h1>
              <a className="fw-bold fs-3 pb-2 " href="#">
                All Courses
              </a>
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
                    className="col-12 col-md-6 col-lg-3 mt-4"
                  >
                    <HomepageCourseCard course={course} />
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
