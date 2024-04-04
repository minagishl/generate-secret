import { Hono } from 'hono';

const app = new Hono();
const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';

const generateSecret = (length: number) =>
	Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join('');

app.get('/', (c) => {
	return c.redirect('/32', 301);
});

app.get('/:length', (c) => {
	const length = Number(c.req.param('length'));
	const secret = generateSecret(length);
	return c.text(secret);
});

export default app;
