require 'rest_client'
require 'pry'
require 'logger'

logger = Logger.new(STDOUT)
RestClient.log = logger

eureka = RestClient.get("https://eureka.orange.es/EUREKA3/", accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                                                              host: "eureka.orange.es",
                                                              "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36")
binding.pry
login = RestClient::Request.execute(method: :post, url: "https://applogin.orange.es/oam/server/auth_cred_submit", max_redirects: 5, payload: {username: "DIokclub", "tmp-username": "DIokclub", password: "navidad-2016", request_id: Time.now.to_i, displayLangSelection: false}, cookies: eureka.cookies)

eureka2 = RestClient.get(login.headers[:location], cookies: login.cookies, max_redirects: 1)

eureka3 = RestClient.get(eureka2.request.url, cookies: login.cookies)

puts eureka3.cookies
