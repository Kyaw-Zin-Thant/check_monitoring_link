  
//'http://www.globalnewlightofmyanmar.com/category/opinion/articles/','http://www.globalnewlightofmyanmar.com/category/local-news/','http://www.globalnewlightofmyanmar.com/category/national/','https://myanmar.mmtimes.com/national-news.html',  'https://myanmar.mmtimes.com/business.html','https://news-eleven.com/crime','https://news-eleven.com/politics','https://news-eleven.com/business','http://kicnews.org/category/article/','https://burma.irrawaddy.com/category/news','https://burma.irrawaddy.com/category/business','https://burma.irrawaddy.com/category/article','http://www.nmg-news.com/category/news/','http://www.nmg-news.com/category/statements/','https://www.bbc.com/burmese/burma','https://www.bbc.com/burmese/in_depth','https://www.bbc.com/burmese/economy','https://www.rfa.org/burmese/','https://burmese.voanews.com/p/5941.html','http://burmese.dvb.no/archives/category/news/criminals-news','http://burmese.dvb.no/archives/category/news/economics-new','http://burmese.dvb.no/archives/category/news/politics-new','http://www.mizzimaburmese.com/news','https://burmese.shannews.org/archives/category/news','http://www.narinjara.com/burmese/category/business/','http://www.narinjara.com/burmese/category/news/','https://khonumthung.org/','http://burmese.monnews.org/category/news/','http://www.kantarawaddytimes.org/breaking-news/news/','https://www.hintharmedia.com/category/news/%E1%80%95%E1%80%BC%E1%80%8A%E1%80%BA%E1%80%90%E1%80%BD%E1%80%84%E1%80%BA%E1%80%B8%E1%80%9E%E1%80%90%E1%80%84%E1%80%BA%E1%80%B8/','https://www.seniorgeneralminaunghlaing.com.mm/Home/news/','http://www.xinhuanet.com/english/china/index.htm','https://frontiermyanmar.net/en/category/news-feed','https://frontiermyanmar.net/en/category/business','https://www.mmtimes.com/national-news.html','https://www.irrawaddy.com/category/news','https://www.irrawaddy.com/category/news','http://www.mizzima.com/news','http://www.mizzima.com/business','https://elevenmyanmar.com/news/',
var monitoringLink =['https://myanmar.mmtimes.com/national-news.html',  'https://myanmar.mmtimes.com/business.html','https://news-eleven.com/crime','https://news-eleven.com/politics','https://news-eleven.com/business','http://kicnews.org/category/article/','https://burma.irrawaddy.com/category/news','https://burma.irrawaddy.com/category/business','https://burma.irrawaddy.com/category/article','http://www.nmg-news.com/category/news/','http://www.nmg-news.com/category/statements/','https://www.bbc.com/burmese/burma','https://www.bbc.com/burmese/in_depth','https://www.bbc.com/burmese/economy','https://www.rfa.org/burmese/','https://burmese.voanews.com/p/5941.html','http://burmese.dvb.no/archives/category/news/criminals-news','http://burmese.dvb.no/archives/category/news/economics-new','http://burmese.dvb.no/archives/category/news/politics-new','http://www.mizzimaburmese.com/news','https://burmese.shannews.org/archives/category/news','http://www.narinjara.com/burmese/category/business/','http://www.narinjara.com/burmese/category/news/','https://khonumthung.org/','http://burmese.monnews.org/category/news/','http://www.kantarawaddytimes.org/breaking-news/news/','https://www.hintharmedia.com/category/news/%E1%80%95%E1%80%BC%E1%80%8A%E1%80%BA%E1%80%90%E1%80%BD%E1%80%84%E1%80%BA%E1%80%B8%E1%80%9E%E1%80%90%E1%80%84%E1%80%BA%E1%80%B8/','https://www.seniorgeneralminaunghlaing.com.mm/Home/news/','http://www.xinhuanet.com/english/china/index.htm','https://frontiermyanmar.net/en/category/news-feed','https://frontiermyanmar.net/en/category/business','https://www.mmtimes.com/national-news.html','https://www.irrawaddy.com/category/news','https://www.irrawaddy.com/category/news','http://www.mizzima.com/news','http://www.mizzima.com/business','https://elevenmyanmar.com/news/','http://www.nmg-news.com/category/news/','https://www.rfa.org/english/news/china','https://www.rfa.org/english/news/myanmar','https://www.rfa.org/english/news/tibet','https://teacircleoxford.com/']
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var extractor = require('node-article-extractor');
var fs = require('fs');
var dateFormat = require('dateformat');
var checkArr =['https://myanmar.mmtimes.com/','bbc','burmese.voanews','mizzimaburmese','https://www.mmtimes.com','mizzima','rfa'];
var engBur = [' http://www.xinhuanet.com/', 'https://frontiermyanmar.net/', 'https://www.mmtimes.com/', 'https://www.irrawaddy.com/', 'http://www.mizzima.com/', 'https://elevenmyanmar.com/', 'https://www.rfa.org/english/', 'https://teacircleoxford.com/','http://www.globalnewlightofmyanmar.com']; 
var mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var getdataList=[];
var Rabbit = require("rabbit-node");


