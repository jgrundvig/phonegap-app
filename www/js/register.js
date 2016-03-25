var register = (function(){
  var template = `
  <div class="col-xs-12">
    <p>
    <h1>To-do App </h1>
    <h4>Register... OR FAIL!</h4>
    </p>
    <p id="error" class="bg-danger none">User already exists.</p>
    <p id="mismatch-pw" class="bg-danger none">Check that the passwords match.</p>
    <p id="db-error" class="bg-danger none">Database Error!!!</p>
    <form class="form-group">
    <p>
    <input id="register-username" class="form-control" type="text" placeholder="Username"/>
    <p>
    <input id="register-password" class="form-control" type="password" placeholder="Password"/>
    <p>
    <input id="register-password-confirm" class="form-control" type="password" placeholder="Re-type Password"/>
    <p>
    <input id="register" class="btn btn-lg btn-primary" type="submit" placeholder="Register" />
    <p>
    <a id="i-remembered" class="btn btn-lg btn-primary">Remembered your login?</a>
    </p>
    </form>
  </div>
  `;
  var load = function(){
    console.log('registering...');
    document.getElementById('container').innerHTML = template;
    var submit = document.getElementById('register');
    submit.addEventListener('click', onRegister);
    var remembered = document.getElementById('i-remembered');
    remembered.addEventListener('click', function(e){
      e.preventDefault();
      sign_in.load();
    });
  };

  var onRegister = function(e){
    e.preventDefault();
    var username = document.getElementById('register-username').value;
		var password = document.getElementById('register-password').value;
    var passwordConfirmation = document.getElementById('register-password-confirm').value;
    if(password === passwordConfirmation){
      var request = new XMLHttpRequest();
      request.addEventListener('load', function(data){
        try{
          var response = JSON.parse(data.target.response);
          if(response.success){
            onSuccess();
          }
          else{
            onError();
          }
        }
        catch(exception){
          show('db-error');
        }
      });
      request.addEventListener('error', function(data){
        onError();
      });

      // add hash algorithm here to password
      password = hash.sha256_digest(password);

  		request.open("POST", "http://icarus.cs.weber.edu/~jg13534/cs3750/todo/CreateUser.php");
      request.send(form.sendData({
        "username": username,
        "password": password
      }));
    }
    else {
      show('mismatch-pw');
    }
  };

  var onSuccess = function(){
    sign_in.load();
    sign_in.show('success');
  }
  var onError = function(){
    show('error');
  }
  var show = function(id){
    switch(id){
      case 'error':
      var error = document.getElementById('error').className = 'bg-danger';
      break;
      case 'mismatch-pw':
      var error = document.getElementById('mismatch-pw').className = 'bg-danger';
      break;
      case 'db-error':
      var error = document.getElementById('db-error').className = 'bg-danger';
    }
  }
  return {
    "load": load
  }
})();
