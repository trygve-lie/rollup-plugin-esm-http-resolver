# rollup-plugin-esm-http-loader

Rollup plugin for loading ES modules over http

[![Dependencies](https://img.shields.io/david/trygve-lie/rollup-plugin-esm-http-loader.svg?style=flat-square)](https://david-dm.org/trygve-lie/rollup-plugin-esm-http-loader)
[![Build Status](http://img.shields.io/travis/trygve-lie/rollup-plugin-esm-http-loader/master.svg?style=flat-square)](https://travis-ci.org/trygve-lie/rollup-plugin-esm-http-loader)
[![Known Vulnerabilities](https://snyk.io/test/github/trygve-lie/rollup-plugin-esm-http-loader/badge.svg?targetFile=package.json&style=flat-square)](https://snyk.io/test/github/trygve-lie/rollup-plugin-esm-http-loader?targetFile=package.json)

## Installation

```bash
$ npm install rollup-plugin-esm-http-loader
```

## Example

```js
import esmHttpLoader from 'rollup-plugin-esm-http-loader';

export default {
    input: 'http://localhost:7400/public/js/main.js',
    plugins: [esmHttpLoader({
        timeout: 5000,
    })],
    output: {
        file: 'build.js',
        format: 'cjs'
    }
};
```


## Description

Loads ES modules over http(s).
