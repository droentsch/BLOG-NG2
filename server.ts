import * as express from 'express';
import * as http from 'http';
import * as path from 'path';

const PORT = 4452;

export class Application {
    public app: express.Application;
    private server: http.Server;
    private staticPath: string;

    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
    }
    public boot() {
        this.createServer();
    }
    public createServer(): void {
        try {
            this.setRouting();
            this.setServer();
        } catch (e) {
            console.error(`Error creating server: ${e}`);
        }
    }
    private setRouting(): void {
        this.setMiddleware();
        this.setDefault();
    }
    private setServer(): void {
        this.server.listen(PORT, () => {
            console.log(`blog-ng2 server listening on port ${PORT}`);
        });
    }
    private setMiddleware(): void {
        this.staticPath = path.join(__dirname, './prod');
        this.app.use('/', express.static(this.staticPath));
        console.log(`looking for path ${this.staticPath}`);
    }
    private setDefault() {
        this.app.get('/', (req, res) => {
            res.sendFile(`${this.staticPath}/default.html`);
        });
    }
}

if (require.main === module) {
    const main = new Application();
    main.boot();
}
