const apikey=require('./../../config/config').apiKey
exports.requestOption = (sign, body) => {
    return {
        uri: `http://localhost:8080/auth/${sign}`,
        method: 'POST',
        body: body,
        json: true,
        headers: {
            Authorization: apikey
        }
    }
}
