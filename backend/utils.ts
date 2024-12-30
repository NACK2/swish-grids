import csv from "csv-parser";
import fs from "fs";
import puppeteer from 'puppeteer';

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

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`https://www.nba.com/stats/player/${id}`);
  // await page.waitForSelector('table');

  await page.evaluate(() => { // have to use polling to wait for table b/c tables are loaded in dynamically with javascript
      const checkTableAndData = setInterval(() => {
        const table = document.querySelector('table');
        const td = table ? table.querySelector('td') : null;
        if (td) {
          clearInterval(checkTableAndData);
        }
      }, 500); // Poll every 500ms
  });

  console.log('table and <td> found');

  const tdContent = await page.evaluate(() => {
    console.log('1')
    const table = document.querySelector('table');
    console.log("test", table?.innerHTML)
    const td = table ? table.querySelector('td') : null;
    return td ? td.innerText : null;
  });

  console.log(tdContent)



  return Promise.resolve([]);
}

export { convertCSVtoJSON, getTeams };
