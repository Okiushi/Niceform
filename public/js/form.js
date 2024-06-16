const header = document.querySelector('header');

// on récupère le formulaire dans l'url (exmple le code se trouve comme ça: http://localhost:8081/editor?id=666dcafae0f78060b810ecc4)
const url = new URL(window.location.href);
const formId = url.searchParams.get('id');
