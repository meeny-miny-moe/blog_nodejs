var http = require('http');
var fs = require('fs');
var url = require('url');
var qs=require('querystring');
const { Redirect } = require('request/lib/redirect');
var template=require('./lib/template.js');
var path=require('path');
var sanitizeHtml= require('sanitize-html');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;   // query: {id:'CSS'}
    var pathname = url.parse(_url, true).pathname; // pathname: '/'
    //console.log(pathname);
 
    if(pathname === '/'){
      if(queryData.id===undefined){ // 메인화면일 때
        fs.readdir('./data',function(error, filelist){ // 파일 리스트 얻기
          //console.log(filelist);
          var title='Sumin'; 
          var html = template.html1(title);
          response.writeHead(200);
          response.end(html);
        })
      }
      else { // id 값이 있는 경우의 코드
        fs.readdir('./data',function(error, filelist){ // 파일 리스트 얻기
          fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
            var title = queryData.id;
            var sanitizeTitle=sanitizeHtml(title);
            var sanitizeDescription=sanitizeHtml(description);
            var html = template.html3(sanitizeTitle,sanitizeDescription);
            response.writeHead(200);
            response.end(html);
          });
        });
      }
    } 
    else if(pathname==='/write'){
      var title="WRITE";
      var html=template.html_write(title,
        `
        <body>
        <form action="/write_process" method="post">
        <p>
        <input type="text" name="title" placeholder="title"></input>
       </p>
        <p>
          <textarea name="description" placeholder="description"></textarea>
        </p>
        <p>
         <input type="submit">
        </p>
       </form>
        </body>
        `);
      response.writeHead(200);
      response.end(html);
    }
    else if(pathname==='/write_process'){
      var body='';
        request.on('data', function(data) {
            body+=data; });
        request.on('end',function() {
             var post=qs.parse(body);
             var title=post.title;
             var description=post.description;
             console.log(post.title);
             console.log(description);
             fs.writeFile(`data/${title}`,description,'utf8',function(err){
                 response.writeHead(302,{Location: `/?id=${title}`}); // redirect한다는 의미
                 response.end();
                // response.end('success');
                
             })
        });
    }
    else if(pathname === '/update'){
      console.log("업데이트");
      fs.readdir('./data',function(error, filelist){ // 파일 리스트 얻기
        var filteredId=path.parse(queryData.id).base; // .. 생략하고 뒷부분 얻음
        //console.log(filteredId);
        fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
          var title = queryData.id;
          var sanitizeTitle=sanitizeHtml(title);
          var sanitizeDescription=sanitizeHtml(description);
          var html = template.html_write(sanitizeTitle,
            `
            <form action="/update_process" method="post">
            <input type="hidden" name="id" value="${sanitizeTitle}"> 
               <p>
                  <input type="text" name="title" placeholder="title" value=${sanitizeTitle}></input>
               </p>
               <p>
                  <textarea name="description" placeholder="description">${sanitizeDescription}</textarea>
               </p>
               <p>
                <input type="submit">
               </p>
             </form>
             <a href="/create">create</a> <a href="/update?id=${sanitizeTitle}">update</a>`
            );
          response.writeHead(200);
          response.end(html);
        });
      });
    }
    else if (pathname==='/update_process'){
      var body='';
      request.on('data', function(data) {
       body+=data; });
      request.on('end',function() {
           var post=qs.parse(body);
           var id=post.id;
           var title=post.title;
           var description=post.description;
           
           // 제목을 변경했을 때 파일 이름 리네임하기
           fs.rename(`data/${id}`,`data/${title}`,function(error){
            fs.writeFile(`data/${title}`,description,'utf8',function(err){
              response.writeHead(302,{Location: `/?id=${title}`}); // redirect한다는 의미
              response.end();
           })
      });
    });
    }
    else if(pathname==='/post'){
      fs.readdir('./data',function(error, filelist){ // 파일 리스트 얻기
        //console.log(filelist);
        var title='Sumin';
        var list=template.list(filelist);
        var html=template.html2(title,list);
        response.writeHead(200);
        response.end(html);
      })
    }
     // 파일 삭제 눌렀을 때 경로
     else if (pathname==='/delete_process'){ 
      var body='';
      request.on('data', function(data) {
       body+=data; });
      request.on('end',function() {
           var post=qs.parse(body);
           var id=post.id;
           var filteredId=path.parse(id).base;
           // 파일 삭제하기
           fs.unlink(`data/${filteredId}`,function(error){
            response.writeHead(302,{Location: `/`}); // redirect한다는 의미
            response.end();
           })
    });
    }
    else {
      response.writeHead(404); // 파일을 찾을 수 없음
      response.end('Not found');
    } 
});
app.listen(3000);