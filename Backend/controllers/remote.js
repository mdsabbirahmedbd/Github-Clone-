const fs = require("fs").promises;
const path = require("path");

const addRemote = async (remotePath) => {
  const repoPath = path.resolve(process.cwd(), ".myGit");
  const configPath = path.join(repoPath, "config.json");

  try {
    const configData = await fs.readFile(configPath, "utf-8");
    const config = JSON.parse(configData);

    config.remote = remotePath;

    await fs.writeFile(
      configPath,
      JSON.stringify(config, null, 2)
    );

    console.log(`remote added: ${remotePath}`);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { addRemote };