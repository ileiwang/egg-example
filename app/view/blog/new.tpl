<html>
  <head>
    <title>New Blog</title>
    <link rel="stylesheet" href="/public/css/news.css" />
  </head>
  <body>
<!--     <ul class="news-view view">
      {% for item in list %}
        <li class="item">
          <a href="{{ item.url }}">{{ item.title }}</a>
          {{ helper.relativeTime(item.time) }}
        </li>
      {% endfor %}
    </ul> -->

    <form method="post" action="/api/blogs">
      <input type="text" name="title" placeholder="标题"><br>
      <input type="text" name="content" placeholder="内容"><br>
      <button type="submit">提交</button>
      <button type="reset">重置</button>
    </form>
  </body>
</html>