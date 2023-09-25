const firebaseConfig = {
    apiKey: "AIzaSyD5XUFZdpnniSJh7rfo8nJ-C6RopWTsNF0",
    authDomain: "rhapsodie-25374.firebaseapp.com",
    projectId: "rhapsodie-25374",
    storageBucket: "rhapsodie-25374.appspot.com",
    messagingSenderId: "339820898811",
    appId: "1:339820898811:web:ad07ee153fbb5c5fe2435e"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);


const auth = app.auth()


// Gestion de l'inscription d'un utilisateur
function signUp(email, password) {
    console.log("inscription")
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // L'utilisateur est inscrit avec succès
            var user = userCredential.user;
            // Faites quelque chose avec l'utilisateur, par exemple, redirigez-le vers une page sécurisée.
        })
        .catch((error) => {
            // Gestion des erreurs d'inscription
            var errorCode = error.code;
            var errorMessage = error.message;
        });
}

// Gestion de la connexion d'un utilisateur
function signIn(email, password) {
    console.log("connexion")
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // L'utilisateur est connecté avec succès
            var user = userCredential.user;
            // Faites quelque chose avec l'utilisateur, par exemple, redirigez-le vers une page sécurisée.
        })
        .catch((error) => {
            // Gestion des erreurs de connexion
            var errorCode = error.code;
            var errorMessage = error.message;
        });
}

// Gestion de la déconnexion de l'utilisateur
function signOut() {
    auth.signOut().then(() => {
        // L'utilisateur est déconnecté avec succès
    }).catch((error) => {
        // Gestion des erreurs de déconnexion
    });
}