var express = require('express');
var port = process.env.PORT || 8080;
var app = express();
app.get('/', function (req, res) {
 res.send(JSON.stringify({ Hello: 'World'}));
});
app.listen(port, function () {
 console.log('Hello World');
 monitoringAndSave();
});
//exports.handler = (event, context, callback) =>
function monitoringAndSave(){
  async.eachSeries(monitoringLink, (m, cb) => {
    request.get(m, (err,response,body)=>{
      if(!err){
       $ = cheerio.load(body);
       links = $('a'); 
         $(links).each(function(i, link){
             
               if($(link).attr('href')!==undefined && getdataList.includes($(link).attr('href'))===false && $(link).attr('href')!=='' && ($(link).text().indexOf(mL[0])===-1 ||$(link).text().indexOf(mL[1])===-1 ||$(link).text().indexOf(mL[2])===-1 ||$(link).text().indexOf(mL[3])===-1 ||$(link).text().indexOf(mL[4])===-1 ||$(link).text().indexOf(mL[5])===-1 ||$(link).text().indexOf(mL[6])===-1 ||$(link).text().indexOf(mL[7])===-1 ||$(link).text().indexOf(mL[8])===-1 ||$(link).text().indexOf(mL[9])===-1 ||$(link).text().indexOf(mL[10])===-1 ||$(link).text().indexOf(mL[11])===-1)&& ($(link).attr('href').indexOf('/files/')===-1 && $(link).attr('href').indexOf('/author/')===-1 && $(link).attr('href').indexOf('/download')===-1)){
                 if( m.indexOf(checkArr[0])!==-1 && ($(link).attr('href').indexOf('http')===-1 ||$(link).attr('href').indexOf('https')===-1) && $(link).attr('href').indexOf('#')===-1){
                  getdataList.push('https://myanmar.mmtimes.com'+$(link).attr('href'));
                }else if( m.indexOf(checkArr[1])!==-1 && ($(link).attr('href').indexOf('http')===-1 ||$(link).attr('href').indexOf('https')===-1) && $(link).attr('href').indexOf('#')===-1){
                  getdataList.push('https://www.bbc.com'+$(link).attr('href'));
                }else if( m.indexOf(checkArr[2])!==-1 && ($(link).attr('href').indexOf('http')===-1 ||$(link).attr('href').indexOf('https')===-1) && $(link).attr('href').indexOf('#')===-1){
                  getdataList.push('https://burmese.voanews.com'+$(link).attr('href'));
                }else if(  m.indexOf(checkArr[3])!==-1 && ($(link).attr('href').indexOf('http')===-1 ||$(link).attr('href').indexOf('https')===-1) && $(link).attr('href').indexOf('#')===-1){
                  getdataList.push('http://www.mizzimaburmese.com'+$(link).attr('href'));
                }else if( m.indexOf(checkArr[4])!==-1 && ($(link).attr('href').indexOf('http')===-1 ||$(link).attr('href').indexOf('https')===-1) && $(link).attr('href').indexOf('#')===-1){
                  getdataList.push('https://www.mmtimes.com'+$(link).attr('href'));
                }else if( m.indexOf(checkArr[5])!==-1 && ($(link).attr('href').indexOf('http')===-1 ||$(link).attr('href').indexOf('https')===-1) && $(link).attr('href').indexOf('#')===-1){
                 getdataList.push('http://www.mizzima.com'+$(link).attr('href'));
                }else if( m.indexOf(checkArr[6])!==-1 && ($(link).attr('href').indexOf('http')===-1 ||$(link).attr('href').indexOf('https')===-1) && $(link).attr('href').indexOf('#')===-1){
                  getdataList.push('https://www.rfa.org'+$(link).attr('href'));
                }else if( $(link).attr('href').indexOf('#')===-1){
                  getdataList.push($(link).attr('href'));
                }
               
               }
          
           });  
       cb(null);
      }else{
        console.log(err,'error?')
        cb(err);
      }
     }); 
  }, (err) => {
    if(err){
      console.log(err);
    }else{
      saveData(getdataList);
    }
  })
}

