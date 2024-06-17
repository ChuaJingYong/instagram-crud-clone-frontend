import { useContext } from "react";
import { Row, Col, Image, Button } from "react-bootstrap";
import { ProfileContext } from "../App";
import { useSelector } from "react-redux";
import { useState } from "react";
import UpdatePostModal from "./UpdatePostModal";
import DeletePostModal from "./DeletePostModal";
import DisplayPostModal from "./DisplayPostModel";

export default function ImageGrid() {
  const posts = useSelector((state) => state.posts);
  const [show, setShow] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  function handleCloseEdit() {
    setCurrentPost(null);
    setShow(false);
  }

  function handleShowEdit(post) {
    setCurrentPost(post);
    setShow(true);
  }

  function handleCloseDelete() {
    setCurrentPost(null);
    setShowDeleteModal(false);
  }

  function handleShowDelete(post) {
    setCurrentPost(post);
    setShowDeleteModal(true);
  }

  const [showPost, setShowPost] = useState(false);

  const handleClosePost = (post) => {
    setCurrentPost(null);
    setShowPost(false);
  };

  const handleShowPost = (post) => {
    setCurrentPost(post);
    setShowPost(true);
  };

  const renderImages = () => {
    return posts.map((post) => (
      <>
        <Col md={4} key={post.id} className="mb-4">
          <Image
            style={{ cursor: "pointer" }}
            onClick={() => {
              // alert(`image ${post.id} has been clicked`);
              // Toggle the show status so that the modal now can be displayed
              console.log("POST DETAILS", post);
              handleShowPost(post);
            }}
            src={post.image}
            fluid
          />
          <Button
            onClick={() => handleShowEdit(post)}
            variant="outline-primary"
          >
            <i className="bi bi-pencil-square"></i>
          </Button>
          <Button
            onClick={() => handleShowDelete(post)}
            variant="outline-danger"
          >
            <i className="bi bi-trash"></i>
          </Button>
        </Col>
      </>
    ));
  };

  return (
    <>
      <Row>{renderImages()}</Row>
      {currentPost && (
        // Here we're running one Popup Modal, which is used repeatedly for all different posts. We specify what to put into the modal based on 3 input properties:
        // - show (state to control modal visibility)
        // - handleClose (a function to toggle off show)
        // - postId

        <UpdatePostModal
          show={show}
          handleClose={handleCloseEdit}
          postId={currentPost.id}
        />
      )}
      {currentPost && (
        <DeletePostModal
          show={showDeleteModal}
          handleClose={handleCloseDelete}
          postId={currentPost.id}
        />
      )}

      {/* Here we're passing the useState and the closing post function, which sets the state as "show=false" */}
      {currentPost && (
        <DisplayPostModal
          postId={currentPost.id}
          show={showPost}
          handleClose={handleClosePost}
        />
      )}
    </>
  );
}
