import instructorData from "../../data/instructors.json";
import { AiTwotoneStar } from "react-icons/ai";
import { FaAward } from "react-icons/fa";
import { IoMdPeople } from "react-icons/io";
import { IoPlayCircle } from "react-icons/io5";

import "./coursedetailsinstructordetails.css";
import { FC, useEffect, useState } from "react";
import { showNotification } from "../ToastNotification/ToastNotification";
import { Link } from "react-router-dom";

export interface InstructorDetails {
  _id: string;
  name: string;
  email: string;
  short_bio: string;
  about: string;
  profile_img: string;
  social_urls: string[];
}

export const CourseDetailsInstructorDetails: FC<{
  instructor_id?: string;
}> = (props) => {
  const [instructorDetails, setInstructorDetails] =
    useState<InstructorDetails>();

  useEffect(() => {
    const getInstructorData = async () => {
      try {
        let response = await fetch(
          `http://localhost:3001/instructors/${props.instructor_id}`
        );
        let data = await response.json();
        if (data.success == true) {
          setInstructorDetails(data.instructor);
        }
      } catch (error: any) {
        showNotification("error", error.toString());
      }
    };
    getInstructorData();
  }, []);

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
      <div className="about fs-4 mt-4">{instructorDetails?.about}</div>
    </div>
  );
};
