require('dotenv').config();
module.exports = {
    user: process.env.CONFIG_USER,
    clientId: process.env.CONFIG_ID,
    clientSecret: process.env.CONFIG_SECRET,
    refreshToken: process.env.CONFIG_REFRESH
}
