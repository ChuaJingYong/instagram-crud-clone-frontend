import { useContext, useState } from "react";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { ProfileContext } from "../App";
import { useDispatch } from "react-redux";
import { createPost } from "../features/posts/postsSlice";

export default function AddPostModal({ show, handleClose }) {
  const { image, name } = useContext(ProfileContext);
  const dispatch = useDispatch();

  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [invalidUrl, setInvalidUrl] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (imageUrl) {
      dispatch(createPost({ image: imageUrl, description }));
      // Clearing the content for modal (both image and description properties)
      setImageUrl("");
      setDescription("");
      // This runs the function from the App.jsx which will set the "show" state to false
      // This also means that the central "show" state is managed under App.jsx, not inside the child componenent
      handleClose();
    } else {
      // If valid ImageURL is not found, set the state invalidUrl = true so that users know there's unexpected behavior
      setInvalidUrl(true);
    }
  };

  // These are for error message handling when the image isn't loading
  const handleImageError = () => {
    setInvalidUrl(true);
  };

  // this removes the error message "Invalid URL or failed to load image"
  const handleImageLoad = () => {
    setInvalidUrl(false);
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header>
        <Modal.Title>Create new post</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            <Col sm={7} style={{ margin: "0px" }}>
              <Image
                // Here it's showing the image of the url, if not, then the placeholder image
                src={
                  imageUrl
                    ? imageUrl
                    : "https://content.hostgator.com/img/weebly_image_sample.png"
                }
                alt="uploaded content"
                // This boolean value provides an if-else condition for the error message below to display or not ("Invalid URL or failed to load image")
                onError={handleImageError}
                onLoad={handleImageLoad} // This is a standard HTML DOM onLoad event handler
                style={{ width: "100%" }}
              />
            </Col>
            <Col sm={5}>
              <Image
                src={image}
                alt="uploader"
                style={{ width: "32px" }}
                roundedCircle
              />
              <span className="ms-3">{name}</span>
              <Form.Control
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="my-3"
                placeholder="Add image url"
              />
              {/* Error Message Handling when image isn't loading */}
              {invalidUrl && (
                <div className="text-danger">
                  Invalid URL or failed to load image
                </div>
              )}
              <Form.Control
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="my-3"
                as={"textarea"}
                rows={3}
                placeholder="Write a caption"
              />
              {/* No onClick handler needed here due to using onSubmit with the Form already */}
              <Button type="submit" style={{ width: "100%" }}>
                Share
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
