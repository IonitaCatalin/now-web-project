const { prepare } = require('@semantic-release/git');

async function nowChangelog(pluginConfig, context) {
  if (context.branch.type !== 'release') {
    pluginConfig.assets = pluginConfig.assets.filter(
      file => file !== 'CHANGELOG.md',
    );
  }

  return prepare(pluginConfig, context);
}

module.exports = { prepare: nowChangelog };
