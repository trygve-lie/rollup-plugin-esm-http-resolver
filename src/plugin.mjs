import fetch from 'node-fetch';
import { URL } from 'url';

const MIME_TYPES = new Set([
    'application/javascript',
    'text/javascript',
]);

const illegalContentType = (response, ignore) => {
    if (ignore) return false;
    const contentType = response.headers.get('Content-Type');
    const type = contentType.split(';')[0];
    return !MIME_TYPES.has(type);
}

const illegalStatus = (response, ignore) => {
    if (ignore) return false;
    return response.status !== 200;
}

const urlIsRelative = url => url.substr(0, 4) !== 'http';

export default function esmHttpLoader({
    ignoreContentType = false,
    ignoreStatus = false,
    timeout = 10000,
    follow = 10,
} = {}) {
    const cache = new Map();
    const fetchOptions = {
        timeout,
        follow,
    };

    return {
        name: 'rollup-plugin-esm-http-loader',

        buildStart(options) {
            if (urlIsRelative(options.input)) throw Error('Value to the input option is not an absolute URL');
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
            if (code) return { code };

            const response = await fetch(id, fetchOptions);

            if (illegalStatus(response, ignoreStatus)) {
                // Do some error handling
                console.log('valid status')
            }

            if (illegalContentType(response, ignoreContentType)) {
                // Do some error handling
                console.log('valid content type')
            }

            code = await response.text();
            cache.set(id, code);

            return { code };
        },

        buildEnd(error) {
            if (error) {
                // console.log(error)
            }
        }
    };
}
