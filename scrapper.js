const fs = require("fs");

const urls = [
  "https://rickandmortyapi.com/api/character",
  "https://rickandmortyapi.com/api/location",
  "https://rickandmortyapi.com/api/episode",
];

async function scrappApi(url) {
  const entities = [];

  do {
    const response = await fetch(url);
    const responseJson = await response.json();

    url = responseJson.info.next;
    const results = responseJson.results;
    entities.push(...results);
  } while (url);

  return entities;
}

async function start() {
  const characters = await scrappApi(urls[0]);
  fs.writeFile(
    "./data/characters.json",
    Buffer.from(JSON.stringify({ characters: characters })),
    (err) => {
      if (err) {
        console.log("Couldn't write");
      }
    },
  );
  const locations = await scrappApi(urls[1]);
  fs.writeFile(
    "./data/locations.json",
    Buffer.from(JSON.stringify({ locations: locations })),
    (err) => {
      if (err) {
        console.log("Couldn't write");
      }
    },
  );
  const episodes = await scrappApi(urls[2]);
  fs.writeFile(
    "./data/episodes.json",
    Buffer.from(JSON.stringify({ episodes: episodes })),
    (err) => {
      if (err) {
        console.log("Couldn't write");
      }
    },
  );

  fs.writeFile(
    "./data/rick-and-morty.json",
    Buffer.from(
      JSON.stringify({
        characters,
        locations,
        episodes,
      }),
    ),
    (err) => {
      if (err) {
        console.log("Couldn't write");
      }
    },
  );
}

start();
