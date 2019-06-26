import HttpServer from '../utils/HttpServer';
import path from 'path';
import url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const start = async () => {
    const server = new HttpServer({ wwwroot: `${__dirname}/public`});
    const addr = await server.listen(9000);
    console.log('HttpServer is running at:', addr);
};

start();
