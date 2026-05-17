const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

const commitRepo = async (message) => {
  const repoPath = path.resolve(process.cwd(), ".myGit");
  const stagingPath = path.join(repoPath, "staging");
  const commitsPath = path.join(repoPath, "commits");

  try {
    // check if staging area is empty
    const files = await fs.readdir(stagingPath);


    if (files.length === 0) {
      console.log("nothing to commit ");
      return;
    }

    const commitId = uuidv4();
    const commitDir = path.join(commitsPath, commitId)
    await fs.mkdir(commitDir);

    for (const file of files){
      await fs.copyFile(
        path.join(stagingPath, file),
        path.join(commitDir, file)
      )
    }

    await fs.writeFile(
      path.join(commitDir, "commit.json"),
      JSON.stringify({ message ,date : new Date().toISOString()}),
    )

    console.log(`commit created:${commitId} with message : ${message}`);
  } catch (error) {
    console.log("commit error here:", error);
  }
};
module.exports = { commitRepo };


