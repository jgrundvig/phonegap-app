var sign_in = (function() {

	var template = `
	<div class="col-xs-12">
		<p>
		<h1>To-do App </h1>
		<h4>Sign in... OR ELSE!</h4>
		</p>
		<p id="success" class="bg-success none">You've successfully created a user!</p>
		<p id="error" class="bg-danger none">Invalid login information.</p>
		<form class="form-group">
		<p>
		<input id="sign-in-username" class="form-control" type="text" placeholder="Username"/>
		<p>
		<input id="sign-in-password" class="form-control" type="password" placeholder="Password"/>
		<p>
		<input id="sign-in" class="btn btn-lg btn-default" type="submit" placeholder="Sign in" />
		<p>
		<a id="register" class="btn btn-lg btn-primary">New? I'm not surprised.</a>
		</p>
		</form>
	</div>
	`;

	var onSignIn = function(e){
		e.preventDefault();
		var username = document.getElementById('sign-in-username').value;
		var password = document.getElementById('sign-in-password').value;
		// add hash algorithm here to password
		var request = new XMLHttpRequest();
		var formData = form.sendData({
			"username": username,
			"password": password
		});

		request.addEventListener('load', function(data){
			var response = JSON.parse(data.target.response);
			if(response.success === true){
				onSuccess(response);
			}
			else{
				onError(response);
			}
		});
		request.addEventListener('error', function(data){
			onError(JSON.parse(data.target.response));
		});
		request.open("POST", "http://icarus.cs.weber.edu/~jg13534/cs3750/todo/LoginUser.php");
		request.send(formData);
	}

	var load = function(){
		document.getElementById('container').innerHTML = template;
		var submit = document.getElementById('sign-in');
		submit.addEventListener('click', this.onSignIn);
		var registerEle = document.getElementById('register');
    registerEle.addEventListener('click', function(e){
			e.preventDefault();
			register.load();
		});
	}

	var onSuccess = function(data){
		var user = {
			userId: data.userId,
			username: data.username
		};
		console.log('SIGNING IN...');
		console.log(user);
		todo.load(user);
	}
	var onError = function(){
		show('error');
	}
	var show = function(id){
		switch(id){
			case "success":
			var success = document.getElementById('success').className = 'bg-success';
			break;
			case "error":
			var error = document.getElementById('error').className = 'bg-danger';
		}
	}

	return {
		onSignIn: onSignIn,
		load: load,
		show: show
	}
})();
