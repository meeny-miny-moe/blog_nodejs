var express = require('express')
var app = express()
var fs = require('fs');
var path = require('path');
var qs = require('querystring');
var sanitizeHtml = require('sanitize-html');
var template = require('./lib/template.js');
 
app.use(express.static('public'));
//route, routing
//app.get('/', (req, res) => res.send('Hello World!'))
app.get('/', (req, res) => {
  fs.readdir('./data',function(error, filelist){ // 파일 리스트 얻기
    //console.log(filelist);
    var title='Sumin'; 
    var html = template.html1(title);
    res.send(html);
  })
  //res.send('Hello World!')
})
 
app.get('/page/:pageId',(req,res)=>{
  //console.log(req.params.pageId); // 7.12
  fs.readdir('./data',function(error, filelist){ // 파일 리스트 얻기
    var filteredId=path.parse(req.params.pageId).base; // id값 받아오기
    fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
      var title = req.params.pageId;
      var sanitizeTitle=sanitizeHtml(title);
      var sanitizeDescription=sanitizeHtml(description);
      var html = template.html3(sanitizeTitle,sanitizeDescription);
      res.send(html);
    });
  });
});

app.get('/post',(req,res)=>{
  fs.readdir('./data',function(error, filelist){ // 파일 리스트 얻기
    //console.log(filelist);
    var title='Sumin';
    var list=template.list(filelist);
    var html=template.html2(title,list);
    res.send(html);
  })
})

 
app.get('/write',(req,res)=>{
  var title="Sumin";
  var html=template.html4(title);
      res.writeHead(200);
      res.end(html);
})
 
app.post('/write_process',(req,res)=>{
  var body='';
  req.on('data', function(data) {
      body+=data; });
      req.on('end',function() {
       var post=qs.parse(body);
       var title=post.title;
       var description=post.description;
       console.log(post.title);
       console.log(description);
       fs.writeFile(`data/${title}`,description,'utf8',function(err){
        res.writeHead(302,{Location: `/?id=${title}`}); // redirect한다는 의미
        res.end();
          // response.end('success');
          
       })
  });
})
 
app.get('/update/:pageId',(req,res)=>{
  console.log(req.params.pageId); // id 받기
  fs.readdir('./data',function(error, filelist){ // 파일 리스트 얻기
    var filteredId=path.parse(req.params.pageId).base; // .. 생략하고 뒷부분 얻음
    //console.log(filteredId);
    fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
      var title = req.params.pageId;
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
      res.writeHead(200);
      res.end(html);
    });
  });

});
 
app.post('/update_process',(req,res)=>{
  var body='';
  req.on('data', function(data) {
   body+=data; });
   req.on('end',function() {
       var post=qs.parse(body);
       var id=post.id;
       var title=post.title;
       var description=post.description;
       
       // 제목을 변경했을 때 파일 이름 리네임하기
       fs.rename(`data/${id}`,`data/${title}`,function(error){
        fs.writeFile(`data/${title}`,description,'utf8',function(err){
          res.writeHead(302,{Location: `/${title}`}); // redirect한다는 의미
          res.end();
       })
  });
});
});
 
app.post('/delete_process', function(request, response){
  var body = '';
  request.on('data', function(data){
      body = body + data;
  });
  request.on('end', function(){
      var post = qs.parse(body);
      var id = post.id;
      var filteredId = path.parse(id).base;
      fs.unlink(`data/${filteredId}`, function(error){
        response.redirect('/');
      })
  });
});
 
app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});
