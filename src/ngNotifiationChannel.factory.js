;(function() {
	'use strict';

	/**
	 * NotificationChannel Module
	 */
	angular.module('ngNotificationChannel.factory', [])
		   .factory('NotificationChannel', NotificationChannel);

	/**
	 * Manually identify dependencies for minification-safe code
	 * 
	 **/
	NotificationChannel.$inject = ['$rootScope'];
	
	/**
	 * The channels basic publish and subscribe functions
	 * 
	 **/

	function NotificationChannel($rootScope) {
		
		var NotificationChannelService = {
				pubRootEmit : pubRootEmit,
        		subRootEmit	: subRootEmit
		};
       
        return NotificationChannelService;

        ////////////

        /**
		 * subRootEmit
		 * 
		 * subscribe for an event published over $rootScope.$emit(event, args)
	     *
		 * @param 	{String} eventName The events name
		 * @param 	{Object} _Scope The scope that calls the channels subscribe function
		 * @param 	{function} scopeHandler The callback handler normally defined in the $scopes controller or directive or service
		 * @param 	{function} $mapArgs A mapper function to customize the given event arguments 
		 * 
		 * @return 	{function} The unsubscribe function from the $rootScope.on() call
		 * 
		**/
     	function subRootEmit(eventName, _Scope, scopeHandler, mapArgs) {
     		
     		//subscribe with rootScope to event and cache unsubscribe function
     		var unsubsSopeHandler = $rootScope.$on(eventName, function(event, args) {
     				//console.log('in subRootEmit publish event: ' + eventName + ' with args: ' + JSON.stringify(mapArgs(args)));
     				if(typeof mapArgs === 'function') {
     					scopeHandler(mapArgs(args));
     				} else {
     					scopeHandler(args);
     				}
	     			
	     		});
     		 
     		//unsubscribe rootScope listener after scope destruction
     		_Scope.$on('$destroy', function() {
     			//console.log('in pubRootEmit _Scope.$on($destroy)');
     			unsubsSopeHandler();
     		});
     		
     		//return he unsubscribe function from the $rootScope.on() call
     		return unsubsSopeHandler;
     	};
     	
     	/**
		 * pubRootEmit
		 * 
		 * publish an event only to $rootScope
	     *
		 * @param 	{String} eventName The events name
		 * @param 	{object} args The events arguments 
		 * 
		**/
     	function pubRootEmit(eventName, args) {
     		 $rootScope.$emit(eventName, args);
     	};
     	
	};

})();