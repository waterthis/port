require("dotenv").config({ path: "../.env" });
const { Telegraf } = require("telegraf");
const { production } =  require("./core/production.js");

const bot = new Telegraf(process.env.BOT_TOKEN);

// start command
const start_command = require("./commands/start.js");
start_command(bot);

// help command
const help_command = require("./commands/help.js");
help_command(bot);


// prod mode (Vercel)
export const startVercel = async (req, res) => {
  await production(req, res, bot);
};

// async function start_bot() {
//   try {
//     console.log("Starting bot. . .");
//     await bot.launch();
//   } catch (err) {
//     console.log("An Error Ocurred: Restarting Bot");
//     console.log(err);
//   }
// }

/**********************************
  start bot is for local testing 
*********************************/
// start_bot();