function saveData(checkList){
 async.eachSeries(checkList, (m, cb) => {
    var link_one= m;
    console.log(' urla> ',m)
    if(link_one!==undefined && (link_one.indexOf('http')!==-1 || link_one.indexOf('https')!==-1)){
       request.get(m,(err,response,body)=>{
              if(!err){
               
              data = extractor(body);
              var publisher='';
                 if(data.publisher!==undefined){
                 publisher=Rabbit.uni2zg(data.publisher);
                  }
                 
                  var date=data.date;
                
           
              if(link_one.indexOf(engBur[8])!==-1){
                   if(data.description!==undefined && data.text!=='' && data.description!=='' && date!==null && date!==undefined && date!==''){
                       
                        insertDatatoKnackTopicTag(Rabbit.uni2zg(data.title),date);
                        insertDatatoKnackMasterDB(Rabbit.uni2zg(data.title),date,link_one,data.text,data.description,'GNLM',publisher);
                       
                      }
                  }else if(link_one.indexOf(engBur[0])!==-1|| link_one.indexOf(engBur[1])!==-1|| link_one.indexOf(engBur[2])!==-1|| link_one.indexOf(engBur[3])!==-1|| link_one.indexOf(engBur[4])!==-1|| link_one.indexOf(engBur[5])!==-1|| link_one.indexOf(engBur[6])!==-1|| link_one.indexOf(engBur[7])!==-1){
                   if(data.description!==undefined  && data.text!==''&& date!==null && date!==undefined && date!==''){
                        insertDatatoKnackTopicTag(Rabbit.uni2zg(data.title),date);
                        insertDatatoKnackMasterDB(Rabbit.uni2zg(data.title),date,link_one,data.text,data.description,'ENG',publisher);
                       
                      }
                  }else {
                    if(data.description!==undefined  && data.text!=='' && date!==null && date!==undefined && date!=='' ){
                        insertDatatoKnackTopicTag(Rabbit.uni2zg(data.title),date);
                        insertDatatoKnackMasterDB(Rabbit.uni2zg(data.title),date,link_one,Rabbit.uni2zg(data.text),data.description,'BUR',publisher);
                       
                      }
              }
                cb(null);
              }else{
                console.log(err,' data extractor');
                cb(null);
              }
            })
          
          
    }else{
      cb(null);
    }

      
    },(err)=>{
    console.log(err)
  })

}


