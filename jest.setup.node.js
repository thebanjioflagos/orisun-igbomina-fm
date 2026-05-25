/* eslint-disable @typescript-eslint/no-require-imports */
// jest.setup.node.js — polyfills for Node test environment
// Set required environment variables BEFORE any module imports
// (lib/env.ts runs Zod validation at module load time)
process.env.NEXTAUTH_URL    = process.env.NEXTAUTH_URL    ?? 'http://localhost:3000';
process.env.NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET ?? 'test-secret-minimum-32-characters-ok!';
process.env.DATABASE_URL    = process.env.DATABASE_URL    ?? 'postgresql://postgres:postgres@localhost:5432/orisun';

const { TextEncoder, TextDecoder } = require('util');
const { ReadableStream, WritableStream, TransformStream } = require('stream/web');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.ReadableStream = ReadableStream;
global.WritableStream = WritableStream;
global.TransformStream = TransformStream;

// Expose undici globals — same as what Next.js injects at runtime
const { fetch, Request, Response, Headers, FormData } = require('undici');
global.fetch    = global.fetch    ?? fetch;
global.Request  = global.Request  ?? Request;
global.Response = global.Response ?? Response;
global.Headers  = global.Headers  ?? Headers;
global.FormData = global.FormData ?? FormData;
