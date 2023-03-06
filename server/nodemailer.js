import { createTransport } from "nodemailer";
import 'dotenv/config';

class SendAdminMail {
    constructor() {
        this.transporter = createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: process.env.ADMIN_MAIL,
                pass: process.env.ADMIN_MAIL_PASS
            }
        });

        this.mailOptions = {
            from: 'Mercado Online',
            to: process.env.ADMIN_MAIL,
        }
    }

    newRegister(userData) {
        this.mailOptions.subject = "Nuevo registro";
        this.mailOptions.html =
            `<h1>Nuevo registro</h1>
        <div style='display: flex; flex-direction: column; gap: 5px;'>
        <span>Nombre: ${userData.name}</span>
        <span>Email: ${userData.email}</span>
        <span>Edad: ${userData.age}</span>
        <span>Número de teléfono: ${userData.telephone}</span>
        </div>`;
    }

    async sendMail() {
        try {
            const info = await this.transporter.sendMail(this.mailOptions);
            console.log(info);
        } catch (error) {
            console.log(error);
        }
    }
}

export default SendAdminMail;