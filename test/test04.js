var fs = require('fs')
var request = require('request')
var arr = []
// fs.readFile('./json/landmark.json', 'utf8', function (err, data) {
//     if (err) console.log(err);
//     var test1 = JSON.parse(data); //读取的值
    
//     arr = test1.result.data.landmarkList.map((item,index) => {
//         // item.titleTagList=item.titleTagList.map(ite=>ite.name)
 
//         var a = {
//             "landmarkType": item.landmarkType,
//             "landmarkTypeName": item.landmarkTypeName
//         }
//         return a 
//     })
//     var str = JSON.stringify(arr);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
//         fs.writeFile('landmark.json',str,function(err){
//             if(err){
//                 console.error(err);
//             }
//             console.log('----------新增成功-------------');
//         })
   
// });

// fs.readFile('./json/cityList.json', 'utf8', function (err, data) {
//     if (err) console.log(err);
//     var test1 = JSON.parse(data); //读取的值
    
//     arr = test1.result.data.hotCityList.map((item,index) => {
//         // item.titleTagList=item.titleTagList.map(ite=>ite.name)
 
//         var a = {
//                 "cityidAjk": item.cityidAjk,
//                 "cityid": item.cityid58,
//                 "cityidYj": item.cityidYj,
//                 "cityname": item.cityname,
//                 "pinyin": item.pinyin,
//                 "alias": item.alias,
//                 "openCity": item.openCity58,
//         }
//         return a 
//     })
//     var str = JSON.stringify(arr);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
//         fs.writeFile('cityList01.json',str,function(err){
//             if(err){
//                 console.error(err);
//             }
//             console.log('----------新增成功-------------');
//         })
   
// });

fs.readFile('./json/shanghai.json', 'utf8', function (err, data) {
    if (err) console.log(err);
    var test1 = JSON.parse(data); //读取的值

    arr = test1.result.data.lodgeList.map((item,index) => {
        let aa = index+70
        item.titleTagList=item.titleTagList.map(ite=>ite.name)
        let houseId=aa<10?'h000'+index:'h00'+aa 
        let houseurl = aa<10?'ia_1000'+index:'ia_100'+aa
        let url = item.lodgeImageUrl   
        var a = {
            introduce: item.introduce,
            introduce1: item.introduce1,
            introduce2: item.introduce2,
            title: item.title,
            price: item.price,
            cityId: item.cityId,
            titleTagList: item.titleTagList.toString(),
            score: item.score,
            houseId: houseId,
            houseUrl:houseurl


        }
        return a 
    })
    var str = JSON.stringify(arr);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
        fs.writeFile('mingsuadd.json',str,function(err){
            if(err){
                console.error(err);
            }
            console.log('----------新增成功-------------');
        })
   
});