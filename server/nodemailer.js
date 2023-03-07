import { createTransport } from "nodemailer";
import 'dotenv/config';
//Winston
import logger from "./loggers.js";

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

    newPurchase(userData, products) {
        this.mailOptions.subject = `Nuevo pedido de ${userData.name} ${userData.email}`;
        this.mailOptions.html = this.generateHtmlProducts(products);
    }

    generateHtmlProducts(products) {
        let html = "<h2>Productos</h2>";
        for (let i = 0; i < products.length; i++) {
            html += `<span>${products[i].name}</span><br/>`;
        };
        return html;
    }

    async sendMail() {
        try {
            const info = await this.transporter.sendMail(this.mailOptions);
            logger.info(info);
        } catch (error) {
            logger.error(error);
        }
    }
}

export default SendAdminMail;