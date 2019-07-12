<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width,initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie-edge">
	<title>User Register</title>
</head>
<body>
<form action="/register" method="post">
	<input type="text" name="username" id="username" placeholder="{{__('Email')}}">
	<br>
	<input type="password" name="password" id="password" placeholder="{{__('Password')}}">
	<br>
	<input type="submit" value="{{__('Register')}}">
	<input type="reset" value="{{__('Reset')}}">
</form>
</body>
</html>