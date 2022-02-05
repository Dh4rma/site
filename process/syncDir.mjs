import fs from "fs";
import path from "path";
import cwd from "./cwd.mjs";

const getAllFiles = (dir, filePaths = []) => {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      filePaths = getAllFiles(filePath, filePaths);
    } else {
      filePaths.push(filePath);
    }
  });
  return filePaths;
};

const setDir = (pathDir) => {
  try {
    fs.mkdirSync(pathDir, { recursive: true });
  } catch (error) {
    console.error(error.message);
  }
};

const syncDir = (from, to) => {
  from = path.join(cwd, from);
  to = path.join(cwd, to);
  const filePaths = getAllFiles(from, []);
  filePaths &&
    filePaths.forEach((filePath) => {
      const pathBase = path.relative(from, filePath);
      const pathTarget = path.join(to, pathBase);
      const pathDir = path.dirname(pathTarget);
      !fs.existsSync(pathDir) && setDir(pathDir);
      fs.copyFileSync(filePath, pathTarget);
    });
};

export default syncDir;
