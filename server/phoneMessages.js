import twilio from "twilio";
import 'dotenv/config';
//Winston
import logger from "./loggers.js";

class PhoneMessagesServices {
    constructor() {
        this.client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
    }

    async SendClientMessage(clientNumber) {
        try {
            const message = await this.client.messages.create({
                body: "Su pedido se a recibido y se encuentra en proceso",
                from: process.env.TWILIO_PHONE_NUMBER,
                to: clientNumber
            });
            logger.info(message);
        } catch (error) {
            logger.error(error);
        }
    }

    async SendAdminWhatsapp(clientData) {
        try {
            const message = await this.client.messages.create({
                body: `Nuevo pedido de ${clientData.name} ${clientData.email}`,
                from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
                to: `whatsapp:${process.env.ADMIN_PHONE_NUMBER}`
            });
            logger.info(message);
        } catch (error) {
            logger.error(error);
        }
    }
}

export default PhoneMessagesServices;