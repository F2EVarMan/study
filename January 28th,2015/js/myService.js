var myService=angular.module('myModule',[]);
myService.factory('userListService',['$http',function($http){
	var doRequest=function(username,path){
		return $http({
			method:'GET',
			url:'users.json'
		});
	}
	return {
		userList:function(username){
			return doRequest(username,'userList');

		}
	}

}])



myService.controller('serviceController',function($scope,$timeout,userListService){

	var timeout;
	$scope.$watch('username',function(newUserName){
		if(newUserName){
			if(timeout){
				$timeout.cancel(timeout);
			}
			timeout=$timeout(function(){
				userListService.userList(newUserName)
				.success(function(data){
					$scope.users=data;
				})
			})
		}

	})



})