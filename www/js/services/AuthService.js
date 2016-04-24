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
    }
	};

	auth.$onAuth(function(authData) {
    	if (authData ) {
        // save the user's profile into the database so we can list users,
        // use them in Security and Firebase Rules, and show profiles
        ref.child("users").child(authData.uid).set({
          provider: authData.provider,
          name: getName(authData)
        });
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
