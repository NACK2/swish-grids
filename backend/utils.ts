import csv from "csv-parser";
import fs from "fs";

export interface Player {
  NBAID: String;
  Name: String;
}

// input: file name of CSV
// output: array of nba player + id objects
async function convertCSVtoJSON(fileName: fs.PathLike): Promise<Player[]> {
  return new Promise((resolve, reject) => {
    const players: Player[] = [];

    fs.createReadStream(fileName)
      .pipe(csv())
      .on("data", (data) => {
        const { NBAID, NBAName: Name } = data;
        const filteredDataObject: Player = { NBAID, Name };
        players.push(filteredDataObject);
      })
      .on("error", () => {
        reject(new Error("Error parsing CSV"));
      })
      .on("end", () => {
        resolve(players);
      });
  });
}

export { convertCSVtoJSON };
