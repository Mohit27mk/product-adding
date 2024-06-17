const nodemailer = require('nodemailer');

// Configure the transporter with your email service settings
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'koolwalmohit273@gmail.com',
        pass: 'bgkx rmdm lemp xxgl',
    },
});

// Function to send email
const sendCheckoutEmail = (to, subject, text) => {
    const mailOptions = {
        from: 'koolwalmohit273@gmail.com',
        to,
        subject,
        text,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendCheckoutEmail;
