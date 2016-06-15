import test from 'ava';
import util from '../lib/util';

test('Get Git Folder', t => {
  const folder = util.getGitFolder('../.git');

  t.is(folder, '../.git', 'Git folder exists');
});

test('Get Commit Message', t => {
  const msg = ':new: Hello World';
  const message = new Buffer(msg);

  t.is(util.getCommitMessage(message), msg, 'Commit Message is parsed from buffer');
});

