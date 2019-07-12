<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width,initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie-edge">
	<title>User Login</title>
</head>
<body>
<p3>{{ __('Welcome back, %s!', 'leiwang') }}</p3><br>
<form action="/login" method="post">
	<input type="text" name="username" id="username" placeholder="{{__('Email')}}">
	<br>
	<input type="password" name="password" id="password" placeholder="{{__('Password')}}">
	<br>
		<label><input name="rememberMe" type="radio"/>记住我</label>
	<br>
	<input type="submit" value="{{__('Login')}}">
	<input type="reset" value="{{__('Reset')}}">
</form>
</body>
</html>