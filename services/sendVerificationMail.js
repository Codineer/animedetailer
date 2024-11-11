import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',

    auth: {
        user: "devirakhi294@gmail.com",
        pass: "@utkarsh2005"
    }
});
// console.log(process.env.MAIL, process.env.MAIL_PASS);

export const sendVerificationMail = async (email, token) => {
    const verificationUrl = "/verify-email/326"
    const output = await transporter.sendMail({
        from: "devirakhi294@gmail.com",
        to: email,
        subject: 'Verify Your Email',
        html: `<p>Please verify your email by clicking on the link below:</p><a href="${verificationUrl}">${verificationUrl}/${token}</a>`
    });
    return output

}