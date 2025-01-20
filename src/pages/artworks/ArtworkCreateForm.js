import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import Upload from "../../assets/upload-frame.webp";
import Asset from "../../components/Asset";
import { axiosReq } from "../../api/AxiosDefaults";
import formStyles from "../../styles/FormStyles.module.css";
import btnStyles from "../../styles/Buttons.module.css";
import appStyles from "../../App.module.css";
import { useRedirect } from "../../hooks/useRedirect";

function ArtworkCreateForm() {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});
  const [artworkData, setArtworkData] = useState({
    artwork_title: "",
    artist_name: "",
    style: "",
    type: "",
    payment_method: "",
    price: "",
    image: "",
    contact: "",
    location: "",
    description: "",
  });

  const imageInput = useRef(null);
  const history = useHistory();

  const {
    artwork_title,
    artist_name,
    style,
    type,
    payment_method,
    price,
    image,
    contact,
    location,
    description,
  } = artworkData;

  // Handle form input changes
  const handleChange = (event) => {
    setArtworkData({
      ...artworkData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle image input changes
  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setArtworkData({
        ...artworkData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  // Handle artwork form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("artwork_title", artwork_title);
    formData.append("artist_name", artist_name);
    formData.append("style", style);
    formData.append("type", type);
    formData.append("payment_method", payment_method);
    formData.append("price", price);
    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }
    formData.append("contact", contact);
    formData.append("location", location);
    formData.append("description", description);

    try {
      const { data } = await axiosReq.post("/artworks/", formData);
      history.push(`/artworks/${data.id}`);
      toast.success("Artwork listing created successfully!");
    } catch (error) {
      if (error.response?.status !== 401) {
        setErrors(error.response?.data);
      }
      toast.error(
        "Something went wrong while attempting to upload your artwork."
      );
    }
  };

  const formFields = (
    <div className="text-center">
      <Form.Group controlId="artwork_title">
        <Form.Label className={appStyles.AccentFont}>Artwork title*</Form.Label>
        <Form.Control
          type="text"
          placeholder="artwork title"
          name="artwork_title"
          value={artwork_title}
          onChange={handleChange}
          className={formStyles.FormControlBorderRadius}
        />
      </Form.Group>
      {errors.artwork_title?.map((message, index) => (
        <Alert key={index} variant="warning">
          {message}
        </Alert>
      ))}
      <Form.Group controlId="artist_name">
        <Form.Label className={appStyles.AccentFont}>Artist name</Form.Label>
        <Form.Control
          type="text"
          placeholder="artist name"
          name="artist_name"
          value={artist_name}
          onChange={handleChange}
          className={formStyles.FormControlBorderRadius}
        />
      </Form.Group>
      {errors.artist_name?.map((message, index) => (
        <Alert key={index} variant="warning">
          {message}
        </Alert>
      ))}
      <div className={formStyles.StypeAndTypeContainer}>
        <Form.Group controlId="style">
          <div className={formStyles.StyleToPriceFormContainer}>
            <Form.Label
              className={`${appStyles.AccentFont} ${formStyles.FormLabelMargin}`}
            >
              Style
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="style"
              name="style"
              as="select"
              value={style}
              onChange={handleChange}
              className={formStyles.FormControlBorderRadius}
            >
              <option value="Modern">Modern</option>
              <option value="Contemporary">Contemporary</option>
              <option value="Digital art">Digital art</option>
              <option value="Old Masters">Old Masters</option>
              <option value="Classical">Classical</option>
              <option value="Other">Other</option>
            </Form.Control>
          </div>
        </Form.Group>
        {errors.style?.map((message, index) => (
          <Alert key={index} variant="warning">
            {message}
          </Alert>
        ))}
        <Form.Group controlId="type">
          <div className={formStyles.StyleToPriceFormContainer}>
            <Form.Label
              className={`${appStyles.AccentFont} ${formStyles.FormLabelMargin}`}
            >
              Type
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="type"
              name="type"
              as="select"
              value={type}
              onChange={handleChange}
              className={formStyles.FormControlBorderRadius}
            >
              <option value="Collage">Collage</option>
              <option value="Drawing">Drawing</option>
              <option value="Needlework">Needlework</option>
              <option value="Etching">Etching</option>
              <option value="Painting">Painting</option>
              <option value="Photography">Photography</option>
              <option value="Pottery">Pottery</option>
              <option value="Sculpture">Sculpture</option>
              <option value="Watercolour">Watercolour</option>
              <option value="Other">Other</option>
            </Form.Control>
          </div>
        </Form.Group>
        {errors.type?.map((message, index) => (
          <Alert key={index} variant="warning">
            {message}
          </Alert>
        ))}
      </div>
      <div className={formStyles.PriceAndPaymentContainer}>
        <Form.Group controlId="payment_method">
          <div className={formStyles.StyleToPriceFormContainer}>
            <Form.Label
              className={`${appStyles.AccentFont} ${formStyles.FormPayLabelMargin}`}
            >
              Pay
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="payment method"
              name="payment_method"
              as="select"
              value={payment_method}
              onChange={handleChange}
              className={formStyles.FormControlBorderRadius}
            >
              <option value="Paypal">Paypal</option>
              <option value="Cash">Cash</option>
            </Form.Control>
          </div>
        </Form.Group>
        {errors.payment_method?.map((message, index) => (
          <Alert key={index} variant="warning">
            {message}
          </Alert>
        ))}
        <Form.Group controlId="price">
          <div className={formStyles.StyleToPriceFormContainer}>
            <Form.Label
              className={`${appStyles.AccentFont} ${formStyles.FormLabelMargin}`}
            >
              Price
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="£ 0.00"
              name="price"
              value={price}
              onChange={handleChange}
              className={`${formStyles.PriceInputWidth} ${formStyles.FormControlBorderRadius}`}
            />
          </div>
        </Form.Group>
        {errors.price?.map((message, index) => (
          <Alert key={index} variant="warning">
            {message}
          </Alert>
        ))}
      </div>
      <Form.Group controlId="contact">
        <Form.Label className={appStyles.AccentFont}>Contact*</Form.Label>
        <Form.Control
          type="text"
          placeholder="contact"
          name="contact"
          value={contact}
          onChange={handleChange}
          className={formStyles.FormControlBorderRadius}
        />
      </Form.Group>
      {errors.contact?.map((message, index) => (
        <Alert key={index} variant="warning">
          {message}
        </Alert>
      ))}
      <Form.Group controlId="location">
        <Form.Label className={appStyles.AccentFont}>Location*</Form.Label>
        <Form.Control
          type="text"
          placeholder="location"
          name="location"
          value={location}
          onChange={handleChange}
          className={formStyles.FormControlBorderRadius}
        />
      </Form.Group>
      {errors.location?.map((message, index) => (
        <Alert key={index} variant="warning">
          {message}
        </Alert>
      ))}
      <Form.Group controlId="description">
        <Form.Label className={appStyles.AccentFont}>Description*</Form.Label>
        <Form.Control
          type="text"
          placeholder="description"
          name="description"
          as="textarea"
          value={description}
          onChange={handleChange}
          className={formStyles.FormControlBorderRadius}
        />
      </Form.Group>
      {errors.description?.map((message, index) => (
        <Alert key={index} variant="warning">
          {message}
        </Alert>
      ))}
      <div>
        <button
          type="button"
          className={`mx-2 ${btnStyles.ButtonStyles}`}
          onClick={() => history.goBack()}
        >
          Cancel
        </button>
        <button className={`mx-2 ${btnStyles.ButtonStyles}`} type="submit">
          Create
        </button>
      </div>
      <p className="mt-3 text-left">* denotes required fields</p>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Container>
        <Row>
          <Col className="p-2 p-md-2" md={5} lg={6}>
            <Container
              className={`d-flex flex-column justify-content-center py-3 p-4 ${formStyles.MainArtworkFormContainer}`}
            >
              <Form.Group className="text-center col-s-mb-0">
                {image ? (
                  <>
                    <figure>
                      <Image className={appStyles.Image} src={image} rounded />
                    </figure>
                    <div
                      className={`${formStyles.CreateArtworkUpload} ${btnStyles.ButtonStyles}`}
                    >
                      <Form.Label htmlFor="image-upload" className="mb-0">
                        Change the image
                      </Form.Label>
                    </div>
                  </>
                ) : (
                  <Form.Label
                    className={`d-flex justify-content-center ${appStyles.Image} ${formStyles.CreateArtworkUpload} ${appStyles.AccentFont}`}
                    htmlFor="image-upload"
                  >
                    <Asset
                      src={Upload}
                      message="Click or tap to upload an image"
                    />
                  </Form.Label>
                )}
                <Form.File
                  id="image-upload"
                  accept="image/*"
                  onChange={handleChangeImage}
                  ref={imageInput}
                />
                {errors.image?.map((message, index) => (
                  <Alert key={index} variant="warning">
                    {message}
                  </Alert>
                ))}
              </Form.Group>
              <div className="d-md-none">{formFields}</div>
            </Container>
          </Col>
          <Col md={7} lg={6} className="d-none d-md-block p-2 p-md-2">
            <Container>{formFields}</Container>
          </Col>
        </Row>
      </Container>
    </Form>
  );
}

export default ArtworkCreateForm;
