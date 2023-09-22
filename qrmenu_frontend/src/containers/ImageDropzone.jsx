import { Spinner } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { uploadImage } from "../apis";

const Dropzone = styled.div`
  border: 1px dashed #ced4d9;
  border-radius: 5px;
  color: #6c757d;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 142px;
  img {
    height: 140px;
  }
`;

// eslint-disable-next-line react/prop-types
function ImageDropzone({ value, onChange }) {
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);

    setLoading(true);
    uploadImage(acceptedFiles[0])
      .then((json) => onChange(json.url))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/*",
  });

  return (
    <Dropzone {...getRootProps()}>
      <input {...getInputProps()} />
      {value ? (
        <img src={value} />
      ) : loading ? (
        <Spinner animation="border" role="status" variant="light">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <span>Drag & drop file here, or click to select file</span>
      )}
    </Dropzone>
  );
}

ImageDropzone.propTypes = {
  onChange: PropTypes.func,
};

export default ImageDropzone;
