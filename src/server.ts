import bodyParser from "body-parser";
import express from "express";
import { createServer } from "http";
import * as utils from "./tools/utils";

const app: express.Application = express();
app.use(bodyParser.json());

const templates = new utils.Templates();

console.log(templates.list);

app.post("/send", async (req, res) => {
    try {
        const { template, content, recipient, subject } = req.body;
        const mail = templates.list[template](content);
        console.log(mail);
        const success = await utils.sendMail(recipient, mail, subject);
        res.sendStatus(success ? 200 : 500);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

app.use((err: any, req: any, res: any, next: any) => {
    res.status(Number(err.message) || 500);
    res.send();
});

const server = createServer(app);
server.listen(8787, () => {
    console.log(`server started at http://localhost:8787`);
});
