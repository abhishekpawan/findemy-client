export interface UserData {
  id: string;
  name: string;
  email: string;
  token: string;
}

export interface ICourse {
  _id?: string;
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
  learning_point: string[];
}

// export interface ICourseCard {
//   id: string;
//   title: string;
//   instructor: string;
//   price: number;
//   discounted_price: number;
//   rating: number;
//   num_reviews: string;
//   level: string;
//   tag: string;
//   category: string;
//   thumbnail: string;
// }

export interface ICartCourse extends ICourse {
  user_id: string;
  course_id: string;
}

export interface InstructorDetails {
  _id: string;
  name: string;
  email: string;
  short_bio: string;
  about: string;
  profile_img: string;
  social_urls: string[];
}

export interface ITopics {
  id: number;
  category: string;
  noOfStudents: string;
}

export interface IFeaturedTopics {
  id: number;
  field: string;
  topics: ITopics[];
}

export interface ISlick {
  onClick?: () => void;
  className?: string;
}
