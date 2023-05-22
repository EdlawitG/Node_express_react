import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  FormLabel,
  TextareaAutosize,
  Stack,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
function Update() {
  const [values, setValues] = useState([
    { title: "", price: "", description: "", place: "", image: "", date: "" },
  ]);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    getTicket(id);
  }, [id]);
  const getTicket = async (id) => {
    const response = await axios.get(`http://localhost:4000/ticket/${id}`);
    if (response.status === 200) {
      setValues({ ...response.data });
      // console.log(response.data);
    }
  };
  const updateTicket = async (data, id) => {
    const response = await axios.put(`/ticket/${id}`, data);
    console.log(data)
    if (response.status === 200) {
      alert("Updated Succesfully");
      navigate("/");
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setValues({ ...values, [name]: value });
    console.log(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTicket(values, id);
  };
  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
        spacing={2}
      >
        <form onSubmit={handleSubmit}>
          <Typography variant="h2" m={2}>
            Update The Ticket
          </Typography>
          <Stack
            direction={"column"}
            style={{ width: "30rem" }}
            spacing={2}
            mb={6}
          >
            <FormLabel>Title of the Ticket:</FormLabel>
            <TextField
              variant="outlined"
              type="text"
              onChange={handleChange}
              value={values.title}
            />
            <FormLabel>Description:</FormLabel>
            <TextareaAutosize
              minRows={4}
              value={values.description}
              onChange={handleChange}
            ></TextareaAutosize>
            <FormLabel>Price:</FormLabel>
            <TextField
              type="number"
              value={values.price}
              inputProps={{ min: 1 }}
              variant="outlined"
              onChange={handleChange}
            />
            <FormLabel>Date:</FormLabel>
            <TextField
              variant="outlined"
              type="date"
              value={values.date}
              onChange={handleChange}
            />
            <FormLabel>Place:</FormLabel>
            <TextField
              type="text"
              variant="outlined"
              value={values.place}
              onChange={handleChange}
            />
            <FormLabel>Image of Ticket:</FormLabel>
            <TextField
              type="file"
              variant="outlined"

              // onChange={ handleChange}

              //     (event) => {
              //     setValues({ ...values, image: event.target.files[0] });
              //   }}
            />
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Stack>
        </form>
      </Grid>
    </>
  );
}

export default Update;
