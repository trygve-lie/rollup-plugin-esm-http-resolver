import esmHttpLoader from '../';
import rollup from 'rollup';
import tap from 'tap';

tap.test('plugin() - initial - should be', async (t) => {

    const options = {

        input: 'http://localhost:7400/public/js/esm/assets/js/main.js',
        plugins: [esmHttpLoader({
            timeout: 5000,
        })],
        preserveModules: true,
/*        output: {
            // file: 'geo.js',
            dir: 'geo',
            name: 'geo',
            format: 'esm'
        }
*/
    }


    const esm = await rollup.rollup(options);

    t.equal('foo', 'foo');
    t.end();
});