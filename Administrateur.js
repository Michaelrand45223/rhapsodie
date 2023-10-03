// administrateur.js

// Fonction pour récupérer les informations de l'administrateur
function getAdminInfo() {
    // Utilisez Firebase pour récupérer les informations de l'administrateur
    const adminEmail = "admin@example.com"; // Remplacez par l'email de l'administrateur

    db.collection("users").where("email", "==", adminEmail).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const adminData = doc.data();
                // Affichez les informations sur la page
                document.getElementById("admin-firstname").textContent = adminData.firstname;
                document.getElementById("admin-lastname").textContent = adminData.name;
                document.getElementById("admin-role").textContent = adminData.role;
                document.getElementById("admin-site").textContent = adminData.site;
            });
        })
        .catch((error) => {
            console.error("Erreur lors de la récupération des informations de l'administrateur : ", error);
        });
}

// Appelez la fonction pour obtenir les informations de l'administrateur lors du chargement de la page
getAdminInfo();
