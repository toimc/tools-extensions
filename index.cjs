const fflate = require('fflate');
const fs = require('fs-extra');
const fetch = require('node-fetch');

const os = require('os');
const path = require('path');

const homeDir = os.homedir();
const targetPath = path.join(homeDir, '.electron-tools/extensions');

async function extraZip(filePath) {
  // fs.ensureDir(targetPath);
  try {
    const zipFileName = path.basename(filePath, path.extname(filePath));
    await fs.ensureDir(`${targetPath}/${zipFileName}`);

    const regex = /^(?:[a-zA-Z]:)?[\\/]|^\.\.?[/\\]/;
    let zipData;
    if (regex.test(filePath)) {
      zipData = await fs.readFileSync(filePath);
    } else {
      zipData = await downloadRemoteZip(filePath);
    }
    const filesData = fflate.unzipSync(zipData);

    for (const fileName in filesData) {
      const filePathTemp = `${targetPath}/${zipFileName}/${fileName}`;
      await fs.outputFile(filePathTemp, filesData[fileName]);
    }
    console.log('解压完成');
  } catch (error) {
    console.log('解压失败', error);
  }
}

// extraZip('./extensions1.zip', './temp');
async function downloadRemoteZip(remoteZipUrl) {
  try {
    const res = await fetch(remoteZipUrl);
    if (!res.ok) {
      throw new Error('下载 zip 文件出错' + res.statusText);
    }
    return await res.buffer();
  } catch (error) {
    throw error;
  }
}

extraZip('https://github.com/toimc/tools-extensions/raw/main/extensions1.zip');
