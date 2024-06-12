if (!localStorage.getItem('token')) {
    localStorage.setItem('redirectUrl', window.location.href);
    window.location.href = '/login';
}
