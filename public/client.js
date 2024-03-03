const $ = (name) => document.querySelector(name);
const $$ = (name) => document.querySelectorAll(name);

function removeCookie(cookieName) {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

function logOut() {
    removeCookie('token');
    window.location.href = '/';
}