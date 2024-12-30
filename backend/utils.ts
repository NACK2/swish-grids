import csv from "csv-parser";
import fs from "fs";

export interface Player {
  NBAID: string;
  Name: string;
}

// given a csv file containing NBA player data, return array of objects of each player and their NBA ID
// input: fileName: file name of CSV
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

// given NBA player ID, return what teams they've played for
// input: NBA ID
// output: array of NBA teams played for
async function getTeams(id: string): Promise<string[]> {
  // decided not to use cheerio to webscrape b/c the tables on NBA.com were loaded in dynamically using javascript, so
  // the raw html source code doesn't have the tables, so have to use something like puppeteer to capture dynamic content

  return Promise.resolve([]);
}

export { convertCSVtoJSON, getTeams };
