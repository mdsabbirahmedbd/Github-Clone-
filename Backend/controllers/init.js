const fs = require("fs").promises;
const path = require("path");
const initRepo = async () => {
  const repoPath = path.resolve(process.cwd(), ".myGit");
  try {
    await fs.mkdir(repoPath, { recursive: true });
    await fs.mkdir(path.join(repoPath, "commits"), { recursive: true });
    await fs.mkdir(path.join(repoPath, "staging"), { recursive: true });

    await fs.writeFile(
      path.join(repoPath, "config.json"),
      JSON.stringify({remote : null},null,2),
    );
    console.log("Repository initialized");
  } catch (error) {
    console.log("initial err : ", error.message);
  }
};

module.exports = { initRepo };

