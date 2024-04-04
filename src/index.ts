import { Hono } from 'hono';
import { customAlphabet } from 'nanoid';

const app = new Hono();
const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
const nanoid = customAlphabet(characters, 10);

app.get('/', (c) => {
	return c.redirect('/32', 301);
});

app.get('/:length', (c) => {
	const length = Number(c.req.param('length'));
	const secret = nanoid(length);
	return c.text(secret);
});

export default app;
