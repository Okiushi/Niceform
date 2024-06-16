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
}).then(data => 
{
    
formData = data;

const header = document.querySelector('header');

header.innerHTML = `
    <a href="/">Retour</a>
    <p>Éditeur de formulaire</p>
    <nav>
        <button class="btn-primary" id="save" disabled>Enregistrer</button>
        <button class="disabled" id="share">Partager</button>
    </nav>
`;

const saveButton = document.querySelector('#save');
const shareButton = document.querySelector('#share');
const title = document.querySelector('#titre');
const fields = document.querySelector('#fields');
const addFieldBtn = document.querySelector('#create-field');

const refreshForm = () => {
    title.textContent = formData.name;
    
    // Boucle qui affiche les champs du formulaire avec le texte qui est modifiable en cliquant dessus, un bouton pour si il est requis et un bouton pour supprimer le champ
    fields.innerHTML = '';
    
    if (formData.fields.length === 0) {
        fields.innerHTML = '<p>Aucun champ pour le moment</p>';
    }
    
    formData.fields.forEach((field, index) => {
        const fieldElement = document.createElement('div');
        fieldElement.className = 'field';
        
        const fieldText = document.createElement('p');
        // Si il est requis on ajoute un * rouge
        fieldText.textContent = field.field_text + (field.required ? ' *' : '');
        fieldText.addEventListener('click', () => {
            const input = document.createElement('input');
            input.value = field.field_text;
            fieldText.replaceWith(input);
            input.focus();
            
            input.addEventListener('blur', () => {
                const newText = input.value;
                input.replaceWith(fieldText);
                fieldText.textContent = newText + (field.required ? ' *' : '') ;
                field.field_text = newText;
            });
        });
        
        const inputField = document.createElement('input');
        field.type = 'text';
        field.value = ""
        inputField.addEventListener('blur', () => {
            field.value = "";
            refreshForm();
        });
        
        const required = document.createElement('button');
        required.textContent = 'Requis';
        required.className = field.required ? 'btn-primary' : 'btn-secondary';
        required.addEventListener('click', () => {
            field.required = !field.required;
            required.className = field.required ? 'btn-primary' : 'btn-secondary';
            refreshForm();
        });
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.className = 'btn-danger';
        deleteButton.addEventListener('click', () => {
            formData.fields.splice(index, 1);
            refreshForm();
        });
        
        fieldElement.appendChild(fieldText);
        fieldElement.appendChild(inputField);
        fieldElement.appendChild(required);
        fieldElement.appendChild(deleteButton);
        fields.appendChild(fieldElement);
    });
    // Si au moins un chans est requis on ajoute en bas du formulaire un message pour dire que les champs requis sont obligatoires
    const requiredFields = formData.fields.filter(field => field.required);
    const requiredMessage = document.querySelector('#required-message');
    if (requiredFields.length > 0) {
        requiredMessage.textContent = '* Champs requis';
    } else {
        requiredMessage.textContent = '';
    }
};
    
// Boucle asynchrone qui vérifie si le formulaire est modifié en temps réel
const checkForm = async () => {
    try {
        const response = await fetch(`/api/form/${formId}`, {
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        });
        if (response.ok) {
            const newFormData = await response.json();
            if (JSON.stringify(newFormData) !== JSON.stringify(formData)) {
                saveButton.disabled = false;
                saveButton.textContent = 'Enregistrer';
            }
        } else {
            throw new Error('Failed to fetch form data');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

// Pour changer le nom du formulaire
title.addEventListener('click', () => {
    // se transforme en input pour éditer le nom puis redevient un lien
    const input = document.createElement('input');
    input.value = formData.name;
    title.replaceWith(input);
    input.focus();
    
    input.addEventListener('blur', () => {
        const newName = input.value;
        input.replaceWith(title);
        title.textContent = newName;
        formData.name = newName;
    });
});

// Pour enregistrer les modifications du formulaire
saveButton.addEventListener('click', () => {
    
    fetch(`/api/form/${formId}`, {
        method: 'PUT',
        headers: {'Authorization': `Bearer ${localStorage.getItem('token')} `, 'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
    },
    ).then(response => {
        if (response.ok) {
            saveButton.disabled = true;
            saveButton.textContent = 'Enregistré'
            response.json().then(data => {
                formData = data;
                refreshForm();
            });
        } else {
            console.error('Failed to save form data');
            throw new Error('Failed to save form data');
        }
    }).catch(error => {
        console.error('Error:', error);
    });
});

shareButton.addEventListener('click', () => {
    confirm('Vous ne pourrez plus le modifier une fois partagé, voulez vous continuer ?') && shareForm();
});

// Pour partager le formulaire
const shareForm = () => {
    fetch(`/api/form/${formId}/share`, {
        method: 'POST',
        headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
    }).then(response => {
        if (response.ok) {
            response.json().then(data => {
                alert('Formulaire partagé !');
                window.location.replace('/');
            });
        } else {
            throw new Error('Failed to share form');
        }
    }).catch(error => {
        console.error('Error:', error);
    });
};

// Pour ajouter un champ au formulaire
addFieldBtn.addEventListener('click', () => {
    const newField = {
        field_text: 'Nouveau champ',
        field_type: 'text',
        required: false
    };
    
    formData.fields.push(newField);
    
    refreshForm();
});



setInterval(checkForm, 500);
refreshForm();
    
}).catch(error => {
    console.error('Error:', error);
});

