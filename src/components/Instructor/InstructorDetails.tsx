import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ICourse, InstructorDetails } from "../../utils/interface";
import { showNotification } from "../../utils/ToastNotification";
import HomepageCourseCard from "../Homepage/HomepageCourseCard";

import "./instructordetails.css";
import InstructorDetailsLoader from "./InstructorDetailsLoader";

const InstructorDetailsPage = () => {
  const { id } = useParams();
  const [instructorDetails, setInstructorDetails] =
    useState<InstructorDetails>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [instructorsCourses, setInstructorsCourses] = useState<ICourse[]>([]);
  const regex = new RegExp(
    "(http://www.|https://www.|https://|http://)(\\w+)",
    "gm"
  );

  let totalStudents: number = 0;
  let totalReviews: number = 0;

  useEffect(() => {
    const getInstructorData = async () => {
      try {
        let response = await fetch(
          `https://findemy-server.glitch.me/instructors/${id}`
        );
        let data = await response.json();
        if (data.success == true) {
          setInstructorDetails(data.instructor);
          setLoading(false);
        } else {
          throw new Error(data.message);
        }
      } catch (error: any) {
        showNotification("error", error.toString());
      }
    };
    getInstructorData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getInstructorCourses = async () => {
      try {
        let response = await fetch(
          `https://findemy-server.glitch.me/courses/instructor/${id}`
        );
        let data = await response.json();
        if (data.success == true) {
          setInstructorsCourses(data.course);
          setLoading(false);
        } else {
          throw new Error(data.message);
        }
      } catch (error: any) {
        showNotification("error", error.toString());
      }
    };
    getInstructorCourses();
  }, []);

  for (const course of instructorsCourses) {
    totalStudents =
      totalStudents + parseFloat(course.num_students.replaceAll(",", ""));
    totalReviews =
      totalReviews + parseFloat(course.num_reviews.replaceAll(",", ""));
  }
  return (
    <>
      {isLoading ? (
        <InstructorDetailsLoader />
      ) : (
        <main className="container instructor p-5">
          <div className="row">
            <div className="col-12 col-md-8  mt-5 mt-md-0 order-2 order-md-1">
              <div className="instructor__details">
                <div className="fw-bold title">INSTRUCTOR</div>
                <h1 className="fw-bold ">{instructorDetails?.name}</h1>
                <h2 className="fw-bold fs-4 mb-5">
                  {instructorDetails?.short_bio}
                </h2>
                <div className="instructor__stats d-flex mb-5">
                  <div className="total__students me-5">
                    <div className="fw-bold fs-4">Total Students</div>
                    <div className="fw-bold fs-1">
                      {totalStudents.toLocaleString("en-IN")}
                    </div>
                  </div>
                  <div className="total__reviews">
                    <div className="fw-bold fs-4">Reviews</div>
                    <div className="fw-bold fs-1">
                      {totalReviews.toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
                <div className="about mb-5">
                  <h2 className="fw-bold fs-4">About</h2>
                  <div>{instructorDetails?.about}</div>
                </div>
              </div>
              <div className="instructors__courses">
                <h2 className="fw-bold fs-3">
                  My courses ({instructorsCourses.length})
                </h2>
                <div className="mylearning-courses row">
                  {instructorsCourses?.map((course: ICourse) => {
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
              </div>
            </div>
            <div className="col-12 col-md-4 order-1 order-md-2">
              <div className="instructor__social d-flex flex-column align-items-center">
                <div className="profile-img mb-5">
                  <img
                    className="rounded-circle"
                    src={instructorDetails?.profile_img}
                    alt={`${instructorDetails?.name}'s profile image`}
                  />
                </div>
                <div className="social-btn d-none d-md-flex flex-column align-items-center ">
                  {instructorDetails?.social_urls.map((social_url: string) => {
                    let m;
                    let result;
                    while ((m = regex.exec(social_url!)) !== null) {
                      if (m.index === regex.lastIndex) {
                        regex.lastIndex++;
                      }
                      result = m[2];
                    }
                    return (
                      <a
                        key={social_url}
                        className="d-flex fw-bold align-items-center justify-content-center"
                        target="_blank"
                        href={social_url}
                      >
                        {result}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default InstructorDetailsPage;
