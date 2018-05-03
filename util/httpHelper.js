exports.makeRequest = function (path, method, type, post_data, get_data) {
  var post_options,
      post_req,
      responseString;

  // 1. An object of options to indicate where to post to
  post_options = {
    host: WS_IP,
    port: WS_PORT,
    path: path,
    method: method,
    rejectUnauthorized: false,      
    headers: {
        'Content-Type': type,
        'Content-Length':Buffer.byteLength(post_data)
    }
  };

  // 2. Set up the request
  post_req = http.request(post_options, function(res) {
    responseString = '';
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        responseString += chunk;
    });
    res.on('end', function() {
      if (res.statusCode != 200) {
        console.log('HTTP status code is: ' + res.statusCode);
        console.log('Data: ' + responseString);
        return false;
      }
      get_data(responseString);
    });
  });

  // 3. Post the data
  post_req.write(post_data);
  post_req.end();
}