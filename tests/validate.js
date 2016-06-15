import test from 'ava';
import validate from '../lib/validate';


test('Valid Input', t => {
  const msg = ':new: Awesome New Feature';
  const msg2 = ':new::lock: Awesome New Security Feature';

  t.true(validate(msg), 'Valid commit message with single emoji');
  t.true(validate(msg2), 'Valid commit message with multiple emoji');
});

test('Valid Input - Merge Commit', t => {
  const msg = 'Merge pull request #1';

  t.true(validate(msg), 'Valid merge commit');
});

test('Invalid Input - Empty Commit Message', t => {
  const msg = '';

  t.is(validate(msg), 'INVALID COMMIT MESSAGE: empty commit message', 'Invalid empty commit message');
});

test('Invalid Input - Invalid Pattern', t => {
  const msg = 'My Awesome Commit';
  const msg2 = ':: My Awesome Commit';
  const msg3 = ':new:My Awesome Commit Message';

  t.is(validate(msg), 'INVALID COMMIT MESSAGE: does not match ":<emoji>: <subject>"', 'Invalid commit message pattern');
  t.is(validate(msg2), 'INVALID COMMIT MESSAGE: does not match ":<emoji>: <subject>"', 'Invalid emoji used');
  t.is(validate(msg3), 'INVALID COMMIT MESSAGE: does not match ":<emoji>: <subject>"', 'No space after emoji');
});

test('Invalid Input - Unsupported Emoji', t => {
  const msg1 = ':foo: My Awesome Commit';
  const msg2 = ':foo::bar: My Awesome Commit';
  const msg3 = ':new::foo: My Awesome Commit';
  const msg4 = ':foo::new::bar: My Awesome Commit';


  t.is(validate(msg1), 'INVALID COMMIT MESSAGE: emoji :foo: is not allowed', 'Single unsupported emoji');
  t.is(validate(msg2), 'INVALID COMMIT MESSAGE: emoji :foo:, :bar: are not allowed', 'Multiple unsupported emoji');
  t.is(validate(msg3), 'INVALID COMMIT MESSAGE: emoji :foo: is not allowed', 'Single unsupported emoji w/valid emoji');
  t.is(validate(msg4), 'INVALID COMMIT MESSAGE: emoji :foo:, :bar: are not allowed', 'Multiple unsupported emoji w/valid emoji');
});


test('Invalid Input - Duplicate Emoji', t => {
  const msg1 = ':new::new: My Awesome Commit';
  const msg2 = ':new::new::bug::bug: My Awesome Commit';
  const msg3 = ':new::bug::boom::bug::new: My Awesome Commit';
  const msg4 = ':new::new::new: My Awesome Commit';


  t.is(validate(msg1), 'INVALID COMMIT MESSAGE: emoji :new: is duplicated', 'Single unsupported emoji');
  t.is(validate(msg2), 'INVALID COMMIT MESSAGE: emoji :new:, :bug: are duplicated', 'Multiple unsupported emoji');
  t.is(validate(msg3), 'INVALID COMMIT MESSAGE: emoji :bug:, :new: are duplicated', 'Single unsupported emoji w/valid emoji');
  t.is(validate(msg4), 'INVALID COMMIT MESSAGE: emoji :new: is duplicated', 'Multiple unsupported emoji w/valid emoji');
});

test('Invalid Input - Long Message', t => {
  const msg = ':new: This is a really long commit message and it should probably be shorter';
  const msg2 = ':new::lock::racehorse: This is a really long commit message and it should probably be shorter';

  t.is(validate(msg), 'INVALID COMMIT MESSAGE: commit message is too long (max 48 char w/included emoji)', 'Single unsupported emoji');
  t.is(validate(msg2), 'INVALID COMMIT MESSAGE: commit message is too long (max 46 char w/included emoji)', 'Single unsupported emoji');
});
