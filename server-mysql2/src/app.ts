import { Server } from './server';
import dotenv from 'dotenv';

dotenv.config();

function main() {
    const port = Number(process.env.PORT) || 3000;
    const server = new Server({ port });
    server.start();
}

main();