 <!-- Script pour récupérer et afficher les informations de l'utilisateur -->
   <script src="https://www.gstatic.com/firebasejs/10.4.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.4.0/firebase-auth-compat.js"></script>
    // Pour récuperer les informations
        const firebaseConfig = {
            apiKey: "AIzaSyD5XUFZdpnniSJh7rfo8nJ-C6RopWTsNF0",
    authDomain: "rhapsodie-25374.firebaseapp.com",
    projectId: "rhapsodie-25374",
    storageBucket: "rhapsodie-25374.appspot.com",
    messagingSenderId: "339820898811",
    appId: "1:339820898811:web:ad07ee153fbb5c5fe2435e"
        };

        firebase.initializeApp(firebaseConfig);
        const auth = firebase.auth();
        const db = firebase.firestore();

        // Fonction pour récupérer les informations de l'utilisateur actuellement connecté
        auth.onAuthStateChanged((user) => {
            if (user) {
                // Utilisateur connecté
                const email = user.email;

                // Récupérez les informations de l'utilisateur à partir de la base de données
                db.collection("users")
                    .where("email", "==", email)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            const data = doc.data();
                            document.getElementById("firstName").textContent = data.firstname;
                            document.getElementById("lastName").textContent = data.name;
                            document.getElementById("userRole").textContent = data.role;
                            document.getElementById("userSite").textContent = data.site;
                        });
                    })
                    .catch((error) => {
                        console.error("Erreur lors de la récupération des informations de l'utilisateur:", error);
                    });
            } else {
                // Utilisateur non connecté, redirigez-le vers la page de connexion
                window.location.href = "connexion.html"; // 
            }
        });
    