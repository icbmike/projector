
var $ = require('jquery');

function ApiService(){
	this.token = null;
	this.expiryTime = null;
}

ApiService.prototype.login = function(username, password) {
	
	var loginPromise = $.ajax({
		url: "/api/token",
		username: username,
		password: password,
		
	});

	var that = this;

	return loginPromise.then(function(response, textStatus, jqXHR){
		
		//save the token
		that.token = response.token;
		
		//save the duration time so that we can get a new token if we think that 
		//our token has expired
		var t = new Date();
		t.setSeconds(t.getSeconds() + parseInt(response.duration) - 10);

		that.expiryTime = t;

		//Indicate that the login was succesful
		return true;

	}, function(jqXHR, textStatus, errorThrown){
		
		//Indicate that the login failed
		return false;
	});

};

ApiService.prototype.isAuthenticated = function() {
	return this.token !== null;
};

ApiService.prototype.getDownloads = function(first_argument) {
	var promise = $.ajax({
		url: "/api/downloads",
		username: this.token
	});

	return promise.then(
		function(response, textStatus, jqXHR){
			return response;
		}, 
		function(jqXHR, textStatus, errorThrown){
			return null;
		}
	);
};
ApiService.prototype.getPendingDownloads = function() {
	var promise = $.ajax({
		url: "/api/pendingDownloads",
		username: this.token
	});

	return promise.then(
		function(response, textStatus, jqXHR){
			return response;
		}, 
		function(jqXHR, textStatus, errorThrown){
			return null;
		}
	);
};

ApiService.prototype.createDownload = function(name, url) {
	var data = {
		name: name,
		url: url
	};

	var promise = $.ajax({
		username: this.token,
		data: JSON.stringify(data),
		contentType: 'application/json',
		url: "/api/pendingDownloads",
		method: "POST"
	});


	return promise.then(
		function(response, textStatus, jqXHR){
			return response;
		}, 
		function(jqXHR, textStatus, errorThrown){
			return null;
		}
	);
};

ApiService.prototype.register = function(username, password, callback) {
	
	var data = {
		username: username,
		password: password
	};

	var request = $.ajax({
		url: "/api/users",
		data: JSON.stringify(data),
		contentType: 'application/json',
		method: "POST",
		complete: function(jqXHR, textStatus){
			
			if(callback !== undefined){
				callback(jqXHR.status === 201);
			}
		}
	});
};

module.exports = ApiService;
