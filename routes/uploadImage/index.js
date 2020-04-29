var express = require('express');
var router = express.Router();

// 上传图片到阿里云oss使用
var fs = require('fs');
// 初始化Client
var co = require('co');
var OSS = require('ali-oss');
var client = new OSS({
    region: 'oss-cn-chengdu',//开通的oss
    accessKeyId: 'LTAI4FhZ86nJ3jtALTg9XVto',
    accessKeySecret: 'BRa6xAvG4waFK0XpacAzMjdoK64qRf'
});

var ali_oss = {
    bucket: 'xusu',  //阿里云您的bucket
    endPoint: 'oss-cn-chengdu.aliyuncs.com', //填写你开通的oss地址
}

//图片上传
var multer = require('multer')
var upload = multer({ dest: './tmp/' })
router.post('/upload',  upload.single('avantFile'), function(req, res, next){
 
    
     //  文件路径
     var filePath = './' + req.file.path;  
     // 文件类型
     var temp = req.file.originalname.split('.');
     var fileType = temp[temp.length - 1];
     var lastName = '.' + fileType;
     // 构建图片名
     var fileName = Date.now() + lastName;
     // 图片重命名
     fs.rename(filePath, fileName, (err) => {
         if (err) {
             res.json(JSON.stringify({status:'102',msg:'文件写入失败'}));   
         }else{
             var localFile = './' + fileName;  
             var key = 'mingsu/userImage/'+fileName;
 
             // 阿里云 上传文件 
             co(function* () {
               client.useBucket(ali_oss.bucket);
               var result = yield client.put(key, localFile);
               //自定义使用域名访问图片，（别忘记把域名解析至oss）
               var imageSrc = 'https://xusu.oss-cn-chengdu.aliyuncs.com/' + result.name;
               // 上传之后删除本地文件
               fs.unlinkSync(localFile);
               res.send({
                   code:200,
                   msg:'上传成功',
                   imageUrl:imageSrc
               })
            //    res.json(JSON.stringify({status:'100',msg:'上传成功',imageUrl:imageSrc})); 
             }).catch(function (err) {
               // 上传之后删除本地文件
               fs.unlinkSync(localFile);
               res.json(JSON.stringify({status:'101',msg:'上传失败',error:JSON.stringify(err)})); 
             });
         }
     });
    
    });
    
module.exports = router;   //暴露这个 router模块