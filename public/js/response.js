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
    const responses = document.querySelector('#responses');
    
    title.textContent = formData.name;
    
    const responseData = [];
    
    for (let i = 0; i < formData.responses.length; i++) {

        // Si aucun objet dans responseData contient l'ID de l'utilisateur, on le crée sinon on ajoute les réponses à l'objet existant
        if (!responseData.some(obj => obj.user_id === formData.responses[i].user_id)) {
            responseData.push({
                user_id: formData.responses[i].user_id,
                responses: []
            });
        }
        
        let user = responseData.find(user => user.user_id === formData.responses[i].user_id);
        if (user) {
            user.responses.push({
                field_id: formData.responses[i].field_id,
                form_data: formData.responses[i].form_data,
                created_at: formData.responses[i].created_at
            });
        }
    }
    
    // On affiche les réponses des utilisateurs
    responseData.forEach(user => {
        
        // on récupère le nom et le prénom de l'utilisateur via l'API
        fetch(`/api/user/${user.user_id}`, {
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch user data');
            }
        }).then(data => {
            // On crée un div pour chaque utilisateur
            const userDiv = document.createElement('div');
            userDiv.classList.add('user');
            userDiv.innerHTML = `
                <hr>
                <h2>${data.firstname} ${data.lastname}</h2>
            `
            
            const responsesDiv = document.createElement('div');
            responsesDiv.classList.add('responses');
    
            user.responses.forEach(response => {
                responsesDiv.innerHTML += `
                    <div class="field">
                    <p>${formData.fields[response.field_id].field_text} : <b>${response.form_data}</b></p>
                    </div>`;
            });
    
            userDiv.appendChild(responsesDiv);
            responses.appendChild(userDiv);
        }).catch(error => {
            console.error(error);
            alert('Impossible de récupérer les données d\'un utilisateur');
        });
        
    });
    
}).catch(error => {
    console.error(error);
    alert('Impossible de récupérer les données du formulaire');
});
