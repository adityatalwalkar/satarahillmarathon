angular.module('marathonpacers.services').factory('Auth', function(FURL, $firebaseAuth, $firebaseArray, $firebaseObject, $rootScope) {

	var ref = new Firebase(FURL);
	var auth = $firebaseAuth(ref);

	var Auth = {
		user: {},

    /*login: function(user) {
      return auth.$authWithPassword(
        {email: user.email, password: user.password}
      );
    },*/
    login: function(method)
    {
      
/*      return ref.authWithOAuthPopup(method,onReturn,{
                remember: "sessionOnly",
                scope: "email"
              }); */

          ref.authWithOAuthPopup(method, function(error, authData) {
            if (error) {
              if (error.code === "TRANSPORT_UNAVAILABLE") {
                // fall-back to browser redirects, and pick up the session
                // automatically when we come back to the origin page
                ref.authWithOAuthRedirect(method, function(error) { 

                  if(authData)
                    $rootScope.$broadcast("userloggedinsuccessfully",{displayName:getName(authData)});  

                 });
              }
            } else if (authData) {
              // user authenticated with Firebase
                  $rootScope.$broadcast("userloggedinsuccessfully",{displayName:getName(authData)});  
            }
          });
    },



    logout: function() {
      auth.$unauth();
			console.log("Usuario Sale.");
    },


    signedIn: function() {

      if(ref.getAuth() != null)
        return !!ref.getAuth().uid; //using !! means (0, undefined, null, etc) = false | otherwise = true
      else
        return false;
    },

    getName:function() {
      var authData = ref.getAuth();
      switch(authData.provider) {
         case 'twitter':
           return authData.twitter.displayName;
         case 'facebook':
           return authData.facebook.displayName;
        case 'google':
           return authData.google.displayName;
      }
  },

    getEmail:function() {
    var authData = ref.getAuth();
    switch(authData.provider) {
       case 'twitter':
         return authData.twitter.email;
       case 'facebook':
         return authData.facebook.email;
      case 'google':
         return authData.google.email;
    }
  },

  getuid:function() {
    if(ref.getAuth() != null)
        return ref.getAuth().uid; //using !! means (0, undefined, null, etc) = false | otherwise = true
      else
        return "-1";
  }

	};

	auth.$onAuth(function(authData) {
    	if(authData) {
          angular.copy(authData, Auth.user);
          Auth.user.profile = $firebaseObject(ref.child('profile').child(authData.uid));
          Auth.user.profile.$save().then(function(ref) {
            ref.key() === Auth.user.profile.$id; // true
          }, function(error) {
            console.log("Error:", error);
          });
          //Auth.user.profile.$add({auth:authData});

      } else {
      
      if(Auth.user && Auth.user.profile) {
        Auth.user.profile.$destroy();

      }

      angular.copy({}, Auth.user);
    } 

  });

  function getName(authData) {
    
    switch(authData.provider) {
       case 'twitter':
         return authData.twitter.displayName;
       case 'facebook':
         return authData.facebook.displayName;
      case 'google':
         return authData.google.displayName;
    }
  }

	return Auth;

});
