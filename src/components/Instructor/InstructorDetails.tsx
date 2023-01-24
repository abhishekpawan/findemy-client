import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { showNotification } from "../ToastNotification/ToastNotification";
import { InstructorDetails } from "./CourseDetailsInstructorDetails";

import "./instructordetails.css";
import InstructorDetailsLoader from "./InstructorDetailsLoader";

const InstructorDetailsPage = () => {
  const { id } = useParams();
  const [instructorDetails, setInstructorDetails] =
    useState<InstructorDetails>();
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getInstructorData = async () => {
      try {
        let response = await fetch(`http://localhost:3001/instructors/${id}`);
        let data = await response.json();
        if (data.success == true) {
          setInstructorDetails(data.instructor);
          setLoading(false);
        }
      } catch (error: any) {
        showNotification("error", error.toString());
      }
    };
    getInstructorData();
  }, []);
  // console.log(instructorDetails?.social_urls[1].split(".")[1]);
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
                    <div className="fw-bold fs-1">666,322</div>
                  </div>
                  <div className="total__reviews">
                    <div className="fw-bold fs-4">Reviews</div>
                    <div className="fw-bold fs-1">73,221</div>
                  </div>
                </div>
                <div className="about">
                  <h2 className="fw-bold fs-4">About</h2>
                  <div>{instructorDetails?.about}</div>
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
                    return <button key={social_url}>{social_url}</button>;
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
