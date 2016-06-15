# Punchcard Commit Messages [![Build Status](https://travis-ci.org/punchcard-cms/punchcard-commit-msg.svg?branch=master)](https://travis-ci.org/punchcard-cms/punchcard-commit-msg) [![Coverage Status](https://coveralls.io/repos/github/punchcard-cms/punchcard-commit-msg/badge.svg?branch=master)](https://coveralls.io/github/punchcard-cms/punchcard-commit-msg?branch=master)
Punchcard Commit Message Validation is a Commit Message git hook meant to validate that one of the [Punchcard Contributing Emoji](https://github.com/punchcard-cms/punchcard/blob/master/CONTRIBUTING.md#emoji-cheatsheet) is used in your commit message.

## Usage

**Install**

```
npm i ghooks punchcard-commit-msg --save-dev
```

**package.json**

```json
"config": {
  "ghooks": {
    "commit-msg": "punchcard-commit-msg"
  }
}
```
