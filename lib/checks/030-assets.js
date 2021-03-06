var _       = require('lodash'),
    checkAssets;

checkAssets = function checkAssets(theme) {
    var ruleCode = 'GS030-ASSET-REQ',
        failures = [],
        defaultHbs = _.where(theme.files, {file: 'default.hbs'}),
        assetRegex = /(src|href)=['"](.*?\/assets\/.*?)['"]/gmi,
        assetMatch;

    if (!_.isEmpty(defaultHbs)) {
        defaultHbs = defaultHbs[0];
        while ((assetMatch = assetRegex.exec(defaultHbs.content)) !== null) {
            failures.push({ref: assetMatch[2]});
        }
    }

    if (failures.length > 0) {
        theme.results.fail[ruleCode] = {failures: failures};
    } else {
        theme.results.pass.push(ruleCode);
    }

    return theme;
};

module.exports = checkAssets;
