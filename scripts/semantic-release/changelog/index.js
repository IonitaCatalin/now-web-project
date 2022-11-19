/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const { prepare } = require('@semantic-release/changelog');

async function nowProjectChangelog(pluginConfig, context) {
  if (context.branch.type !== 'release') {
    return;
  }

  return prepare(pluginConfig, context);
}

module.exports = { prepare: nowProjectChangelog };
