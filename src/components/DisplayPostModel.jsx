import { useState, useContext } from "react";
import { Modal, Form, Row, Col, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { ProfileContext } from "../App";
// IMPORTANT NOTE: The parent container which will run the showModal child component will need to handle the useState logic and pass the value/functions down to the child component

// When clicking on the image, it should launch it's own Modal
// Modal will show image, and some details of the user's post (user profile image, name)
// Have a comment section where if after they type their stuff, onSubmit will add the the comment into the post object as a comments array
// Comment must have user profile, name, message, timestamp

function DisplayPostModal({ postId, show, handleClose }) {
  console.log("POST ID SELECTED", postId);
  const [comment, setComment] = useState("");
  const { image, name } = useContext(ProfileContext);

  const post = useSelector((state) =>
    state.posts.find((post) => post.id === postId)
  );

  function handleSubmit(e) {
    e.preventDefault();
    alert(comment);
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Body>
          <Row>
            {/* Image section, 7/12 ratio */}
            <Col sm={7}>
              <Image
                src={post.image}
                alt={post.description}
                style={{ width: "100%" }}
              />
            </Col>

            {/* Comment section, 5/12 ratio */}
            <Col sm={5} style={{ height: "50vh", top: "50px" }}>
              <Form onSubmit={handleSubmit}>
                <Image
                  src={image}
                  style={{ width: "50px", borderRadius: "50%" }}
                  className="me-3"
                />
                <span>{name}</span>
                <section
                  className="comment-section"
                  style={{ maxHeight: "350px", overflow: "auto" }}
                >
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Deleniti reprehenderit quis repellendus veniam incidunt
                    exercitationem sapiente sunt enim rem distinctio!
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Esse, non!
                  </p>
                </section>
                <div className="mt-auto">
                  <i className="bi bi-heart me-2"></i>
                  <i className="bi bi-chat me-2"></i>
                  <i className="bi bi-share me-2"></i>
                </div>
                <div>
                  <span>
                    <i className="bi bi-emoji-smile"></i>
                  </span>
                  <Form.Control
                    type="textarea"
                    placeholder="Add a comment..."
                    onChange={(e) => setComment(e.target.value)}
                  ></Form.Control>
                </div>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DisplayPostModal;
