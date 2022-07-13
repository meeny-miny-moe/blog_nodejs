module.exports = {
  html1:function(title){
  return `
<head>
  <link rel="stylesheet" href="main.css">
  <meta charset="utf-8">
</head>
<header class="header" role="banner">
  <h1 class="logo">
    <a href="/">${title}'s <span>blog</span></a>
  </h1>
  <div class="nav-wrap">
    <nav class="main-nav" role="navigation">
      <ul class="unstyled list-hover-slide">
        <li><a href="/post">all post</a></li>
        <li><a href="/write">write</a></li>
      </ul>
    </nav>
    <ul class="social-links list-inline unstyled list-hover-slide">
      <li><a href="#">Twitter</a></li>
      <li><a href="#">Google+</a></li>
      <li><a href="#">GitHub</a></li>
      <li><a href="#">CodePen</a></li>
    </ul>
  </div>
</header>`;
  },
  html2: function(title,list){
    return `
    <head>
  <link rel="stylesheet" href="main.css">
</head>
<header class="header" role="banner">
  <h1 class="logo">
    <a href="/">${title}'s <span>blog</span></a>
  </h1>
  <ul>
  ${list}
  </ul>
    `
  },
  html3:function(title,description){
    return `
    <!doctype html>
    <html>
    <head>
      <title>${title}</title>
      <h1><a href="/"><span>blog</span></a></h1>
      <h2>${title}</h2>
      <meta charset="utf-8">
    </head>
    <body>
    <a href="/update?id=${title}">update</a>
    <form action="/delete_process" method="post" >
    <input type="hidden" name="id" value="${title}">
    <input type="submit" value="delete">
</form>
    </br></br>
    ${description}
    </body>
    </html>
    `
  },
  html_write:function(title,body){
    return `
    <!doctype html>
    <html>
    <head>
      <title>${title}</title>
      <h1><a href="/"><span>blog</span></a></h1>
      <h2>${title}</h2>
      <meta charset="utf-8">
    </head>
    ${body}
    </html>
    `
  },
  list: function (filelist){
    var list='<ul>';
    var i=0;
    while(i<filelist.length){
      list=list+`<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
      i++;
    }
    list=list+'</ul>';
    return list;
  }
}