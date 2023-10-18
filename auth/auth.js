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
const db = firebase.firestore();


// Gestion de l'inscription d'un utilisateur
function signUp(email, password) {
    console.log("inscription");

    // Vérifiez d'abord si l'adresse e-mail existe déjà
    auth.fetchSignInMethodsForEmail(email)
        .then((signInMethods) => {
            if (signInMethods && signInMethods.length > 0) {
                // L'adresse e-mail est déjà utilisée par un compte
                alert("Cette adresse e-mail est déjà associée à un compte.");
            } else {
                // L'adresse e-mail n'est pas encore utilisée, vous pouvez procéder à l'inscription
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
                        alert("Erreur d'inscription : " + errorMessage);
                    });
            }
        })
        .catch((error) => {
            console.error("Erreur lors de la vérification de l'adresse e-mail: ", error);
        });
}


// Gestion de la connexion d'un utilisateur
function signIn(email, password) {
    console.log("connexion")
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // L'utilisateur est connecté avec succès
            var user = userCredential.user;

            // Vérifier le rôle de l'utilisateur à partir de la base de données
            db.collection("users").where("email", "==", email).get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        const userRole = doc.data().role;
                        // Rediriger en fonction du rôle
                        if (userRole === "Salarié") {
                            window.location.href = "../Salarie/Salarié.html";
                        } else if (userRole === "Administrateur") {
                            window.location.href = "../Administrateur/administrateur/administrateur.html";
                        } else if (userRole === "Responsable") {
                            window.location.href = "../Responsable/Responsablecra/responsable.html";
                        } else {
                            console.error("Rôle non reconnu: ", userRole);
                        }
                    });
                })
                .catch((error) => {
                    console.error("Erreur lors de la récupération du rôle: ", error);
                });
        })
        .catch((error) => {
            // Gestion des erreurs de connexion
            var errorCode = error.code;
            var errorMessage = error.message;
            alert("Erreur de connexion : " + errorMessage);
            console.error("Erreur de connexion:", errorMessage);
        });
}
// /Gestion de deconnexion
function signOut() {
    auth.signOut().then(() => {
        // L'utilisateur est déconnecté avec succès
        window.location.href = "../Connexion/connexion.html"; // Redirigez vers la page de connexion ou la page principale
    }).catch((error) => {
        // Gestion des erreurs de déconnexion
        alert("Erreur lors de la déconnexion.");
    });
}


const inscription = (e) => {
    console.log("connexion");

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    const responsable = document.getElementById("responsable").value;
    const site = document.getElementById("site").value;

    console.log({ email, password });
    if (password.length < 6) {
        alert("Veuillez mettre un mot de passe avec plus de 6 caractères");
    }
    // TODO: chercher un validateur email regexp
    else {
        try {
            signUp(email, password);

            db.collection("users").add({
                name: nom,
                firstname: prenom,
                email: email,
                responsable: responsable,
                site: site
            })
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        }

        catch (e) {
            console.log(e)
        }
    }
};


const login = (e) => {
    console.log("connexion");

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log({ email, password });
    // TODO: chercher un validateur email regexp*
    try {
        signIn(email, password);
    }
    catch (e) {
        console.log({ e })
    }
};

// appelle la fonction signout
document.addEventListener("DOMContentLoaded", function () {
    const signOutButton = document.getElementById("signOutButton");
    if (signOutButton) {
        signOutButton.addEventListener("click", function () {
            signOut();  // Appellez votre fonction signOut()
        });
    }
});
//////////-------------------//////////////////////////////
