import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/AxiosDefaults";
import { toast } from "react-toastify";
import Avatar from "../../components/Avatar";

function BidCreateForm(props) {
  const [errors, setErrors] = useState({});
  const { artwork, setArtwork, setBids, profile_image, profile_id } = props;
  const [bidData, setBidData] = useState({
    email: "",
    bid_price: "",
  });
  const { bid_price, email } = bidData;

  const handleChange = (event) => {
    setBidData({
      ...bidData,
      [event.target.name]: event.target.value,
    });
    // This part of code was appropriated from medium.com. Full credit is
    // noted in the Readme file.
    if (errors[event.target.name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [event.target.name]: null,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/bids/", {
        bid_price,
        artwork,
        email,
      });
      setBids((prevBids) => ({
        ...prevBids,
        results: [data, ...prevBids.results],
      }));
      setArtwork((prevArtwork) => ({
        results: [
          {
            ...prevArtwork.results[0],
            bids_count: prevArtwork.results[0].bids_count + 1,
          },
        ],
      }));
      setBidData({
        email: "",
        bid_price: "",
      });
      toast.success("Your bid submitted!");
    } catch (error) {
      if (error.response?.status !== 401) {
        setErrors(error.response?.data);
      }
      toast.error("Something went wrong while attempting to submit your bid");
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          {/* {owner} */}
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} />
          </Link>
          <Form.Control
            placeholder="my bid"
            name="bid_price"
            type="decimal"
            value={bid_price}
            onChange={handleChange}
            rows={2}
          />
          {/* {Array.isArray(errors.bid_price) && errors.bid_price.map((message, index) => (
                <Alert key={index} variant="warning">
                    {message}
                </Alert>
            ))} */}
          {errors.bid_price?.map((message, index) => (
            <Alert key={index} variant="warning">
              {message}
            </Alert>
          ))}

          <Form.Control
            placeholder="email"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      {/* {Array.isArray(errors.email) && errors.email.map((message, index) => (
            <Alert key={index} variant="warning">
                {message}
            </Alert>
        ))} */}
      {errors.email?.map((message, index) => (
        <Alert key={index} variant="warning">
          {message}
        </Alert>
      ))}
      <button
        className="btn d-block ml-auto"
        // disabled={!bidPrice.trim()}
        type="submit"
      >
        Send your bid
      </button>
    </Form>
  );
}

export default BidCreateForm;
