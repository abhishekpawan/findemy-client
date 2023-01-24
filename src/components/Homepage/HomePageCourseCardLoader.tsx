import { Skeleton } from "antd";

const HomePageCourseCardLoader = () => {
  return (
    <div className="d-flex flex-column container-fluid">
      <Skeleton.Image style={{ width: "230px", height: "140px" }} active />
      <br />
      <br />
      <Skeleton style={{ width: "230px" }} paragraph={{ rows: 3 }} active />
    </div>
  );
};

export default HomePageCourseCardLoader;
