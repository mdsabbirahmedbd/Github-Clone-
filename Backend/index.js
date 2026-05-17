#!/usr/bin/env node
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const { initRepo } = require("./controllers/init");
const { addRepo } = require("./controllers/add");
const { commitRepo } = require("./controllers/commit");
const { pushRepo } = require("./controllers/push");
const {addRemote} = require("./controllers/remote");
 
yargs(hideBin(process.argv))
  .command("init", "initialize a new repozetory", {}, initRepo)
  .command(
    "add <file>",
    "add a file to your repozetory",
    (yargs) => {
      yargs.positional("file", {
        describe: "file to add to the staging area",
        type: "string",
      });
    },
    (argv) => {
      addRepo(argv.file);
    },
  )
  .command("commit <message>","commit the staged field",
    (yargs) => {yargs.positional("message", {description: "commit message",type: "string"})},
    (argv) => {
      commitRepo(argv.message);
    },
  )
  .command("remote <path>","add remote repository",
    (yargs) => {yargs.positional("paht",{type : "string"})},
    (argv) => addRemote(argv.path)
  )
  .command("push", "push to the remote repozetory", {}, pushRepo)
  .demandCommand(1, "Please provide a command")
  .help().argv;