function insertDatatoKnackTopicTag(title,date){
const options = {
  uri: 'https://api.knack.com/v1/objects/object_23/records',
  method: 'POST',
  headers: { 
    "X-Knack-Application-Id" :"5a8287652ee1f532952b95d2",
    "X-Knack-REST-API-Key":"b2c706a0-2d0e-11e8-961a-9d99e9293ce6",
    'Content-Type': 'application/json'
  },
  formData:{
  // Pass a simple key-value pair
  "field_376": title,//Topic Tag Name
  // Pass data via Buffers
  "field_401":dateFormat(new Date(),"dd/mm/yyyy h:MMTT"),//created date field_402 CB
  "field_402":'Luffa'
  // Pass data via Streams
  
}
}
request.post(options, function optionalCallback(err, httpResponse, body) {
  if (err) {
    console.log('upload failed:', err);
  }else{
  	console.log('Upload successful!  Server responded with:', body);
  	
  }
 
  
});


}



function insertDatatoKnackMasterDB(title,date,link,fulltext,summary,sourceName,sourceMedia){
var options;


if(sourceName==='ENG'){
   options = {
  uri: 'https://api.knack.com/v1/objects/object_18/records',
  method: 'POST',
  headers: { 
    "X-Knack-Application-Id" :"5a8287652ee1f532952b95d2",
    "X-Knack-REST-API-Key":"b2c706a0-2d0e-11e8-961a-9d99e9293ce6",
    'Content-Type': 'application/json'
  },
  formData:{
            "field_292": dateFormat(new Date(),"dd/mm/yyyy h:MMTT"),//Date/Time
            "field_290":title,//created date field_402 CB
            "field_406":'GNLM',
            "field_333": summary ,//eng summary,
            "field_405":fulltext,
            "field_407":date,
            "field_372":'Luffa Test',
            "field_335":link   ,//url for english
            "field_291":'Other',//entry type,
            "field_406":sourceMedia//source Media
          }
}
}else if(sourceName==='GNLM'){
   options = {
  uri: 'https://api.knack.com/v1/objects/object_18/records',
  method: 'POST',
  headers: { 
    "X-Knack-Application-Id" :"5a8287652ee1f532952b95d2",
    "X-Knack-REST-API-Key":"b2c706a0-2d0e-11e8-961a-9d99e9293ce6",
    'Content-Type': 'application/json'
  },
  formData:{
                  "field_292": dateFormat(new Date(),"dd/mm/yyyy h:MMTT"),//Date/Time
                  "field_290":title,//created date field_402 CB
                  "field_406":'GNLM',
                  "field_333": summary ,//eng summary,
                  "field_405":fulltext,
                  "field_407":date,
                  "field_372":'Luffa Test',
                  "field_378":link ,//url for gnlm field_390
                  "field_291":'Other',//entry type,
                  "field_406":sourceMedia//source Media
              }
}
     
}else{
      options = {
      uri: 'https://api.knack.com/v1/objects/object_18/records',
      method: 'POST',
      headers: { 
        "X-Knack-Application-Id" :"5a8287652ee1f532952b95d2",
        "X-Knack-REST-API-Key":"b2c706a0-2d0e-11e8-961a-9d99e9293ce6",
        'Content-Type': 'application/json'
      },
      formData:{
            "field_292": dateFormat(new Date(),"dd/mm/yyyy h:MMTT"),//Date/Time
            "field_290":title,//created date field_402 CB
            "field_406":'GNLM',
            "field_334": summary ,//burmese summary,
            "field_405":fulltext,
            "field_407":date,
            "field_372":'Luffa Test',
            "field_335":link,//url for english
            "field_291":'Other',//entry type,
            "field_406":sourceMedia//source Media
          }
    }
  
}

console.log(options,' insertDatatoKnackMasterDB ?')
request.post(options, function optionalCallback(err, httpResponse, body) {
  if (err) {
    console.log(err, ' insertDatatoKnackMasterDB ')
  }
  console.log('Upload successful!  Server responded with:', body);
});


}


