// Form validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm()) {
            // Form is valid, submit it
            submitForm();
        }
    });

    function validateForm() {
        let isValid = true;

        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Name is required');
            isValid = false;
        } else {
            showSuccess(nameInput);
        }

        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        } else {
            showSuccess(emailInput);
        }

        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Message is required');
            isValid = false;
        } else {
            showSuccess(messageInput);
        }

        return isValid;
    }

    function showError(input, message) {
        const formControl = input.parentElement;
        formControl.classList.remove('success');
        formControl.classList.add('error');
        const errorMessage = formControl.querySelector('small');
        errorMessage.textContent = message;
    }

    function showSuccess(input) {
        const formControl = input.parentElement;
        formControl.classList.remove('error');
        formControl.classList.add('success');
    }

    function isValidEmail(email) {
        // Regular expression for email validation
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function submitForm() {
        const formData = new FormData(form);
        fetch('http://localhost:3000/submit-form', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                alert('Form submitted successfully!');
                form.reset();
            } else {
                throw new Error('Failed to submit form');
            }
        })
        .catch(error => {
            console.error('Error submitting form:', error);
            alert('Failed to submit form. Please try again later.');
        });
    }
});
