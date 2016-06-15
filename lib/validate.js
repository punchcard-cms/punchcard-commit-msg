'use strict';

const merge = /^Merge /;
const pattern = /^((:(\w+):)*) /;
const types = [
  'new',
  'bug',
  'memo',
  'shirt',
  'art',
  'fire',
  'racehorse',
  'white_check_mark',
  'green_heart',
  'lock',
  'crystal_ball',
  'unamused',
  'boom',
  'shipit',
];


const error = (msg) => {
  return `INVALID COMMIT MESSAGE: ${msg}`;
};

const validate = (raw) => {
  const messageWithBody = (raw || '').split('\n').filter(str => {
    return str.indexOf('#') !== 0;
  }).join('\n');
  const message = messageWithBody.split('\n').shift();
  const match = pattern.exec(message);

  if (merge.test(message)) {
    console.log('Merge commit detected.');

    return true;
  }

  if (message === '') {
    return error('empty commit message');
  }

  if (!match) {
    return error('does not match ":<emoji>: <subject>"');
  }

  const found = match[0];
  const emoji = match[1].split('::');
  const exists = [];
  let duplicates = [];
  let length = 49;
  const msg = message.replace(found, '');

  // Get Invalid Emoji
  const invalid = emoji.map(e => {
    return e.replace(/:/g, '');
  }).filter(e => {
    const index = types.indexOf(e);
    if (index >= 0) {
      if (exists.indexOf(index) === -1) {
        exists.push(index);
      }
      else {
        if (duplicates.indexOf(index) === -1) {
          duplicates.push(index);
        }
      }

      return false;
    }

    return true;
  }).map(e => {
    return `:${e}:`;
  });

  // Get Duplicated Emoji
  duplicates = duplicates.map(dup => {
    return `:${types[dup]}:`;
  });

  // Treat each emoji as 1 character, reducing length
  length = length - exists.length;

  // Error on invalid emoji
  if (invalid.length > 0) {
    return error(`emoji ${invalid.join(', ')} ${invalid.length === 1 ? 'is' : 'are'} not allowed`);
  }

  // Error if there are duplicate emoji
  if (duplicates.length > 0) {
    return error(`emoji ${duplicates.join(', ')} ${duplicates.length === 1 ? 'is' : 'are'} duplicated`);
  }

  // Error if total length is too large
  if (msg.length > length) {
    return error(`commit message is too long (max ${length} char w/included emoji)`);
  }

  return true;
};

module.exports = validate;
