import fetch from 'node-fetch';
import { URL } from 'url';

export default function esmHttpLoader ( { timeout = 10000 } = {} ) {
    const cache = new Map();
    const fetchOptions = {
        timeout,
    };

    return {
        name: 'rollup-plugin-esm-http-loader',

        buildStart(options) {
        // console.log(options)
        },

        resolveId(importee, importer) {
            if (importer) {
                return new URL(importee, importer).href;
            } else {
                return new URL('', importee).href;
            }
        },

        async load(id) {
            let code = cache.get(id);
            if (code) {
                return { code };
            }

            const response = await fetch(id, fetchOptions);

            if (response.status !== 200) {
                // Do some error handling
            }

            if (response.headers.get('Content-Type') !== 'application/javascript; charset=UTF-8') {
                // Do some error handling
            }

            code = await response.text();
            cache.set(id, code);

            return { code };
        },

        buildEnd(error) {
            if (error) {
                console.log(error)
            }
        }
    };
}
