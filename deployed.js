const fs = require("fs");
const path = require("path");
const { REST, Routes } = require("discord.js");

const commands = [];
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
const foldersPath = "./src/commands";
const commandFolders = fs.readdirSync(foldersPath);

const running = async () => {
  console.log(commands, "commands");
  const rest = new REST().setToken(
    process.env["DISCORD_TOKEN"]
  );
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationGuildCommands(
        process.env["CLIENT_ID"],
        process.env["GUILD_ID"]
      ),
      { body: commands }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
};

const init = async () => {
  for (const folder of commandFolders) {
    // Grab all the command files from the commands directory you created earlier
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".js"));
    console.log("command files", commandFiles);
    // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      import("./" + filePath).then((module) => {
        // console.log("first");
        const modules = module.default;
        if ("data" in modules && "execute" in modules) {
          commands.push(modules.data.toJSON());
        } else {
          console.log(
            `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
          );
        }
      });
    }
  }
  await running();
};

init();
