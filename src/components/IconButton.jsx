import { Button } from "react-bootstrap";

export default function IconButton({ isTop, isBottom, className, onClick }) {
  let margin = "light";
  let buttonStyle = { fontSize: "24px" };
  if (isTop) {
    margin = "light my-4";
  } else if (isBottom) {
    margin = "light mt-auto mb-3";
  }
  console.log("classname", className);

  if (className === "bi bi-plus-square") {
    console.log("classname", className);
    buttonStyle = { fontSize: "24px", color: "blue" };
  }

  return (
    <Button variant={margin} style={{ marginBottom: "7px" }} onClick={onClick}>
      <i className={className} style={buttonStyle}></i>
    </Button>
  );
}
