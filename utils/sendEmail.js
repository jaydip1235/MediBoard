const nodemailer = require('nodemailer')

const sendEmail = (options) => {
    let transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : 'noreply.mediboard@gmail.com',
            pass : 'Mediboard@j$a98'
        }
    })

    let mainOptions = {
        from : 'noreply.mediboard@gmail.com',
        to : options.to,
        subject : options.subject,
        html : options.text
    }

    transporter.sendMail(mainOptions,function(err, res){ 
        if(err) {
            console.log(err)
        }
        else{
            console.log(info)
        }
    })
}

module.exports = sendEmail