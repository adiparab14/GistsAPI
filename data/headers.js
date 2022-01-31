const env = require('../env');
const headers = {
    authHeaders: { 'User-Agent': 'GistsAPI', 'Authorization': `Bearer ${env.token}`, 'Content-Type': 'application/vnd.github.v3+json' },
    unAuthHeaders: { 'User-Agent': 'GistsAPI', 'Content-Type': 'application/vnd.github.v3+json' }
}


module.exports = headers