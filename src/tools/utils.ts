import fs from "fs";
import handlebars from "handlebars";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import path from "path";
import Config from "./config";

let mailTransporter: Mail;
export const config = new Config("emailServer", (email) => {
    mailTransporter = nodemailer.createTransport({
        auth: {
            pass: email.password,
            user: email.address
        },
        host: email.host,
        port: email.port
    });
});

export async function sendMail(recipient: string, htmlContent: string, subject: string) {
    try {
        const info = await mailTransporter.sendMail({
            from: "info@wemusyncbeta.de",
            html: htmlContent,
            subject,
            to: recipient + ""
        });
        return true;
    } catch (e) {
        return false;
    }
}

export class Templates {
    public list: { [key: string]: handlebars.TemplateDelegate } = {};

    constructor() {
        this.initialize();
        fs.watch(path.join(__dirname, "../", "../", "/templates"), this.initialize);
    }

    private initialize = () => {
        const files = fs.readdirSync(path.join(__dirname, "../", "../", "/templates"));
        this.list = {};
        files.forEach((fileName) => {
            this.openTemplate(fileName);
        });
    }

    private openTemplate = (fileName: string) => {
        const templateString: string = fs.readFileSync(
            path.join(__dirname, "../", "../", "/templates", fileName), "utf-8");
        const template = handlebars.compile(templateString);
        this.list[fileName.split(".")[0]] = template;
    }
}
