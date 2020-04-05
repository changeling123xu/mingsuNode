// const axios = require('axios')
var request = require('request')
const fs = require('fs')

// fs.readdir('./', (err, files) => {  //创建本地文件夹
//   if (!files.includes('saveImage')) {
//     fs.mkdir('./saveImage', (err) => {
//       if (err) {
//           throw err;
//         }
//         console.log("已创建图片文件夹")
//       }
//     )
//   }
// })
request('http://pic.ibaotu.com/homeSp/20191028/5db64b54da73a.jpg').pipe(
    fs.createWriteStream(`./images/a`).on('close',err=>{  console.log('写入失败',err) })
)  
// axios.get('http://pic.ibaotu.com/homeSp/20191028/5db64b54da73a.jpg', function(res){
//     var imgData = "";
//     res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
//     res.on("data", function(chunk){ //这步是我百度来的。。。。
//         imgData+=chunk;
//     });

//     res.on("end", function(){
//         fs.writeFile("./saveImage/age.jpg", imgData, "binary", function(err){
//             if(err){
//                 console.log("down fail");
//             }
//             console.log("down success");
//         });
//     });
// });