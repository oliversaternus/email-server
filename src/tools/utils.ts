import fs from "fs";
import handlebars from "handlebars";
import nodemailer from "nodemailer";
import path from "path";

const config: any = JSON.parse(fs.readFileSync(path.join(__dirname, "../", "../", "/config.json"), "utf-8"));

const mailTransporter = nodemailer.createTransport({
    ...config
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
