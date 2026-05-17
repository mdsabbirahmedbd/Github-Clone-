const fs = require("fs").promises;
const path = require("path");
const supabase = require("../config/supabase");

const pushRepo = async () => {
  const repoPath = path.resolve(process.cwd(), ".myGit")
  const commitsPath = path.join(repoPath, "commits")
  const configPath = path.join(repoPath, "config.json")

  try {
    const configData = await fs.readFile(configPath, "utf-8")

   const config = JSON.parse(configData)
    if(!config.remote){
      console.log("no remote found");
      return;
    }



    const commits = await fs.readdir(commitsPath)

    for(const commitId of commits){
      const commitDir = path.join(commitsPath,commitId)
      const files = await fs.readdir(commitDir)

      for(const file of files){
        const filePath = path.join(commitDir,file);
        const fileContent = await fs.readFile(filePath);
        const storagePath = `${config.remote}/commits/${commitId}/${file}`
        const { error } = await supabase.storage
          .from("commits")
          .upload(storagePath, fileContent, {
            upsert: true,
          });
         if (error) {
          console.log(error.message);
          continue;
        }
         
         console.log(`uploaded: ${storagePath}`)
      }


    
    }
    console.log("push completed")
  } catch (err) {
    console.log("Push related : ", err.message)
  }
};
module.exports = { pushRepo };











