const nodemailer = require('nodemailer')

const sendEmail = (options) => {
    let transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : process.env.USER,
            pass :process.env.PASSWORD
        }
    })
    let mailOptions = {
        from : process.env.EMAIL,
        to : options.to,
        subject : options.subject,
        html : options.text
    }
    transporter.sendMail(mailOptions,function(err, res){ 
        if(err) {
            console.log(err)
        }
        else{
            console.log(info)
        }
    })
}
module.exports = sendEmail