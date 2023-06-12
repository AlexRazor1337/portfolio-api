const cron = require('node-cron');

const clearInvalidatedTokens = require('./clear-invalidated-tokens');

module.exports = () => {
    cron.schedule('0 0 0 * * *', clearInvalidatedTokens); // run every day at midnight
};
