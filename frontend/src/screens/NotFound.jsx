import { Image } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center my-5">
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdeVdWSWDeazrC4-nzPkH5tqo5sn4S5PJuHA&usqp=CAU"
          alt="image not found"
        />
        <code style={{ fontSize: "2rem" }}>404 Page Not Found</code>
        <p>The page you are looking for {location.pathname} if not found</p>
        <Link to="/" className="btn btn-sm">
          Go Back
        </Link>
      </div>
    </>
  );
};

export default NotFound;
