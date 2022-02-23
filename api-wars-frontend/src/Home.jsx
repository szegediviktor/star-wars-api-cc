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
import { Typography } from "@mui/material";

const Home = () => {
    const [planets, setPlanets] = useState([]);

    useEffect(() => {
        fetch("https://swapi.dev/api/planets")
            .then((res) => res.json())
            .then((data) => {
                setPlanets(data);
            });
    }, []);

    //formátum átalakítás
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <TableContainer component={Paper}>
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
                                    : `${planet.surface_water} %`}
                            </TableCell>
                            <TableCell>
                                {planet.population === "unknown"
                                    ? planet.population
                                    : `${numberWithCommas(
                                          planet.population
                                      )} people`}
                            </TableCell>
                            <TableCell>
                                {planet.residents.length > 0 ? (
                                    <Button
                                        variant="contained"
                                        color="secondary"
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
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Home;
