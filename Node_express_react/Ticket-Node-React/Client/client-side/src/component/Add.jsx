import { React, useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  FormLabel,
  TextareaAutosize,
  Stack,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function Add() {
  const [values, setValues] = useState({
    title: "",
    price: "",
    description: "",
    place: "",
    image: "",
    date: "",
  });
  const navigate = useNavigate();
  const createTicket = async () => {
    const response = await axios.post("http://localhost:4000/ticket", values);
    if (response.status === 200) {
      alert("added succesfully");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !values.title ||
      !values.description ||
      !values.date ||
      !values.place ||
      !values.price ||
      !values.image
    ) {
      alert("Please provide value into each input field");
    } else {
      createTicket(values);
      navigate("/");
    }
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
            Add New Ticket
          </Typography>
          <Stack
            direction={"column"}
            style={{ width: "30rem" }}
            spacing={2}
            mb={6}
          >
            <FormLabel>Title of the Ticket:</FormLabel>
            <TextField
              label="Title"
              variant="outlined"
              type="text"
              onChange={(event) =>
                setValues({ ...values, title: event.target.value })
              }
            />
            <FormLabel>Description:</FormLabel>
            <TextareaAutosize
              minRows={4}
              placeholder="Write the description of the event"
              onChange={(event) =>
                setValues({ ...values, description: event.target.value })
              }
            ></TextareaAutosize>
            <FormLabel>Price:</FormLabel>
            <TextField
              label="Price"
              type="number"
              inputProps={{ min: 1 }}
              variant="outlined"
              onChange={(event) =>
                setValues({ ...values, price: event.target.value })
              }
            />
            <FormLabel>Date:</FormLabel>
            <TextField
              type="date"
              variant="outlined"
              onChange={(event) =>
                setValues({ ...values, date: event.target.value })
              }
            />
            <FormLabel>Place:</FormLabel>
            <TextField
              label="Place"
              type="text"
              variant="outlined"
              onChange={(event) =>
                setValues({ ...values, place: event.target.value })
              }
            />
            <FormLabel>Image of Ticket:</FormLabel>
            <TextField
              type="file"
              variant="outlined"
              onChange={(e) =>
                setValues({ ...values, image: e.target.files[0] })
              }
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

export default Add;
