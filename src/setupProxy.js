// const {createProxyMiddleware} = require("http-proxy-middleware");

// module.exports = function(app){
//     app.use(createProxyMiddleware("/devApi",{
//         target: "http://www.web-jshtml.cn/api/react",
//         changeOrigin: true,
//         pathRewrite:{
//             "^/devApi": "",
//         }
//     }))
// }

//1. 在request.js里找到baseurl，发现为‘devApi’，尝试匹配createProxy里给的参数是不是devApi
//2. 匹配成功，转至代理网址
//3. 重新/抹掉 devApi 。ex：最后login的网址应为：serverAddress/login