import React from "react";
import { useEffect } from "react";
import { useState } from "react";

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
    <div>
      <pre>{JSON.stringify(planets, null, 2)}</pre>
    </div>
  );
};

export default Home;
