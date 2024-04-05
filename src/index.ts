import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';

const app = new Hono();

app.get('/', (c) => {
	return c.redirect('/32', 301);
});

app.get('/:length', (c) => {
	const length = Number(c.req.param('length'));
	if (!length) {
		throw new HTTPException(401, { message: 'Invalid length.' });
	}

	const array = new Uint8Array(Math.ceil(length / 2));
	crypto.getRandomValues(array);
	const randomString = Array.from(array)
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('')
		.slice(0, length);
	return c.text(randomString);
});

export default app;
