import instructorData from "../../data/instructors.json";
import { AiTwotoneStar } from "react-icons/ai";
import { FaAward } from "react-icons/fa";
import { IoMdPeople } from "react-icons/io";
import { IoPlayCircle } from "react-icons/io5";

import "./coursedetailsinstructordetails.css";

export const CourseDetailsInstructorDetails = () => {
  return (
    <div className="course__details_instructor">
      <h2 className="fw-bold mb-4">Instructor</h2>
      <div className="name fw-bold fs-3 text-decoration-underline">
        <a href="">{instructorData[0].name}</a>
      </div>
      <div className="short-bio">{instructorData[0].short_bio}</div>
      <div className="instructor-stats mt-4 d-flex">
        <div className="profile-img me-3">
          <img
            className="rounded-circle"
            src={instructorData[0].profile_img}
            alt={`${instructorData[0].name}'s profile image`}
          />
        </div>
        <div className="stats pt-3 ms-3">
          <ul>
            <li>
              <AiTwotoneStar /> 4.6 instructor rating
            </li>
            <li>
              <FaAward /> 388,333 reviews
            </li>
            <li>
              <IoMdPeople /> 23,444,2 Students
            </li>
            <li>
              <IoPlayCircle /> 8 Courses
            </li>
          </ul>
        </div>
      </div>
      <div className="about fs-4 mt-4">{instructorData[0].about}</div>
    </div>
  );
};
