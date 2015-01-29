var myModule=angular.module('myModule',[]);
myModule.controller('loadDataCtrl',function($scope,$http){
	$http({
		method:"GET",
		url:"data.json"
	}).success(function(data){
		console.log(data);	
		$scope.users=data;
	}).error(function(data,status,headers,config){
		console.log(status)
	})

})