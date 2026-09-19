const VietnamClient = require("./games/vietnam/VietnamClient");
const WW2Client = require("./games/ww2/WW2Client");

const safeRcon = require("./core/utils/safeRcon");
const parseLogString = require("./core/utils/parseLogString");
const xor = require("./core/utils/xor");

module.exports = {
  WW2Client,
  VietnamClient,

  safeRcon,
  parseLogString,
  xor
};