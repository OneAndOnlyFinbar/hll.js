// Not all methods can be tested as they require active players or disrupt the server.
// Untested methods: setMap, setSectorLayout, broadcast

const { WW2Client } = require("../../../../src/index.js");
require("dotenv").config({ quiet: true });

describe("SessionManager", () => {
  let client;

  beforeAll(async () => {
    client = new WW2Client({
      host: process.env.HLL_RCON_HOST,
      port: process.env.HLL_RCON_PORT,
      password: process.env.HLL_RCON_PASSWORD
    });

    await client.init();
  });

  afterAll(() => {
    client.disconnect();
  });

  describe("fetch", () => {
    it("should fetch a Session object representing the live game state.", async () => {
      const response = await client.session.fetch();

      // Ensure the payload parsed correctly into standard camelCase properties
      expect(response).toHaveProperty("serverName");
      expect(response).toHaveProperty("mapName");
      expect(typeof response.playerCount).toBe("number");
    });
  });
});