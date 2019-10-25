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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const utils = __importStar(require("./tools/utils"));
const app = express_1.default();
app.use(body_parser_1.default.json());
const templates = new utils.Templates();
console.log(templates.list);
app.post("/send", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { template, content, recipient, subject } = req.body;
        const mail = templates.list[template](content);
        const success = yield utils.sendMail(recipient, mail, subject);
        res.sendStatus(success ? 200 : 500);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}));
app.use((err, req, res, next) => {
    res.status(Number(err.message) || 500);
    res.send();
});
const server = http_1.createServer(app);
server.listen(8787, () => {
    console.log(`server started at http://localhost:8787`);
});
//# sourceMappingURL=server.js.map