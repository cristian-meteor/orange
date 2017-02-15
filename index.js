var request = require("request");
var request = request.defaults({jar: true});
var j = request.jar();
var url = "https://eureka.orange.es/EUREKA3/";


function postRequest(cookie) {
     var params = {username: "DIokclub", "tmp-username": "DIokclub", password: "navidad-2016", request_id: 123456789, displayLangSelection: false},
         kookie = cookie.map(function(k){ return k.split(";")[0]; });

      request.post({url: "https://applogin.orange.es/oam/server/auth_cred_submit",
                   form: params,
                   headers: {Cookie: kookie.join("; ")},
                   maxRedirects: 25},
      function(err, response, body) {
            var cookie   = response.headers['set-cookie'],
                location = response.headers['location'],
                kookie   = cookie.map(function(k){ return k.split(";")[0]; });

                request.get({url: location,
                            headers: {Cookie: kookie.join("; ")},
                            },function(err, response, body) {
                              var cookie   = response.headers['set-cookie'],
                                  location = response.headers['location'];

                                  console.log(response.req._headers.cookie);
                                  //console.log(cookie);
                            });
      });
}

request({url: url,
        headers: {"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                  "Host": "eureka.orange.es",
                  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
        }
}, function(error, response){
          var cookie = response.headers['set-cookie'];
          postRequest(cookie);
});
