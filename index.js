#!/usr/bin/env node

'use strict';

const fs = require('fs');
const validate = require('./lib/validate');
const util = require('./lib/util');

/*
 * Grab Commit Message File and Logs
 */
const commitMsgFile = process.argv[2] || `${util.getGitFolder()}/COMMIT_EDITMSG`;
const incorrectLogFile = commitMsgFile.replace('COMMIT_EDITMSG', 'logs/incorrect-commit-msgs');

/*
 * Read Commit Message and Validate
 */
fs.readFile(commitMsgFile, (err, buffer) => {
  if (err) {
    throw err;
  }

  const msg = util.getCommitMessage(buffer);
  const validation = validate(msg);

  if (validation !== true) {
    fs.appendFile(incorrectLogFile, `${msg}\n`, () => {
      console.error(validation);

      // Need to exit in executable
      process.exit(1); // eslint-disable-line no-process-exit
    });
  }
  else {
    // Need to exit in executable
    process.exit(0); // eslint-disable-line no-process-exit
  }
});
