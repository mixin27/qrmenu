import { Form, Button, Spinner } from "react-bootstrap";
import { useState } from "react";
import PropTypes from "prop-types";

import { useAuth } from "../hooks/useAuth";
import { addPlace } from "../apis";
import ImageDropzone from "./ImageDropzone";

const PlaceForm = ({ onDone }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = useAuth();

  const onSubmit = async () => {
    setLoading(true);
    const json = await addPlace({ name, image }, auth.token);
    if (json) {
      setName("");
      setImage("");
      onDone();
    }
    setLoading(false);
  };

  return (
    <div>
      <h4 className="text-center">Place</h4>

      <Form.Group className="my-2">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="my-2">
        <Form.Label>Image</Form.Label>
        <ImageDropzone value={image} onChange={setImage} />
      </Form.Group>

      <div className="d-grid gap-2 my-2">
        <Button
          variant="primary"
          size="lg"
          onClick={onSubmit}
          //   disabled={loading}
        >
          {loading ? (
            <Spinner animation="border" role="status" variant="light">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            "Add Place"
          )}
        </Button>
      </div>
    </div>
  );
};

PlaceForm.propTypes = {
  onDone: PropTypes.func,
};

export default PlaceForm;
