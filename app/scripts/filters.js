(function(){
	'use strict';

	var app = angular.module('app');

	app.filter('toerror', function(){
		return function(errors) {
			var rv = [];
			if(angular.isDefined(errors)) {
				var fields = {};
				for(var ek in errors) {
					var ev = errors[ek];
					if(angular.isArray(ev)) {
						for(var i = 0; i<ev.length; i++) {
							var name = ev[i].$name;
							if(angular.isDefined(fields[name])) {
								fields[name].errors.push(ek);
							} else {
								fields[name] = { name: name, errors: [ek] };
								rv.push(fields[name]);
							}
						}

					}
				}
			}
			return rv;
		}
	});
})();