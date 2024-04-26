document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        sendEmail();
    });

    function sendEmail() {
        const formData = new FormData(form);
        fetch('/send-email', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                alert('Your message has been sent successfully!');
                form.reset();
            } else {
                throw new Error('Failed to send message');
            }
        })
        .catch(error => {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again later.');
        });
    }
});
