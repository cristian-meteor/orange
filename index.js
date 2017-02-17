var request     = require("request"),
    request     = request.defaults({jar: true}),
    initial_url = "https://eureka.orange.es/EUREKA3/";

function postRequest(cookie, callback, query) {
     var params = {username:            query.username, //"DIokclub",
                  "tmp-username":       query.username, //"DIokclub",
                  password:             query.password, //"navidad-2016",
                  request_id:           Date.now(),
                  displayLangSelection: false},
         kookie = cookie.map(function(k){ return k.split(";")[0]; });

      request.post({url:         "https://applogin.orange.es/oam/server/auth_cred_submit",
                   form:         params,
                   headers:      {Cookie: kookie.join("; ")},
                   maxRedirects: 25},
                   function(err, response, body) {
                        var cookie   = response.headers['set-cookie'],
                            location = response.headers.location,
                            kookie   = cookie.map(function(k){ return k.split(";")[0]; });

                            request.get({url: location,
                                        headers: {Cookie: kookie.join("; ")},
                                        },function(err, response, body) {
                                          var cookie        = response.headers['set-cookie'],
                                              eureka_cookie = response.req._headers.cookie,
                                              access        = eureka_cookie.split(";")[2].trim() + ";" + eureka_cookie.split(";")[3].trim();

                                              callback(null, {
                                                  statusCode: '200',
                                                  body: JSON.stringify({access: access}),
                                                  headers: {
                                                      'Content-Type': 'application/json',
                                                  },
                                              });
                                        });
                   });
}

exports.handler = function(event, context, callback) {
    var queryString = event.queryStringParameters || {};
    request({url: initial_url,
            headers: {"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                      "Host": "eureka.orange.es",
                      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
            }
    }, function(error, response){
          postRequest(response.headers['set-cookie'], callback, queryString);
    });
};
