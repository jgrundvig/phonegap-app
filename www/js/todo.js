var todo = (function(){
  var taskList = "";
  var username = "";
  var user = {};
  var allTasks = [];
  var template = function(){
    return `
  	<div class="col-xs-12">
  		<p>
      <h1>To-do App </h1>
  		<h4>Welcome, ${user.username}!</h4>
      </p>
      <div class="col-xs-12">
      	<ul id="todo-list">
      		${taskList}
      	</ul>
      </div>
      <div class="col-xs-12">
        	<input id="task" class="form-control" type="text" placeholder="Create new task here..." />
        	<input id="create" class="btn btn-lg btn-success" type="submit" value="Create task" />
      </div>
    </div>
  	`;
  }
  var load = function(passedInUser){
    user = passedInUser;
    document.getElementById('container').innerHTML = template();

    setTasks(user.userId, function(){
      document.getElementById('container').innerHTML = template();
    });
    var createEle = document.getElementById('create');
    if(createEle){
      createEle.addEventListener('click', onSaveTask);
    }

  }
  var createTaskItems = function(tasks){
    tasks.forEach(function(task){
      taskList += `<li><input id="checkbox-${task.taskId}" checked=${task.completed} type="checkbox"><label for="checkbox-${task.taskId}">${task.description}</label></li>`;
    });
  }
  var setTasks = function(userId, callback){
    todoService.getTasksByUserId(userId, function(tasks, error){
      if(!error){
        createTaskItems(tasks);
        allTasks = tasks;
      }
      callback();
    });
  }
  var onSaveTask = function(){
    var description = document.getElementById('task').value;
    var request = {
      description: description,
      userId: user.userId
    };

  }
  return{
    "load": load
  }
})();
