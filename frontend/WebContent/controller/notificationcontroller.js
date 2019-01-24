/**
 * 
 */app.controller('FriendCtrl',function($scope,$location,FriendService){
	function getAllSuggestedUsers(){
	FriendService.getAllSuggestedUsers().then(function(response){
		$scope.suggestedUsers=response.data //List<User> in JSON representation
	},function(response){
		if(response.status==401)
			$location.path('/login')
	})
	}
	$scope.sendFriendRequest=function(toId){//toId is user object , it is the value for toId property in Friend entity
		FriendService.sendFriendRequest(toId).then(
				function(response){
					//S in (A - (B U C))
					getAllSuggestedUsers()
				},function(response){
					if(response.status==401)
						$location.path('/login')
				})
	}
	//Get the list of pending requests
	function getAllPendingRequests(){
		FriendService.getAllPendingRequests().then(
				function(response){
					$scope.pendingRequests=response.data
				},
				function(response){
					if(response.status==401)
						$location.path('/login')
				})
	}
	
    $scope.acceptFriendRequest=function(request){//request is a Friend Object
    	FriendService.acceptFriendRequest(request).then(
    			function(response){
    				getAllPendingRequests()
    			},function(response){
    				if(response.status==401)
						$location.path('/login')
    			})
    }	
	
    $scope.deleteFriendRequest=function(request){
    	FriendService.deleteFriendRequest(request).then(
    	function(response){
			getAllPendingRequests()
		},function(response){
			if(response.status==401)
				$location.path('/login')
		})
    }
	
    function getAllFriends(){
    	FriendService.getAllFriends().then(
    			function(response){
    				//response.data is Array of User object
    				$scope.friends=response.data
    			},function(response){
    				if(response.status==401)
    					$location.path('/login')
    			})
    }
    
	getAllSuggestedUsers()
	getAllPendingRequests()
	getAllFriends()
})


app.controller('NotificationCtrl', function($scope, NotificationService, $routeParams, $location, $rootScope) {
	var id = $routeParams.id
	console.log(id)
	NotificationService.getNotification(id).then(function(Response) {
		console.log(Response.data)
		$scope.notification = Response.data // select * from notification whereid=?
	}, function(resposne) {
		if (Response.status == 401)
			$location.path('/login')
	})

	NotificationService.updateNotification(id).then(function(Response) {
		console.log(id)
		getNotificationNotViewed()
	}, function(Response) {
		if (Response.status == 401)
			$location.path('/login')
	})

	function getNotificationNotViewed() {
		NotificationService.getNotificationNotViewed().then(function(response) {
			//update the value of the variables
			//response.data = [list of notification not yet viewed by the user]
			$rootScope.notifications=response.data
			$rootScope.notificationCount=$rootScope.notifications.length
		}, function(response) {
			if(response.status==401)
				$location.path('/login')
		})
	}
})