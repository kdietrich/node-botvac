var axios = require('axios');
var https = require('https');

function request(url, payload, method, headers, callback) {
    if (!url || url === '') {
        if (typeof callback === 'function') callback('no url specified');
        return;
    }

    var options = {
        method: method === 'GET' ? 'GET' : 'POST',
        url: url,
        headers: {
            'Accept': 'application/vnd.neato.nucleo.v1'
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        })
    };

    if (options.method === 'POST') {
        options.data = payload;
    }

    if (typeof headers === 'object') {
        for (var header in headers) {
            if (headers.hasOwnProperty(header)) {
                options.headers[header] = headers[header];
            }
        }
    }

    axios(options)
    .then(function (response) {
        if (typeof callback === 'function') callback(undefined, response.data);
    })
    .catch(function (error) {
        if (typeof callback === 'function') callback(error, undefined);
    })
}

exports.request = request;