// Récupère l'ID du formulaire à partir de l'URL
const url = new URL(window.location.href);
const formId = url.searchParams.get('id');

// Initialise la variable formData
let formData = null;

// Envoie une requête GET à l'API pour récupérer les données du formulaire
fetch(`/api/form/${formId}`, {
    headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
}).then(response => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Failed to fetch form data');
    }
}).then(data => {

    formData = data;

    const title = document.querySelector('#titre');
    const fields = document.querySelector('#fields');
    
    title.textContent = formData.name;
    
    // Boucle qui affiche les champs du formulaire
    fields.innerHTML = '';
    
    if (formData.fields.length === 0) {
        fields.innerHTML = '<p>Aucun champ pour le moment</p>';
    }
    
    formData.fields.forEach((field, index) => {
        const fieldElement = document.createElement('div');
        fieldElement.className = 'field';
        
        const fieldText = document.createElement('label');
        fieldText.textContent = field.field_text;
        if (field.required) {
            const required = document.createElement('span');
            required.textContent = ' *';
            required.style.color = 'red';
            fieldText.appendChild(required);
        }
        fieldElement.appendChild(fieldText);
        
        const input = document.createElement('input');
        input.type = field.field_type;
        input.name = `${index}`;
        input.required = field.required;
        fieldElement.appendChild(input);
        
        fields.appendChild(fieldElement);

        // Si au le champ est requis, on ajoute un message dans #required-message
        if (field.required) {
            const requiredMessage = document.querySelector('#required-message');
            requiredMessage.style.display = 'block';
        }
    });

    // Ajoute un écouteur d'événement sur le formulaire
    document.querySelector('form').addEventListener('submit', async (event) => {

        // On désactive le bouton de soumission du formulaire
        event.target.querySelector('input[type="submit"]').disabled = true;
        event.target.querySelector('input[type="submit"]').value = 'Envoie en cours...';
        // Empêche l'envoi du formulaire
        event.preventDefault();

        const submitData = new FormData(event.target); // Récupère les données du formulaire

        // Agence les données du formulaire au bon format
        
        // On envoie une requetye API pour récupérer l'id de l'utilisateur
        const responseUser = await fetch(`/api/user`, {
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        });
        
        const user = await responseUser.json();
        
        const responseData = [];
        
        for (let [key, value] of submitData) {
            responseData.push({
                user_id: user._id,
                form_data: value,
                field_id: key,
                created_at: Date.now()
            });
        }
        
        console.log(responseData);
        
        // Envoie les données du formulaire au serveur
        const response = await fetch(`/api/form/${formId}/response`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(responseData)
        });

        // Si la requête a réussi ou si l'utilisateur est déjà connecté
        if (response.ok) {
            alert("Envoyé !");
            window.location.href = '/'; // Redirige vers la page d'accueil
        } else {
            // Affiche un message d'erreur
            const error = await response.json();
            alert(error.message);
        }

        // On réactive le bouton de soumission du formulaire
        event.target.querySelector('input[type="submit"]').disabled = false;
        event.target.querySelector('input[type="submit"]').value = 'Se connecter';
    });

}).catch(error => {
    console.error(error);
    alert('Impossible de récupérer les données du formulaire');
});
