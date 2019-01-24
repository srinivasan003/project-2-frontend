/**
 * 
 */
/**
 * Angular module "app"
 */
var app=angular.module("app",['ngRoute','ngCookies'])
app.config(function($routeProvider){
	$routeProvider
	.when('/registerUser',{controller:'UserCtrl',templateUrl:'views/registrationform.html'})
	.when('/login',{controller:'UserCtrl',templateUrl:'views/login.html'})
	.when('/protectedresource',{controller:'UserCtrl',templateUrl:'views/protectedview.html'})
	.when('/getuser',{controller:'UserCtrl',templateUrl:'views/updateform.html'})
	.when('/addjob',{controller:'JobCtrl',templateUrl:'views/jobform.html'})
	.when('/alljobs',{controller:'JobCtrl',templateUrl:'views/jobslist.html'})
	.when('/addblogpost',{controller:'BlogPostCtrl',templateUrl:'views/blogpostform.html'})
	/*.when('/getblogs',{contorller:'BlogPostCtrl',templateUrl:'views/listofblogsapproved.html'})*/
	.when('/getblog/:id',{controller:'BlogInDetailsCtrl',templateUrl:'views/blogindetails.html'})
	.when('/getblogs',{controller:'BlogPostCtrl',templateUrl:'views/listofblogsapproved.html'})
	.when('/getblogswaitingofapproval',{controller:'BlogPostCtrl',templateUrl:'views/listofblogwaitingforapproval.html'})
	.when('/getblogwaitingforapproval/:id',{controller:'BlogInDetailsCtrl',templateUrl:'views/blogapprovalform.html'})
	.when('/updateblogform/:id',{controller:'BlogInDetailsCtrl',templateUrl:'views/updateblogpostform.html'})
	.when('/getnotification/:id',{controller:'NotificationCtrl',templateUrl:'views/notificationondetails.html'})
	.when('/uploadprofilepic',{templateUrl:'views/profilepicture.html'})
	.when('/suggestedusers',{controller:'FriendCtrl',templateUrl:'views/suggesteduserlist.html'})
	.when('/pendingrequests',{controller:'FriendCtrl',templateUrl:'views/pendingrequest.html'})
	.when('/listoffriends',{controller:'FriendCtrl',templateUrl:'views/friendslist.html'})
	.when('/chat',{controller:'ChatCtrl',templateUrl:'views/chat.html'})
	.otherwise({controller:'UserCtrl',templateUrl:'views/home.html'})
})

//ngRoute -> $routeProvider and ng-view
//ngCookies -> $cookieStore
//ngRoute -> $routeProvider and ng-view
//ngCookies -> $cookieStore

app.run(function($rootScope,$cookieStore,UserService,$location){
	if($rootScope.user==undefined)
		$rootScope.user=$cookieStore.get('user')
		
    $rootScope.logout=function(){
		UserService.logout().then(function(response){
			delete $rootScope.user
			$cookieStore.remove('user')
			$location.path('/login')
		},function(response){
			if(response.status==401){//session attribute email is not there in HttpSession
			delete $rootScope.user
			$cookieStore.remove('user')
			$location.path('/login')
			}
		})
	}
})
