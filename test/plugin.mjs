import esmHttpResolver from '../src/plugin';
import HttpServer from '../utils/HttpServer';
import rollup from 'rollup';
import path from 'path';
import url from 'url';
import tap from 'tap';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

tap.test('plugin() - input an absolute URL - should resolve all files', async (t) => {
    const server = new HttpServer({ wwwroot: `${__dirname}/../utils/modules/simple`});
    const address = await server.listen();

    const options = {
        input: `${address}/assets/main.js`,
        plugins: [esmHttpResolver()],
    }

    const esm = await rollup.rollup(options);

    t.equal(esm.cache.modules.length, 5);

    await server.close();
    t.end();
});

tap.test('plugin() - input is not an absolute URL - should reject process', (t) => {
    const options = {
        input: '/not/a/url',
        plugins: [esmHttpResolver()],
    }
    t.rejects(rollup.rollup(options), new Error('Value to the input option is not an absolute URL'));
    t.end();
});

tap.test('plugin() - destination server does not exist - should reject process', (t) => {
    const options = {
        input: 'http://localhost:9999/assets/main.js',
        plugins: [esmHttpResolver()],
    }
    t.rejects(rollup.rollup(options), new Error('Could not load http://localhost:9999/assets/main.js: request to http://localhost:9999/assets/main.js failed, reason: connect ECONNREFUSED 127.0.0.1:9999'));
    t.end();
});
