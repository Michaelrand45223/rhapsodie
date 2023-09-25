// Initialisation de Firebase avec la configuration
firebase.initializeApp(firebaseConfig);

// Gestion de l'inscription d'un utilisateur
function signUp(email, password) {
    console.log("inscription")
    firebase.auth().createUserWithEmailAndPassword(email, password)
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
    firebase.auth().signInWithEmailAndPassword(email, password)
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
    firebase.auth().signOut().then(() => {
        // L'utilisateur est déconnecté avec succès
    }).catch((error) => {
        // Gestion des erreurs de déconnexion
    });
}
