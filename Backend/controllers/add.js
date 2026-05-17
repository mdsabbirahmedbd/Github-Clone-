const fs = require("fs").promises;
const path = require("path");

const addRepo = async (filePath) => {
  try {
    const repoPath = path.resolve(process.cwd(), ".myGit");
    const stagingPath = path.join(repoPath, "staging");
   
    const sourcePath = path.resolve(process.cwd(), filePath);
    const fileName =  path.basename(filePath);
    const destPath = path.join(stagingPath, fileName);
    await fs.copyFile(
      sourcePath,destPath
    )
    console.log(`File ${fileName}added to the staging area `)
  } catch (error) {
    console.log("add file error: ", error);
  }
};

module.exports = { addRepo };

