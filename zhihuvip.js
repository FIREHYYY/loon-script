[mitm]

hostname = 117.161.236.117,book.zhimg.com,45.116.155.181,103.55.228.1,103.55.228.2,36.102.5.193,103.55.228.2,36.102.19.41,45.116.153.100,36.102.5.193,103.55.228.1,117.161.222.56,45.116.153.101,45.116.153.103,45.116.153.104,45.116.153.99,45.116.153.102,45.116.153.105,45.116.153.98,45.116.153.100,42.81.16.110,182.254.61.202,117.161.41.200,182.254.61.77,182.254.61.200,103.41.167.226, 103.41.167.233, 103.41.167.234,103.41.167.235,103.41.167.236,103.41.167.237,103.105.60.99,119.96.33.219,119.96.33.221,119.96.33.218,119.96.33.222,119.96.33.219,119.96.33.217,119.96.33.216,119.96.33.215,119.96.33.220,36.25.253.113,117.21.231.222,117.34.34.124,42.81.125.229,122.228.255.237,219.151.137.135,113.240.92.69,106.126.10.252,150.138.173.180,117.34.34.123,150.138.234.90,113.240.92.83,150.138.234.125,116.136.170*,116.136.15*,123.138.13*,123.138.13*,125.72.138*,116.177.244*,221.178.19.*,218.201.95*,117.187.144*,112.19.1*,58.216.107*,58.221.31*,61.243.13*,58.144.248*,120.92.107*,125.77.176*,27.148*,183.204*,122.224*,60.188.72*,120.220*,120.222*,150.109.91*,*zhihu*,103.41.167*,112.194.67*,119.39.203*,101.207.252*,58.223.164*,27.152.187*,157.255.135*,124.227.186*,113.16.214*,113.96.150*,113.96.181*,103.107.219*,42.81.120*,123.161.58*,42.81.26*,140.429.84*,140.249.84*,27.185.2*,150.138.36*

[rewrite_local]

^http[s]?:\/\/api\.zhihu\.com\/commercial_api\/launch_v2 url reject-dict
^http[s]?:\/\/api\.zhihu\.com\/commercial_api\/real_time_launch_v2 url reject-dict
^http[s]?:\/\/(api|www)\.zhihu\.com\/(people\/self|unlimited\/go\/my_card|sku\/reversion_sku_ext|bazaar\/vip_tab\/header|api\/v3\/books).*$ url script-response-body https://raw.githubusercontent.com/WeiRen0/Scripts/main/ZHVIP.js
^http[s]?:\/\/.*zhihu\.(com|cn)\/(appview\/v2\/answer|remix-web\/paid_columns.*manuscript|market\/paid_column|appview\/p|api\/v3\/books.*\/download|market\/paid_magazine).*$ url script-request-header https://raw.githubusercontent.com/WeiRen0/Scripts/main/ZHTK.js
^http[s]?:\/\/.*\/v2\/resolv\?host\=api\.zhihu\.com url reject
