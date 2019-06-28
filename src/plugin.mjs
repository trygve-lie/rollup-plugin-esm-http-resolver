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

export default function esmHttpResolver({
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
        name: 'rollup-plugin-esm-http-resolver',

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

            try {
                const response = await fetch(id, fetchOptions);

                if (illegalStatus(response, ignoreStatus)) {
                    throw Error(`Server responded with http status ${response.status} for ${id}`);
                }

                if (illegalContentType(response, ignoreContentType)) {
                    throw Error(`Server responded with content type ${response.headers.get('Content-Type')} for ${id}`);
                }

                code = await response.text();
                cache.set(id, code);
            } catch (error) {
                throw error;
            }

            return { code };
        },

        buildEnd(error) {
            if (error) {
                // console.log(error)
            }
        }
    };
}
