Feature             Tool Used           Purpose
CRUD Testing        Supertest           Simulates HTTP requests
Auth Testing        JWT + Jest          Verifies protected route access
Setup/Teardown      beforeAll           Prepares login token
Assertions          Jest Matchers       Validates response and status codes
Schema validations  jest-json-schema    validate json schemas

Dependencies: pls refer package.json

Execute tests:  npx jest crud.test.js
