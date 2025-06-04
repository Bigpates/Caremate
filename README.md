# Care Mate

Care Mate is a lightweight front-end prototype for an AI-powered assistant that helps NDIS participants manage their plans, track goals and generate useful documents. The app also integrates with Stripe for subscription payments.

## Local Development

These files are static so you need a small web server when developing locally. The simplest option is Python's built in server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

If you have Node installed you can alternatively run the development server defined in `package.json`:

```bash
npm install
npm run start
```

### Linting and formatting

Run ESLint and Prettier to check code style:

```bash
npm run lint
npm run format
```

### Stripe configuration

`payment.js` looks for the Stripe public key on `window.STRIPE_PUBLIC_KEY`.
Define this variable before including the script. An easy way is to insert the key directly in your HTML:

```html
<script>window.STRIPE_PUBLIC_KEY = 'pk_test_your_key_here';</script>
<script src="payment.js"></script>
```

To keep the key out of source control you can generate a config file at build time:

```bash
echo "window.STRIPE_PUBLIC_KEY='${STRIPE_PUBLIC_KEY}'" > stripe-config.js
```

Include `stripe-config.js` before `payment.js` in `index.html`.

## Folder Structure

The project is organised as follows:

```
Caremate/
├── index.html
├── chat.js
├── main.js
├── payment.js
├── components.css
├── main.css
├── responsive.css
├── variables.css
├── favicon.ico
└── logo.png
```


All images, stylesheets and scripts live in the repository root. Reference them directly from `index.html`.

## Deployment

This project includes a GitHub Actions workflow that deploys the site to GitHub Pages. On every push to the `main` branch the workflow installs dependencies, runs linting and formatting checks, and publishes the current files.

## License

This project is licensed under the ISC License.
