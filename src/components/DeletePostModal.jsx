import { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { ProfileContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../features/posts/postsSlice";

export default function DeletePostModal({ show, handleClose, postId }) {
  const dispatch = useDispatch();
  const [confirmDelete, setConfirmDelete] = useState(false);
  // useSelector is used to extract data from the Redux store to be used

  //   const post = useSelector((state) =>
  //     state.posts.find((post) => post.id === postId)
  //   );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirmDelete) {
      //   dispatch(createPost({ image: imageUrl, description }));
      dispatch(
        deletePost({
          id: postId,
        })
      );
    }
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header>
        <Modal.Title>Edit post</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Header>
          <Modal.Title>Confirm Deleting Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            type="submit"
            onClick={() => setConfirmDelete(false)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            type="submit"
            onClick={() => setConfirmDelete(true)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
