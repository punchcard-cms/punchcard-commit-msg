'use strict';

const fs = require('fs');

/*
 * hasToString method
 */
const hasToString = x => {
  return x && typeof x.toString === 'function';
};

/*
 * Get Commit Message from Buffer
 */
const getCommitMessage = buffer => {
  return hasToString(buffer) && buffer.toString();
};

/*
 * Get Git Folder
 */
const getGitFolder = (location) => {
  let gitDirLocation = location || './.git';

  if (!fs.existsSync(gitDirLocation)) {
    throw new Error(`Cannot find file ${gitDirLocation}`);
  }

  if (!fs.lstatSync(gitDirLocation).isDirectory()) {
    const unparsedText = fs.readFileSync(gitDirLocation).toString();

    gitDirLocation = unparsedText.substring('gitdir: '.length).trim();
  }

  if (!fs.existsSync(gitDirLocation)) {
    throw new Error(`Cannot find file ${gitDirLocation}`);
  }

  return gitDirLocation;
};

module.exports = {
  getCommitMessage,
  getGitFolder,
  hasToString,
};
