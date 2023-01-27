import featuredTopics from "../../data/featuredTopics.json";
import HomepageCourseCard from "./HomepageCourseCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomepageFeaturedTopics from "./HomepageFeaturedTopics";
import Slider from "react-slick";
import NextArrow from "../UI_Components/NextArrow";
import PrevArrow from "../UI_Components/PrevArrow";

import "./homepage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import HomePageCourseCardLoader from "./HomePageCourseCardLoader";
import { showNotification } from "../../utils/ToastNotification";
import { ICourse } from "../../utils/interface";

const HomePage = () => {
  const [allCourses, setAllCourses] = useState<ICourse[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  const sliderSettings = {
    slidesToShow: 5,
    slidesToScroll: 1,
    infinite: true,
    arrows: true,
    autoplay: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dots: false,
    speed: 500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  useEffect(() => {
    const getAllCourses = async () => {
      try {
        let response = await fetch("http://localhost:3001/courses/all");
        let data = await response.json();
        if (data.success == true) {
          setAllCourses(data.allCourses);
          setLoading(false);
        } else {
          throw new Error(data.message);
        }
      } catch (error: any) {
        showNotification("error", error.toString());
        setLoading(false);
      }
    };
    getAllCourses();
  }, []);

  return (
    <main className="homepage">
      <div className="homepage__courses ">
        <h2 className="fw-bold mb-5 fs-1"> Students are viewing</h2>
        {isLoading ? (
          <HomePageCourseCardLoader />
        ) : (
          <Slider {...sliderSettings}>
            {allCourses?.map((course: ICourse) => {
              return <HomepageCourseCard key={course._id} course={course} />;
            })}
          </Slider>
        )}
      </div>

      <div className="featured-topics__container ">
        <div className="featured-topics ">
          <h2 className="fw-bold mb-5 fs-1">Featured topics by category</h2>
          <div className="row">
            {featuredTopics.map((featuredTopic) => {
              return (
                <HomepageFeaturedTopics
                  key={featuredTopic.id}
                  id={featuredTopic.id}
                  field={featuredTopic.field}
                  topics={featuredTopic.topics}
                />
              );
            })}
          </div>
          <div className="featured-topics__btn d-flex align-items-center fw-bold fs-5 px-3">
            <a>Explored more topics</a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
