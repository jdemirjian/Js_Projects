const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//Show Input Error Message
function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//Show Success Outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Check Email is Valid
function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
}

//Event Listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();

if(username.value === '') {
    showError(username, 'Username is required');
} else {
    showSuccess(username);
}

if(email.value === '') {
    showError(email, 'Email is required');
} else if (!isValidEmail(email.value)) {
    showError(email, 'Email is not valid');
} else {
    showSuccess(email);
}

if(password.value === '') {
    showError(password, 'Password is required');
} else {
    showSuccess(password);
}

if(password2.value === '') {
    showError(password2, 'Password is required');
} else {
    showSuccess(password2);
}
})