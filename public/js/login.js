const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-input').value.trim();
    const password = document.querySelector('#password-input').value.trim();

    if (email && password) {
        const response = await fetch('/api/login', { 
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/'); 
        } else {
            alert('Could not log in. Please try again.');
        }
    }
};

document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);