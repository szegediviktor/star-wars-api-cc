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

const Home = () => {
    const [planets, setPlanets] = useState([]);

    useEffect(() => {
        fetch("https://swapi.dev/api/planets")
            .then((res) => res.json())
            .then((data) => {
                setPlanets(data);
            });
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Diameter</TableCell>
                        <TableCell>Climate</TableCell>
                        <TableCell>Terrain</TableCell>
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
                            <TableCell>{planet.diameter}</TableCell>
                            <TableCell>{planet.climate}</TableCell>
                            <TableCell>{planet.terrain}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Home;
