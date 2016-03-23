var templateManager = (function(){
	var loadTemplate = function(ele, template){
		document.getElementById(ele).innerHTML = template;
	};

	return {
		'loadTemplate': loadTemplate
	};
})();
