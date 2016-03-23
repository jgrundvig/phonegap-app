var form = (function(){
var sendData = function(data){
  var FD = new FormData();

  for(name in data){
    if(data.hasOwnProperty(name)){
      FD.append(name, data[name]);
    }
  }
  return FD;
}

  return {
    "sendData": sendData
  }
})();
