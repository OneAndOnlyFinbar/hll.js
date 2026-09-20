# hll.js

A comprehensive Node.js RCON client for HLL and HLL Vietnam.

### Installation

```
yarn add @finbar/hll.js
npm i @finbar/hll.js
```

### Features

- 100% RCON API Coverage
- Connection pooling
- Managed log parsing and polling

### Getting Started

```js
const { WW2Client } = require("@finbar/hll.js");

const client = new WW2Client({
  host: "123.123.123.123",
  port: 7799,
  password: "PASSWORD"
});

client.on("ready", async () => {
  const session = await client.session.fetch();

  console.log(session);
  // #  {
  // #    serverName: 'RCON Testing',
  // #    mapName: 'ST MARIE DU MONT',
  // #    mapId: 'stmariedumont_warfare',
  // #    gameMode: 'Warfare',
  // #    remainingMatchTime: 0,
  // #    matchTime: 10200,
  // #    alliedFaction: 1,
  // #    axisFaction: 0,
  // #    alliedScore: 2,
  // #    axisScore: 2,
  // #    playerCount: 0,
  // #    alliedPlayerCount: 0,
  // #    axisPlayerCount: 0,
  // #    maxPlayerCount: 100,
  // #    queueCount: 0,
  // #    maxQueueCount: 6,
  // #    vipQueueCount: 2,
  // #    maxVipQueueCount: 0
  // #  }
});

(async () => {
  await client.init();
})();
```

### Examples

```js
//##############################################################
//#############  Sending a message to all players  #############
//##############################################################

const players = await client.players.fetchAllPlayers();

players.forEach((p) => {
  p.message(`Hello ${p.name}!`);
});


//##############################################################
//#################  Basic WKM Implementation  #################
//##############################################################

const killsCache = {};

client.on("playerKilled", ({ victimId, killerId, killerName }) => {
  killsCache[victimId] = [killerName, killerId];
});

client.on("teamChat", async ({ message, playerId }) => {
  if (message.toLowerCase() !== "!wkm") return;

  const killerData = killsCache[playerId];

  if (killerData) {
    await client.players.message(playerId, `You were last killed by ${killerData[0]} (ID: ${killerData[1]})`);
  } else {
    await client.players.message(playerId, "No kill data available.");
  }
});

// Optimally you would also listen to playerTeamkilled and unitChat to store teamkills and also allow !wkm to be sent in unit chat.

```

### Error Handling

For many reasons, especially with frequent polling, requests may be dropped by the server. It is suggested to wrap all
requests with the `safeRcon` function exported by this library, which softly handles any errors and returns a default
value.

```js
const { safeRcon } = require("@finbar/hll.js");

// Safely catch any errors from client.logs.fetch, if an error is encountered it will return an empty array.
const logs = await safeRcon(client.logs.fetch(3600), []);
if (logs.length <= 0) return; // Return if no logs were found
```