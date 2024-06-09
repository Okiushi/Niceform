const API_URL = "http://localhost:8081/api";

const displayUsers = async () => {
    $('#output').empty(); // Vider le contenu avec jQuery

    try {
        const response = await fetch(`${API_URL}/users`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des utilisateurs');
        }
        const users = await response.json();
        users.forEach(user => {
            $('#output').append(`
                <div class="user">
                    <p>${user._id}<br>${user.email}</p>
                    <button class="del-user-btn" data-id="${user._id}">Supprimer</button>
                </div>
            `);
        });
    } catch (error) {
        console.error('Une erreur est survenue :', error.message);
        $('#output').html(`<p class='display-error'>Une erreur est survenue lors de la récupération des utilisateurs.</p>`);
    }
}

const delUser = async (id) => {
    try {
        const response = await fetch(`${API_URL}/user/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la suppression de l\'utilisateur');
        }
        displayUsers();
    } catch (error) {
        console.error('Une erreur est survenue lors de la suppression de l\'utilisateur :', error.message);
    }
}

// Bouton pour ajouter un utilisateur
$('#btn_add_user').on('click', async () => {
    let mail = prompt("Entrez l'email de l'utilisateur :");

    if (mail !== null && mail !== '') {
        try {
            const response = await fetch(`${API_URL}/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: mail,
                    external: true
                })
            });
            if (!response.ok) {
                throw new Error('Erreur lors de l\'ajout de l\'utilisateur');
            }
            displayUsers();
        } catch (error) {
            console.error('Une erreur est survenue lors de l\'ajout de l\'utilisateur :', error.message);
        }
    }
});

// Utiliser la délégation d'événements pour gérer les boutons de suppression dynamiquement ajoutés
$('#output').on('click', '.del-user-btn', function() {
    const userId = $(this).data('id');
    delUser(userId);
});

displayUsers();
