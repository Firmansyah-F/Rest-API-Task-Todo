const nodemailer = require('nodemailer');
const TaskController = require('./../../controller/taskController')



const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "de8e13c5a79801",
      pass: "0d3c30b591df9b"
    }
  });

const mailOptions = {
    from: 'sutanfikri26@gmail.com',
    to: 'fikrifirmansyah096@gmail.com',
    subject: 'Sending Email using Nodejs',
    text: 'That was easy!'
};

transport.sendMail(mailOptions, (err, info) => {
    if (err) throw err;
    console.log('Email sent: ' + info.response);
});