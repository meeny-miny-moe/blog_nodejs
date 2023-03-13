module.exports = {
  html1:function(title){
  return `
<head>
  <link rel="stylesheet" href="../main.css">
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
    </ul>
  </div>
</header>`;
  },
  html2: function(title,list){
    return `
    <head>
  <link rel="stylesheet" href="../main.css">
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
    <head>
    <link rel="stylesheet" href="../blog.css">
  </head>
  <div class="divide">
    <div class="top">
      <header>
        <h1 class="logo">
          <a href="/"> <span>blog</span></a>
        </h1>

        <div class="dropdown">
          <button class="dropbtn">Dropdown</button>
          <div class="dropdown-content">
            <a><form action="/delete_process" method="post">
              <input type="hidden" name="id" value="${title}" style="border:none">
                <input type="submit" value="delete" style="border:none">
            </form></a>
            <a href="/update/${title}">update</a></a>
          </div>
      </div>
    </div>
  <div class="bottom">
  </header>
  <section class="container">
  <h2 class="title">${title}</h2>
  <br><br>
  ${description}
</section>
</div>
</div>`
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
  html4:function(title,body){
    return `
    <!DOCTYPE html>
    <html lang="ko">
  
    <head>
      <meta charset="UTF-8" />
      <link rel="stylesheet" href="../write.css">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <!-- Main Style Sheet -->
      <link rel="stylesheet" href="main.css" />
      <!-- Font Awesome -->
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.13.1/css/all.css" integrity="sha384-xxzQGERXS00kBmZW/6qxqJPyxW3UR0BPsL4c8ILaIWXva5kFi7TxkIIaMiKtqV1Q" crossorigin="anonymous" />
      <!-- Google Fonts -->
      <link href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      <title>My Diary App</title>
    </head>
    
    <body>
      <header>
        <h1 class="title"><a href="/"><span>${title}'s</span></a> blog</h1>
      </header>
    
      <!-- Journal Entry Section -->
      <section class="section journal-section">
        <div class="container">
          <div class="container-row container-row-journal">
            <div class="container-item container-item-journal">
              <form id="entryForm" action="write_process" method="post">
                <label for="entry-title" class="journal-label">Entry Title</label>
                <input type="text" name="title" id="entry-title" class="entry-text-title" placeholder="Name of entry ✏️" />
                
                <label for="entry" class="journal-label">Today's Entry</label>
                <textarea name="description" id="entry" class="entry-text-box" placeholder="What's on your mind today? 💭"></textarea>
                <button class="btn-main entry-submit-btn" type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    
      <!-- Journal Entry Results -->
      <section class="section sectionEntryResults" id="entryResultsSection">
        <div class="container">
          <div class="container-row entryResultRow"></div>
        </div>
      </section>
    
      <script src="index.js"></script>
    </body>
    
    </html>
    `

  },
  list: function (filelist){
    var list='<ul>';
    var i=0;
    while(i<filelist.length){
      list=list+`<li><a href="/page/${filelist[i]}">${filelist[i]}</a></li>`;
      i++;
    }
    list=list+'</ul>';
    return list;
  }
}


