const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// POST route for handling form submission
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Configure transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your_email@gmail.com', // Your Gmail email address
            pass: 'your_password' // Your Gmail password
        }
    });

    // Email content
    const mailOptions = {
        from: 'your_email@gmail.com',
        to: 'your_email@gmail.com', // Your email address
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
