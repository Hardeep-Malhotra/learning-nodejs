import {
  mkdir,
  writeFile,
  appendFile,
  readFile,
  stat,
  unlink,
  rm,
  readdir,
} from "node:fs/promises";
import fs from "node:fs"; // Sync methods ke liye zaroori
import path from "node:path";
import chalk from "chalk";

// ==============================================
// 🔹 1. Create Folder
// ==============================================
export async function createFolder(folderName) {
  try {
    await mkdir(folderName, { recursive: true });
    return `📁 Folder ${chalk.bold(folderName)} created successfully`;
  } catch (err) {
    throw new Error(`❌ Error creating folder: ${err.message}`);
  }
}

// ==============================================
// 🔹 2. Create File
// ==============================================
export async function createFile(pathname, content) {
  try {
    await writeFile(pathname, content);
    return `📄 File ${chalk.bold(pathname)} created successfully`;
  } catch (err) {
    throw new Error(`❌ Error creating file: ${err.message}`);
  }
}

// ==============================================
// 🔹 3. Append Content To File
// ==============================================
export async function appendToFile(pathname, content) {
  try {
    await appendFile(pathname, content);
    return `📝 Content appended to ${chalk.bold(pathname)}`;
  } catch (err) {
    throw new Error(`❌ Error appending file: ${err.message}`);
  }
}

// ==============================================
// 🔹 4. Read File
// ==============================================
export async function readFileContent(pathname) {
  try {
    const data = await readFile(pathname, "utf-8");
    return data;
  } catch (err) {
    throw new Error(`❌ Error reading file: ${err.message}`);
  }
}

// ==============================================
// 🔹 5. Get File Information (Updated)
// ==============================================
export async function getFileInfo(pathname) {
  try {
    const info = await stat(pathname);
    const type = info.isDirectory() ? "📁 Folder" : "📄 File";

    let result = `${chalk.bold("📊 File Info:")}\n`;
    result += `Type: ${type}\n`;
    result += `Size: ${chalk.yellow(info.size + " bytes")}\n`;
    result += `Created: ${chalk.gray(info.birthtime.toLocaleString())}\n`;
    result += `Modified: ${chalk.gray(info.mtime.toLocaleString())}`;

    return result;
  } catch (err) {
    throw new Error(`❌ Error getting file info: ${err.message}`);
  }
}

// ==============================================
// 🔹 6. Delete File
// ==============================================
export async function deleteFile(pathname) {
  try {
    await unlink(pathname);
    return `🗑 File ${chalk.bold(pathname)} deleted successfully`;
  } catch (err) {
    throw new Error(`❌ Error deleting file: ${err.message}`);
  }
}

// ==============================================
// 🔹 7. Delete Folder (Updated)
// ==============================================
export async function deleteFolder(pathname) {
  try {
    await rm(pathname, { recursive: true, force: true });
    return `🗑 Folder ${chalk.bold(pathname)} deleted successfully`;
  } catch (err) {
    throw new Error(`❌ Error deleting Folder: ${err.message}`);
  }
}

// ==============================================
// 🔹 8. List Items (Updated with Icons & Counts)
// ==============================================
export async function listItem(folderPath) {
  try {
    const items = await readdir(folderPath);
    if (items.length === 0) {
      return chalk.gray("📂 Folder is empty.");
    }

    let fileCount = 0;
    let folderCount = 0;
    let result = `${chalk.bold("📂 Items in " + folderPath + ":")}\n`;

    for (const item of items) {
      const fullPath = path.join(folderPath, item);
      const info = await stat(fullPath);

      if (info.isDirectory()) {
        result += `  ${chalk.blue("📁")} ${chalk.blue(item)}\n`;
        folderCount++;
      } else {
        result += `  ${chalk.green("📄")} ${chalk.white(item)}\n`;
        fileCount++;
      }
    }

    result += `\n${chalk.bold("Summary:")} ${chalk.green(fileCount + " Files")}, ${chalk.blue(folderCount + " Folders")}`;
    return result;
  } catch (err) {
    throw new Error(`❌ Error listing items: ${err.message}`);
  }
}
