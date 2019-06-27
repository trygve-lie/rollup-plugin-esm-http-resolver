import esmHttpLoader from '../src/plugin';
import HttpServer from '../utils/HttpServer';
import rollup from 'rollup';
import path from 'path';
import url from 'url';
import tap from 'tap';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

tap.test('plugin() - initial - should be', async (t) => {
    const server = new HttpServer({ wwwroot: `${__dirname}/../utils/modules/simple`});
    const address = await server.listen();

    const options = {
        input: `${address}/assets/main.js`,
        plugins: [esmHttpLoader()],
    }

    const esm = await rollup.rollup(options);

    t.equal(esm.cache.modules.length, 5);

    await server.close();
    t.end();
});
