var todoService = (function(){
  var sendRequest = function(action, data, url, callback){
    var request = new XMLHttpRequest();
    request.open(action, url);
    request.addEventListener('load', function(data){
      callback(JSON.parse(data.target.response));
    });
    request.addEventListener('error', function(data){
      callback(null, JSON.parse(data.target.response));
    });
    request.send(data);
  }
  var getTasksByUserId = function(userId, callback){
    sendRequest("GET", null, "http://icarus.cs.weber.edu/~jg13534/cs3750/todo/GetTasksByUserID.php?userId=" + userId, callback);
  }
  var createTask = function(data, callback){
    var formData = form.sendData(data);
    sendRequest("POST", formData, "http://icarus.cs.weber.edu/~jg13534/cs3750/todo/CreateTask.php", callback);
  }
  var updateTask = function(data, callback){
    var formData = form.sendData(data);
    sendRequest("POST", formData, "http://icarus.cs.weber.edu/~jg13534/cs3750/todo/UpdateTask.php", callback);
  };
  var deleteTasksByUserId = function(data, callback){
    var formData = form.sendData(data);
    sendRequest("POST", formData, "http://icarus.cs.weber.edu/~jg13534/cs3750/todo/DeleteTasksByUserID.php", callback);
  };
  return {
    "getTasksByUserId": getTasksByUserId,
    "createTask": createTask,
    "updateTask": updateTask,
    "deleteTasksByUserId": deleteTasksByUserId
  }
})();
