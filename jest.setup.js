/* eslint-disable @typescript-eslint/no-require-imports */
// jest.setup.js — polyfills for jsdom (browser/UI) test environment
const { TextEncoder, TextDecoder } = require('util');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
