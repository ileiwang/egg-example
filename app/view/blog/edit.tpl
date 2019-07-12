<html>
  <head>
    <title>Edit Blog</title>
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

    <form method="put" action="/api/blogs/{{blog.id}}">
      <input type="text" name="title" value="{{blog.title}}"><br>
      <input type="text" name="content" value="{{blog.content}}"><br>
      <input type="submit" value="提交">
      <input type="reset" value="重置">
    </form>
  </body>
</html>