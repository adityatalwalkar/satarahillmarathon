angular.module('marathonpacers.services').factory('Auth', function(FURL, $firebaseAuth, $firebaseArray, $firebaseObject) {

	var ref = new Firebase(FURL);
	var auth = $firebaseAuth(ref);

	var Auth = {
		user: {},

    /*login: function(user) {
      return auth.$authWithPassword(
        {email: user.email, password: user.password}
      );
    },*/
    login: function(method,onReturn)
    {
      
      return ref.authWithOAuthPopup(method,onReturn,{
                remember: "sessionOnly",
                scope: "email"
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
		if(authData) {
      angular.copy(authData, Auth.user);
      Auth.user.profile = $firebaseObject(ref.child('profile').child(authData.uid));

		} else {
      if(Auth.user && Auth.user.profile) {
        Auth.user.profile.$destroy();

      }

      angular.copy({}, Auth.user);
		}
	});

	return Auth;

});
