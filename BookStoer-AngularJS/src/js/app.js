var routerApp=angular.module('routerApp',['ui.router']);
//config可以在实际跑起来之前做一些配置工作，比如路由
routerApp.config(function($stateProvider,$urlRouterProvider){
	//需要使用$urlRouterProvider.otherwise()来设置默认的路由
	$urlRouterProvider.otherwise('/index');
	//设置状态
	$stateProvider
	  .state('index',{
	  	url:'/index',
	  	templateUrl:'tpls/home.html'
	  })
	

})