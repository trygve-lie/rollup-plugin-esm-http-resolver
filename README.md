# rollup-plugin-esm-http-resolver

Rollup plugin for resolving ES modules over http(s).

[![Dependencies](https://img.shields.io/david/trygve-lie/rollup-plugin-esm-http-resolver.svg?style=flat-square)](https://david-dm.org/trygve-lie/rollup-plugin-esm-http-resolver)
[![Build Status](http://img.shields.io/travis/trygve-lie/rollup-plugin-esm-http-resolver/master.svg?style=flat-square)](https://travis-ci.org/trygve-lie/rollup-plugin-esm-http-resolver)
[![Known Vulnerabilities](https://snyk.io/test/github/trygve-lie/rollup-plugin-esm-http-resolver/badge.svg?targetFile=package.json&style=flat-square)](https://snyk.io/test/github/trygve-lie/rollup-plugin-esm-http-resolver?targetFile=package.json)

## Installation

```bash
$ npm install rollup-plugin-esm-http-resolver
```

## Usage

```js
import esmHttpResolver from 'rollup-plugin-esm-http-resolver';

export default {
    input: 'http://localhost:9000/assets/main.js',
    plugins: [esmHttpResolver({
        timeout: 5000,
    })],
    output: {
        file: 'build.js',
        format: 'cjs'
    }
};
```

## Description

This module can resolve ES modules from a http endpoint. It will more or less
load ES modules the same way as a browser will resolve them.

Lest say one have the following structure of ES modules on a http server:

```sh
/assets/utils/parse.js
/assets/modules/module-a.js
/assets/modules/module-b.js
/assets/main.js
```

Both `modules/module-a.js` and `modules/module-b.js` imports `utils/parse.js`
and `/assets/main.js` is the main file importing `modules/module-a.js` and
`modules/module-b.js`.

One can now simply make a bundle out of these by passing the URL to
the main file (`http://cdn.mysite.com/assets/main.js`) to Rollups
`input` property.

This module will then resolve the relative imports and request each module
from the http server.

This module will only load ES modules.

### Caching

In the above example both `modules/module-a.js` and `modules/module-b.js`
imports `utils/parse.js`. This module will cache the first request to
`utils/parse.js` when its resolve in `modules/module-a.js` and when
`modules/module-b.js` resolves it, it will be read from cache.

## Options

This plugin take the following options:

| option             | default  | type      | required | details                                                                                                  |
| ------------------ | -------- | --------- | -------- | -------------------------------------------------------------------------------------------------------- |
| ignoreContentType  | `false`  | `boolean` | `false`  | Ignore checking content type of each requested file.                                                     |
| ignoreStatus       | `false`  | `boolean` | `false`  | Ignore checking the http status code of each requested file. If false, only http status 200 is loaded.   |
| timeout            | `10000`  | `number`  | `false`  | How long, in millisecondsm before a request to a file should be canceled if the server does not respond. |
| follow             | `10`     | `number`  | `false`  | How many redirects jumps a request to a file should follow before canceling the request.                 |


## License

Copyright (c) 2019 Trygve Lie

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
