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

### Environment variables

Stripe requires a public API key for the checkout flow. Set the variable before running the server:

```bash
export STRIPE_PUBLIC_KEY=pk_test_your_key_here
```

Update `payment.js` to read this value or replace the placeholder key in the file.

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

## License

This project is licensed under the ISC License.
