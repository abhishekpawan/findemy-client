import { Skeleton } from "antd";

const HomePageCourseCardLoader = () => {
  return (
    <>
      <div className="d-none d-lg-flex">
        <div className="d-flex flex-column container-fluid">
          <Skeleton.Image style={{ width: "230px", height: "140px" }} active />
          <br />
          <br />
          <Skeleton style={{ width: "230px" }} paragraph={{ rows: 3 }} active />
        </div>
        <div className="d-flex flex-column container-fluid">
          <Skeleton.Image style={{ width: "230px", height: "140px" }} active />
          <br />
          <br />
          <Skeleton style={{ width: "230px" }} paragraph={{ rows: 3 }} active />
        </div>
        <div className="d-flex flex-column container-fluid">
          <Skeleton.Image style={{ width: "230px", height: "140px" }} active />
          <br />
          <br />
          <Skeleton style={{ width: "230px" }} paragraph={{ rows: 3 }} active />
        </div>
        <div className="d-flex flex-column container-fluid">
          <Skeleton.Image style={{ width: "230px", height: "140px" }} active />
          <br />
          <br />
          <Skeleton style={{ width: "230px" }} paragraph={{ rows: 3 }} active />
        </div>
      </div>
      <div className="d-none d-sm-flex d-lg-none">
        <div className="d-flex flex-column container-fluid">
          <Skeleton.Image style={{ width: "230px", height: "140px" }} active />
          <br />
          <br />
          <Skeleton style={{ width: "230px" }} paragraph={{ rows: 3 }} active />
        </div>
        <div className="d-flex flex-column container-fluid">
          <Skeleton.Image style={{ width: "230px", height: "140px" }} active />
          <br />
          <br />
          <Skeleton style={{ width: "230px" }} paragraph={{ rows: 3 }} active />
        </div>
      </div>
      <div className="d-flex d-sm-none">
        <div className="d-flex flex-column container-fluid">
          <Skeleton.Image style={{ width: "230px", height: "140px" }} active />
          <br />
          <br />
          <Skeleton style={{ width: "230px" }} paragraph={{ rows: 3 }} active />
        </div>
      </div>
    </>
  );
};

export default HomePageCourseCardLoader;
