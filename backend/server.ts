import express from "express";
import { Player, convertCSVtoJSON } from "./utils";

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

app.get("/players", async (_, res) => {
  let players: Player[] = [];

  try {
    players = await convertCSVtoJSON("NBA_Player_IDs.csv");
  } catch (err: unknown) {
    console.error("Error: ", err.message);
  }

  res.status(200).json(players);
});
