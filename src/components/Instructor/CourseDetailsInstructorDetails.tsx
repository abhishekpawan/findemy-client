import instructorData from "../../data/instructors.json";
import { AiTwotoneStar } from "react-icons/ai";
import { FaAward } from "react-icons/fa";
import { IoMdPeople } from "react-icons/io";
import { IoPlayCircle } from "react-icons/io5";

import "./coursedetailsinstructordetails.css";
import { FC, useEffect, useState } from "react";
import { showNotification } from "../../utils/ToastNotification";
import { Link } from "react-router-dom";
import { ICourse, InstructorDetails } from "../../utils/interface";

export const CourseDetailsInstructorDetails: FC<{
  instructor_id?: string;
}> = (props) => {
  const [instructorDetails, setInstructorDetails] =
    useState<InstructorDetails>();
  let totalStudents: number = 0;
  let totalReviews: number = 0;
  const [instructorsCourses, setInstructorsCourses] = useState<ICourse[]>([]);

  useEffect(() => {
    const getInstructorData = async () => {
      try {
        let response = await fetch(
          `https://findemy-server.glitch.me/instructors/${props?.instructor_id}`
        );
        let data = await response.json();
        if (data.success == true) {
          setInstructorDetails(data.instructor);
        }
      } catch (error) {
        // showNotification("error", error.toString());
      }
    };
    getInstructorData();
  }, [props?.instructor_id]);

  useEffect(() => {
    const getInstructorCourses = async () => {
      try {
        let response = await fetch(
          `https://findemy-server.glitch.me/courses/instructor/${props?.instructor_id}`
        );
        let data = await response.json();
        if (data.success == true) {
          setInstructorsCourses(data.course);
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
      totalStudents + parseFloat(course?.num_students.replaceAll(",", ""));
    totalReviews =
      totalReviews + parseFloat(course?.num_reviews.replaceAll(",", ""));
  }

  return (
    <div className="course__details_instructor" id="course__details_instructor">
      <h2 className="fw-bold mb-4">Instructor</h2>
      <div className="name fw-bold fs-3 text-decoration-underline">
        <Link to={`/instructordetails/${instructorDetails?._id}`}>
          {instructorDetails?.name}
        </Link>
      </div>
      <div className="short-bio">{instructorDetails?.short_bio}</div>
      <div className="instructor-stats mt-4 d-flex">
        <div className="profile-img me-3">
          <img
            className="rounded-circle"
            src={instructorDetails?.profile_img}
            alt={`${instructorDetails?.name}'s profile image`}
          />
        </div>
        <div className="stats pt-3 ms-3">
          <ul>
            <li>
              <AiTwotoneStar /> 4.6 instructor rating
            </li>
            <li>
              <FaAward /> {totalReviews.toLocaleString("en-IN")} reviews
            </li>
            <li>
              <IoMdPeople /> {totalStudents.toLocaleString("en-In")} Students
            </li>
            <li>
              <IoPlayCircle /> {instructorsCourses.length}
              {instructorsCourses.length > 1 ? " Courses" : " Course"}
            </li>
          </ul>
        </div>
      </div>
      <div className="about fs-4 mt-4">{instructorDetails?.about}</div>
    </div>
  );
};
