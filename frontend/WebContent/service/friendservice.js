/**
 * FriendService
 */
app.factory('FriendService',function($http){
	var friendService={}
	var BASE_URL="http://localhost:9001/Finalprojectmiddleware"
	friendService.getAllSuggestedUsers=function(){
		return $http.get(BASE_URL + "/suggestedusers")
	}
	
	friendService.sendFriendRequest=function(toId){//toId is user object
		return $http.post(BASE_URL + "/friendrequest",toId)
	}
	
	friendService.getAllPendingRequests=function(){
		return $http.get(BASE_URL + "/pendingrequests")
	}
	
	friendService.acceptFriendRequest=function(request){
		return $http.put(BASE_URL + "/acceptfriendrequest",request)
	}
	
	friendService.deleteFriendRequest=function(request){
		return $http.put(BASE_URL + "/deletefriendrequest",request)
	}
	
    friendService.getAllFriends=function(){
    	return $http.get(BASE_URL + "/listoffriends")
    }	
	return friendService;
})
