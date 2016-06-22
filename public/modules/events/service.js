'use strict';

angular.module('alisthub').factory('events', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    
    var url = {};
//get events
    url.getEventUser = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getEvents,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };

           url.addComment = function(jsondata,callback){
       communicationService.resultViaPost(webservices.addComment,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
      
  };


           url.getComment = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getComment,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
      
  };

   url.getEvent = function(jsondata,callback){
    communicationService.resultViaPost(webservices.getEvent,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req) {
      callback(res.data);
    });
  };
 
//delete events
    url.deleteEvent = function(jsondata,callback){
       communicationService.resultViaPost(webservices.deleteEvent,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };



 url.duplicateVenue = function(jsondata,callback){
       communicationService.resultViaPost(webservices.duplicateVenue,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };
return url;

}]);