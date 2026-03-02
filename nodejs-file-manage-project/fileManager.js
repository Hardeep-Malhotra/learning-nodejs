
import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";
import chalk from "chalk";

import {
  createFolder,
  createFile,
  appendToFile,
  readFileContent,
  getFileInfo,
  deleteFile,
  deleteFolder,
  listItem,
} from "./file.js";

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
});

async function menu() {
  console.clear(); // Screen saaf karein
  console.log(chalk.blue.bold("\n🗃️  File System Manager CLI\n"));

  while (true) {
    const options = [
      "Create Folder",
      "Create File",
      "Write to File",
      "Read File",
      "File Information",
      "Delete File",
      "Delete Folder",
      "List Items",
      "Exit",
    ];

    options.forEach((ops, i) => {
      console.log(chalk.yellow(`${i + 1}.`) + chalk.white(` ${ops}`));
    });

    const answer = await rl.question(chalk.cyan("\nSelect option: "));
    console.log(chalk.gray("------------------------------"));

    switch (answer) {
      case "1": {
        try {
          const folderPath = await rl.question("Enter FolderPath: ");
          const message = await createFolder(folderPath);
          console.log(chalk.green(message));
        } catch (err) {
          console.log(chalk.red(err.message));
        }
        break;
      }
      case "2": {
        try {
          const filePath = await rl.question("Enter FilePath: ");
          const fileContent = await rl.question("Enter FileContent: ");
          const message = await createFile(filePath, fileContent);
          console.log(chalk.green(message));
        } catch (err) {
          console.log(chalk.red(err.message));
        }
        break;
      }
      case "3": {
        try {
          const filePath = await rl.question("Enter FilePath to add content: ");
          const fileContent = await rl.question("Enter File Content: ");
          const message = await appendToFile(filePath, fileContent);
          console.log(chalk.green(message));
        } catch (err) {
          console.log(chalk.red(err.message));
        }
        break;
      }
      case "4": {
        try {
          const filePath = await rl.question("Enter FilePath: ");
          const content = await readFileContent(filePath);
          console.log(chalk.green("📖 File Content:\n") + chalk.gray(content));
        } catch (err) {
          console.log(chalk.red(err.message));
        }
        break;
      }
      case "5": {
        try {
          const filePath = await rl.question("Enter FilePath: ");
          const info = await getFileInfo(filePath);
          console.log(info);
        } catch (err) {
          console.log(chalk.red(err.message));
        }
        break;
      }
      case "6": {
        try {
          const filePath = await rl.question("Enter FilePath: ");
          const message = await deleteFile(filePath);
          console.log(chalk.green(message));
        } catch (err) {
          console.log(chalk.red(err.message));
        }
        break;
      }
      case "7": {
        try {
          console.log(chalk.red("⚠️  If you delete this folder, you will lose all data inside the folder!"));
          const folderPath = await rl.question("Enter FolderPath: ");
          const message = await deleteFolder(folderPath);
          console.log(chalk.green(message));
        } catch (err) {
          console.log(chalk.red(err.message));
        }
        break;
      }
      case "8": {
        try {
          const folderPath = await rl.question("Enter FolderPath to list: ");
          const items = await listItem(folderPath);
          console.log(items);
        } catch (err) {
          console.log(chalk.red(err.message));
        }
        break;
      }
      case "9": {
        console.log(chalk.yellow("🚪 Exiting..."));
        rl.close();
        process.exit(0);
      }
      default:
        console.log(chalk.red("❌ Invalid option."));
        break;
    }
    console.log(chalk.gray("------------------------------"));
  }
}

menu();