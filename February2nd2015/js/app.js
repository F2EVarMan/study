/*
声明angular模块 myApp，依赖ui.router
 */
var myApp=angular.module('myApp',['ui.router'])
/*
一般把路由状态写在配置当中,config可以在实际跑起来之前做一些配置工作
把$stateProvider和$urlRouterProvider作为参数传入，
这样就可以在这个应用程序中配置路由
 */
myApp.config(function ($stateProvider,$urlRouterProvider){
/*
如果没有路由能匹配当前页面url状态的话就会默认将路由至/user
 */
	
	$urlRouterProvider.otherwise('/user');
/*
声明路由状态及所对应的url 和template
 */	
	$stateProvider
		.state('user',{
			url:"/user",
			templateUrl:"tpls/home.html"
		})
/*
这里定义state状态的时候写了 "." 意为着 这是user下面的子页面属于嵌套路由
 */		
		.state('user.change',{
			url:"/change",
			templateUrl:"tpls/change.html"
		})
		.state('user.zone',{
			url:"/zone",
			templateUrl:"tpls/zone.html"
		})
		.state('user.info',{
			url:"/info",
			templateUrl:"tpls/info.html"
		})

})
