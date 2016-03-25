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
          <input id="delete" class="btn btn-lg btn-danger" type="submit" value="Delete all tasks" />
      </div>
    </div>
  	`;
  };
  var load = function(passedInUser){
    user = passedInUser;
    document.getElementById('container').innerHTML = template();
    var body = document.getElementsByTagName("body")[0];
    body.addEventListener("click", onTaskClicked);

    setTasks(user.userId, function(){
      document.getElementById('container').innerHTML = template();
      var createEle = document.getElementById('create');
      if(createEle){
        createEle.addEventListener('click', onSaveTask);
      }
      var deleteTaskBtn = document.getElementById('delete');
      deleteTaskBtn.addEventListener('click', onDeleteAllTasks);
    });
  };
  var createTaskItems = function(tasks){
    tasks.forEach(function(task){
      var isComplete = task.completed === "0" ? "" : "checked";
      taskList += `
      <li>
        <input class="hidden" data-id="${task.taskId}" id="checkbox-${task.taskId}" ${isComplete} type="checkbox">
        <label data-id="${task.taskId}" for="checkbox-${task.taskId}">${task.description}</label>
      </li>`;
    });
  };
  var setTasks = function(userId, callback){
    todoService.getTasksByUserId(userId, function(tasks, error){
      if(!error){
        createTaskItems(tasks);
        allTasks = tasks;
      }
      callback();
    });
  };
  var onSaveTask = function(){
    var description = document.getElementById('task').value;
    if(description !== ""){
      var request = {
        description: description,
        userId: user.userId
      };
      todoService.createTask(request, function(success, error){
        if(!error){
          console.log("Success!");
          updateTaskList();
        }
        else{
          console.error(error);
        }
      });
    }
  };
  var updateTaskList = function(){
    todoService.getTasksByUserId(user.userId, function(tasks, error){
      if(!error){
        taskList = [];
        createTaskItems(tasks);
        document.getElementById("todo-list").innerHTML = taskList;
        document.getElementById("task").value = "";
      }
    });
  };
  var onTaskClicked = function(e){
    var attributes = e.target.attributes;
    if(attributes.getNamedItem("data-id")){
      console.log('fired');
      var taskId = attributes.getNamedItem("data-id").value;
      var completed = document.getElementById("checkbox-" + taskId).checked;
      var request = {
        taskId: taskId,
        completed: completed
      };
      todoService.updateTask(request, function(success, error){
        if(!error){
          console.log(success);
        }
        else {
          console.error("yo dawg, there is an error updating.");
        }
      });
    }
  };
  var onDeleteAllTasks = function(){
    var request = {
      userId: user.userId
    };
    todoService.deleteTasksByUserId(request, function(success, error){
      if(!error){
        updateTaskList();
      }
    });
  };
  return{
    "load": load
  }
})();
