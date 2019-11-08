// // var isUserLoggedIn = false;
// var missionId;
// // var userId;

// var ref = firebase.database().ref();
// var db = firebase.firestore();
// firebase.firestore().enablePersistence();

// This gets called from iOS after token is received
function loginFromiOS(idToken) {
  var credential = firebase.auth.GoogleAuthProvider.credential(idToken);
  firebase.auth().signInWithCredential(credential).catch(function(error) {
    //Materialize.toast("Error with signinWithCredential", 3000);
  });
}

// Called from Android onActivityResult
function loginFromAndroid(idToken) {
  var credential = firebase.auth.GoogleAuthProvider.credential(idToken);
  firebase.auth().signInWithCredential(credential).catch(function(error) {
  });
}

// function login() {
  
//   // This was introduced because of Google auth requirements
//   if(getMobileOS() == 'iOS') {
    
//     // Send the login message to iOS
//     window.webkit.messageHandlers.observe.postMessage("login");
    
//     // Hide the side bar after button click
//     $(".button-collapse").sideNav("hide");
  
//   } else if (getMobileOS() == 'Android') {
    
//     // Call the login method in Android WebAppInterface
//     Android.login();
    
//     // Hide the side bar after button click
//     $(".button-collapse").sideNav("hide");
    
//   } else {
  
//     var provider = new firebase.auth.GoogleAuthProvider();
//     provider.addScope("email");
//     firebase.auth().signInWithRedirect(provider);
    
//   }
// }

// // This gets called from iOS after token is received
// function loginFromiOS(idToken) {
//   var credential = firebase.auth.GoogleAuthProvider.credential(idToken);
//   firebase.auth().signInWithCredential(credential).catch(function(error) {
//     //Materialize.toast("Error with signinWithCredential", 3000);
//   });
// }

// // Called from Android onActivityResult
// function loginFromAndroid(idToken) {
//   var credential = firebase.auth.GoogleAuthProvider.credential(idToken);
//   firebase.auth().signInWithCredential(credential).catch(function(error) {
//   });
// }

// function initAuth(name) {

//   const launchScreen = () => {
//     // Change the login button with the user's name if it exists
//     if (!name)
//       $("#login").html('<a href="#" id="userInfo" class="light-blue lighten-3 white-text">Hi!</a>');
//     else
//       $("#login").html('<a href="#" id="userInfo" class="light-blue lighten-3 white-text">Hi ' + name.split(" ")[0] + '!</a>');
    
//     $("#login").removeClass("center-align");

//     isUserLoggedIn = true;
    
//     $("#d1").show();
//     $("#d2").show();
//     $("#d3").show();
//     $("#saveMission").show();
//     $("#myMissions").show();
//     $("#logout").show();
//   }
  
//   firebase.auth().onAuthStateChanged(function(user) {
    
//     // User is signed in
//     if (user && !userId) {
      
//       console.log("user is logged in");
      
//       userId = user.uid;

//       db.collection('users').doc(user.uid).get().then((userData) => {
//         if(userData.exists){
//           db.collection('users').doc(user.uid).update({
//             loginAt: firebase.firestore.FieldValue.serverTimestamp()
//           })

//           launchScreen((userData.data().displayName));
//         }else{
//           const providerData = user.providerData[0];

//           db.collection('users').doc(user.uid).set({
//             uid: providerData.uid,
//             providerId: providerData.providerId,
//             displayName: providerData.displayName,
//             photoURL: providerData.photoURL,
//             email: providerData.email,
//             createdAt: firebase.firestore.FieldValue.serverTimestamp(),
//             loginAt: firebase.firestore.FieldValue.serverTimestamp(),
//             missions: []
//           }).then(() => {
//             launchScreen(providerData.displayName);
//           })
//         }
//       })
//     }
//   });
// }

// We'll determine if we're saving a DJI mission or a Tello mission
// function saveMission() {
  
// }