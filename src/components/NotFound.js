import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <body style={{ backgroundColor: "#fca5a5" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: "2rem",
          marginTop: "15rem",
        }}
      >
        <h2>Sorry!</h2>
        <p>Error 404! Page Not Found</p>
        <Link to="/">Go back to HomePage....</Link>
      </div>
    </body>
  );
};

export default NotFound;
