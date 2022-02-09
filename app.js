const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const databasePath = path.join(__dirname, "cricketTeam.db");

const app = express();

app.use(express.json());

let db = null;

const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () =>
      console.log("Server Running at http://localhost:3000/")
    );
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

//GET CRICKET TEAM

app.get("/players/", async (request, response) => {
  const cricketTeamQuery = `
    SELECT
      *
    FROM
      cricket_team
    ORDER BY
      player_id;`;
  const cricketArray = await db.all(cricketTeamQuery);
  response.send(cricketArray);
});

//ADD single player
app.post("/players/", async (request, response) => {
  const playerDetails = request.body;
  const { playerName, jerseyNumber, role } = playerDetails;
  const addPlayerQuery = `
    INSERT INTO
      cricket_team (playerName,jerseyNumber,role)
    VALUES
      (
        '${playerName}',
         ${jerseyNumber},
         '${role}'
      );`;

  const dbResponse = await db.run(addPlayerQuery);

  response.send("Player Added to Team");
});

//GET single player
app.get("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const getPlayerQuery = `
    SELECT
      *
    FROM
      cricket_team
    WHERE
      player_id = ${playerId};`;
  const player = await db.get(getPlayerQuery);
  response.send(player);
});

//UPDATE single player

app.put("/players/:playerId", async (request, response) => {
  const { playerId } = request.params;
  const playerDetails = request.body;
  const { playerName, jerseyNumber, role } = playerDetails;
  const updatePlayerQuery = `
    UPDATE
      cricket_team
    SET
    playerName = '${Maneesh}',
    jerseyNumber = ${54},
    role = '${All - rounder}'
      
    WHERE
      player_id = ${playerId};`;
  await db.run(pdatePlayerQuery);
  response.send("Player Details Updated");
});

//DELETE a player
app.delete("/players/:playerId//", async (request, response) => {
  const { playerId } = request.params;
  const deletePlayerQuery = `
    DELETE FROM
      cricketTeam
    WHERE
      player_id = ${playerId};`;
  await db.run(deletePlayerQuery);
  response.send("Player Removed");
});
module.exports = app;
