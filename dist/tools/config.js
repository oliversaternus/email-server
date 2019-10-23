"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class Config {
    constructor(title, onInit) {
        this.addresses = {};
        this.initialize = () => {
            try {
                const config = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, "../", "../", "/config.json"), "utf-8"));
                this.addresses = config.addresses;
                this.secret = config.secret;
                this.encryptionKey = config.encryptionKey;
                this.wsKey = config.wsKey;
                this.email = config.email;
                this.onInit(this.email);
                console.log(config);
            }
            catch (e) {
                console.log(e);
            }
        };
        this.server = (title) => {
            if (title === this.title) {
                return undefined;
            }
            const address = this.addresses[title];
            const home = this.addresses[this.title];
            if (address.host === home.host) {
                return "http://localhost:" + address.port;
            }
            return address.protocol + "://" + address.host;
        };
        this.onInit = () => undefined;
        this.title = title;
        if (onInit && typeof onInit === "function") {
            this.onInit = onInit;
        }
        this.initialize();
        // fs.watchFile(path.join(__dirname, "../", "../", "/config.json"), this.initialize);
    }
}
exports.default = Config;
//# sourceMappingURL=config.js.map