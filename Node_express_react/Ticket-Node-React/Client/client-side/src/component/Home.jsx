import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { AiFillEye} from 'react-icons/ai'
import axios from "axios";
import { Button, Grid, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
function Home() {
  const [data, setData] = useState([{}]);
  const navigate = useNavigate()
  useEffect(() => {
    getTickets();
  }, []);

  const getTickets = async () => {
    const response = await axios.get("http://localhost:4000/tickets");
    if (response.status === 200) {
      setData(response.data);
    }
  };

const handleDelete = async (id)=>{
    if(window.confirm("Are You Sure you want to Delete?")){
        const response = await axios.delete(`/ticket/${id}`);
        if(response.status === 200){
            alert('One Ticket has been deleted successfully!!!')
            getTickets();
            navigate('/')
        }
    }
}

  return (
    <>
      <Stack ml={5}>
        <Stack mb={5} mt={5}>
          <Button
            color="success"
            variant="contained"
            sx={{
              maxWidth: 200,
              padding: (theme) => theme.spacing(1.5),
              fontSize: "20px",
            }}
            endIcon={
              <AddIcon sx={{ fontSize: (theme) => theme.spacing(40) }} />
            }
          >
            <Link to="/create" className="link-new">
              Create New
            </Link>
          </Button>
        </Stack>
        <Grid
          container
          spacing={{ xs: 2, md: 4 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {data &&
            data.map((dat, index) => (
              <Grid m={1} key={index}>
                <Card sx={{ maxWidth: 450 }}>
                  <CardMedia
                    component="img"
                    height="194"
                    image={dat.image}
                    alt="Paella dish"
                  />
                  <Typography color={"primary"} variant="h4" ml={2}>
                    {dat.title}
                  </Typography>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {dat.description}
                    </Typography>
                    <Stack direction={"row"} spacing={2} mb={1} mt={3}>
                      <Typography color={"primary"} variant="h5">
                        Date:
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        {dat.date}
                      </Typography>
                    </Stack>

                    <Stack direction={"row"} spacing={2} mb={1} mt={1}>
                      <Typography color={"primary"} variant="h5">
                        Place:
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        {dat.place}
                      </Typography>
                    </Stack>
                    <Stack direction={"row"} spacing={2} mt={1}>
                      <Typography color={"primary"} variant="h5">
                        Price:
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        ${dat.price}
                      </Typography>
                    </Stack>
                    <Stack
                      spacing={2}
                      direction="row"
                      mt={3}
                      alignItems="center"
                      justifyContent="end"
                    >
                      <Link to={`/update/${dat.id}`} className="link-new">
                        <Button variant="contained" startIcon={<EditIcon />}>
                          Edit
                        </Button>
                      </Link>
                      <Link to={`/view/${dat.id}`} className="link-new">
                        <Button variant="contained" color="secondary" startIcon={<AiFillEye />}>
                          View
                        </Button>
                      </Link>
                      <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        color="error"
                        onClick={() => handleDelete(dat.id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Stack>
    </>
  );
}

export default Home;
