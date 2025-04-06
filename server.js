const express = require('express');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config({path:"./.env"});
const app = express();
const port = 3000;


// Body parser middleware für JSON
app.use(bodyParser.json());
app.use(cors());

console.log(process.env.EMAIL_USER);

app.post('/submitForm', async (req, res) => {
    const { name, email, message } = req.body;

    //Check if all fields are filled
    if (!name || !email || !message) {
        return res.json({
            success: false,
            error: "All  fields are required"
        });
    }

    // NodeMailer Setup for the Transporter Email Account that will send the Email
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Email Adress from which the email will be sent
            pass: process.env.EMAIL_PASS, // Password from the email address
        }
    });

    // Email Options
    const mailOptions = {
        from: process.env.EMAIL_USER,  // Transporter Email
        to: process.env.EMAIL_USER, // Recipient of the email (Cosmotaics)
        subject: `Cosmotaics Website - Message from ${name}`,
        text: `${message}\n\n\nThis message was sent on the Cosmotaics Website by ${name} with the email address ${email}`
    };

    try {
        // sending E-Mail
        await transporter.sendMail(mailOptions);
        res.json({ success: true, error: "Email gesendet" });
    } catch (error) {
        res.json({ success: false, error: "Error sending email" });
    }

});

// Server starten
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);

});
