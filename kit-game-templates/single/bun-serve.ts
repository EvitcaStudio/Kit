import chalk from 'chalk';
import { logMessage } from './bun-build.ts';

const server = Bun.serve({
  port: 8090,
  fetch(req) {
    const path = new URL(req.url).pathname;
    // Default to index.html if the user hits the root URL
    const target = path === "/" ? "/index.html" : path;
    
    return new Response(Bun.file(`./dist${target}`));
  },
});

process.on('SIGINT', () => {
    logMessage('info', 'Shutting down server...');
    server.stop();
    process.exit(0);
});

process.on('SIGTERM', () => {
    logMessage('info', 'Shutting down server...');
    server.stop();
    process.exit(0);
});

logMessage('info', `Ready to play at http://localhost:8090`);