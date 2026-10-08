import express, { Router } from "express";
import cors from "cors"; 
import routes from "./routes/index";

interface ServerOptions {
    port: number;
}

export class Server {
    private readonly port: number;
    private readonly app: express.Application;

    constructor(options: ServerOptions) {
        this.port = options.port;
        this.app = express();

        this.app.use(cors()); 
        this.app.use(express.json());
        
        // Prefijo global /api -> Resultado: /api/v1/products/...
        this.app.use('/api', routes);
    }

    public start() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port: ${this.port}`);
        });
    }
}