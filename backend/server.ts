import express, { Response } from "express";
import { Player, convertCSVtoJSON, getTeams } from "./utils";

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

app.get("/players", async (_, res: Response) => {
  try {
    const players: Player[] = await convertCSVtoJSON("NBA_Player_IDs.csv");
    res.status(200).json(players);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    }
  }
});

app.get("/teams", async (_, res: Response) => {
  try {
    const teams: string[] = await getTeams("2544"); // Todo: remove this hardcoded id later
    // const teams: string[] = await getTeams(req.params.id);
    res.status(200).json(teams);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    }
  }
});
