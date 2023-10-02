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
            // Redirigez l'utilisateur vers la page salarié.html
            window.location.href = "Salarié.html";
        })
        .catch((error) => {
            // Gestion des erreurs de connexion
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error("Erreur de connexion:", errorMessage);
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