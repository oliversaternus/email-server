"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const handlebars_1 = __importDefault(require("handlebars"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("./config"));
let mailTransporter;
exports.config = new config_1.default("emailServer", (email) => {
    mailTransporter = nodemailer_1.default.createTransport({
        auth: {
            pass: email.password,
            user: email.address
        },
        host: email.host,
        port: email.port
    });
});
function sendMail(recipient, htmlContent, subject) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const info = yield mailTransporter.sendMail({
                from: "info@wemusyncbeta.de",
                html: htmlContent,
                subject,
                to: recipient + ""
            });
            return true;
        }
        catch (e) {
            return false;
        }
    });
}
exports.sendMail = sendMail;
class Templates {
    constructor() {
        this.list = {};
        this.initialize = () => {
            const files = fs_1.default.readdirSync(path_1.default.join(__dirname, "../", "../", "/templates"));
            this.list = {};
            files.forEach((fileName) => {
                this.openTemplate(fileName);
            });
        };
        this.openTemplate = (fileName) => {
            const templateString = fs_1.default.readFileSync(path_1.default.join(__dirname, "../", "../", "/templates", fileName), "utf-8");
            const template = handlebars_1.default.compile(templateString);
            this.list[fileName.split(".")[0]] = template;
        };
        this.initialize();
        fs_1.default.watch(path_1.default.join(__dirname, "../", "../", "/templates"), this.initialize);
    }
}
exports.Templates = Templates;
//# sourceMappingURL=utils.js.map