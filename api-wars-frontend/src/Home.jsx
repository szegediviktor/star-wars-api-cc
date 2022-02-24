import React from "react";
import { useEffect } from "react";
import { useState } from "react";

// MUI imports
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { ButtonGroup, Grid, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@material-ui/core/DialogTitle";

const Home = (props) => {
  const [planets, setPlanets] = useState([]);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [resident, setResident] = useState({});

  const handleOpen = () => {
    setOpen(true);
    planets.results?.residents?.map((resi) =>
      fetch(resi)
        .then((res) => res.json())
        .then((data) => {
          setResident(data);
          console.log(resident);
        })
    );
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetch(`https://swapi.dev/api/planets/?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setPlanets(data);
      });
  }, []);

  // useEffect(() => {
  //   planets.results?.residents?.map((resi) =>
  //     fetch(resi)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setResident(data);
  //         console.log(resident);
  //       })
  //   );
  // }, [resident]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    color: props.theme.palette.primary,
    border: "2px solid #000",
    boxShadow: 10,
    p: 4,
  };

  //formátum átalakítás
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const fetchNext = () => {
    fetch(planets.next)
      .then((response) => response.json())
      .then((data) => {
        setPlanets(data);
        setPage(page + 1);
      });
  };

  const fetchPrev = () => {
    fetch(planets.previous)
      .then((response) => response.json())
      .then((data) => {
        setPlanets(data);
        setPage(page - 1);
      });
  };

  return (
    <div>
      <Typography variant="h3" sx={{ ml: 4 }}>
        {" "}
        Star Wars Universe Planets
      </Typography>
      <ButtonGroup
        variant="text"
        aria-label="text button group"
        color="secondary"
        sx={{ mt: 3, mb: 3 }}
      >
        <Button sx={{ pr: 4, pl: 4 }} onClick={fetchPrev} disabled={page === 1}>
          Prev
        </Button>
        <Button onClick={fetchNext} sx={{ pr: 4, pl: 4 }}>
          Next
        </Button>
      </ButtonGroup>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <TableContainer
          component={Paper}
          className="container"
          sx={{ mx: "auto", maxWidth: 1000, p: 1, m: 1 }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Diameter</TableCell>
                <TableCell>Climate</TableCell>
                <TableCell>Terrain</TableCell>
                <TableCell>Surface Water Percentage</TableCell>
                <TableCell>Population</TableCell>
                <TableCell>Residents</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {planets.results?.map((planet) => (
                <TableRow
                  key={planet.name}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {planet.name}
                  </TableCell>
                  <TableCell>{`${numberWithCommas(
                    planet.diameter
                  )} km`}</TableCell>
                  <TableCell>{planet.climate}</TableCell>
                  <TableCell>{planet.terrain}</TableCell>
                  <TableCell>
                    {planet.surface_water === "unknown"
                      ? planet.surface_water
                      : `${planet.surface_water}%`}
                  </TableCell>
                  <TableCell>
                    {planet.population === "unknown"
                      ? planet.population
                      : `${numberWithCommas(planet.population)} people`}
                  </TableCell>
                  <TableCell>
                    {planet.residents.length > 0 ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleOpen}
                      >
                        <Typography
                          variant="caption"
                          component="div"
                          color="primary"
                          sx={{ flexGrow: 1 }}
                        >
                          {planet.residents.length === 1
                            ? `${planet.residents.length} resident`
                            : `${planet.residents.length} residents`}
                        </Typography>
                      </Button>
                    ) : (
                      "No known residents"
                    )}
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                      BackdropProps={{
                        style: { backgroundColor: "rgba(0,0,0,0.05)" },
                      }}
                    >
                      <Box sx={style}>
                        <Typography
                          id="modal-modal-description"
                          sx={{ mt: 2 }}
                        ></Typography>
                        <TableContainer>
                          <Table>
                            <TableBody>
                              <TableRow>
                                <TableCell>{resident.name}</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
                    </Modal>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </div>
  );
};

export default Home;
