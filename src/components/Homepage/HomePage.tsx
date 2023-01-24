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

interface ICourse {
  _id: string;
  title: string;
  instructor_id: string;
  instructor_name: string;
  original_price: number;
  discounted_price: number;
  rating: number;
  num_students: string;
  num_reviews: string;
  level: string;
  tag: string;
  category: string;
  course_thumbnail: string;
  course_video: string;
  requirements: string[];
  description: string;
  short_description: string;
  learning_points: string[];
}

const HomePage = () => {
  const [allCourses, setAllCourses] = useState<ICourse[]>([]);

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
    const signup = async () => {
      try {
        let response = await axios.get("http://localhost:3001/courses/all");
        if (response.data.success === true) {
          setAllCourses(response.data.allCourses);
        } else {
          throw new Error("Something went wrong! " + response.status);
        }
      } catch (error) {
        console.log(error);
      }
    };

    signup();
  }, []);

  return (
    <main className="homepage">
      <div className="homepage__courses ">
        <h2 className="fw-bold mb-5 fs-1"> Students are viewing</h2>
        <Slider {...sliderSettings}>
          {allCourses?.map((course: ICourse) => {
            return (
              <HomepageCourseCard
                key={course._id}
                id={course._id}
                title={course.title}
                instructor={course.instructor_name}
                price={course.original_price}
                discounted_price={course.discounted_price}
                rating={course.rating}
                num_reviews={course.num_reviews}
                level={course.level}
                tag={course.tag}
                category={course.category}
                thumbnail={course.course_thumbnail}
              />
            );
          })}
        </Slider>
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