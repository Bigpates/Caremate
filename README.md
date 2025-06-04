# Care Mate

Care Mate is a simple front-end prototype for an AI-powered assistant that helps participants in the Australian National Disability Insurance Scheme (NDIS). The app provides information, goal tracking, document creation tools and integrates with Stripe for subscription payments.

## Local Development

This project contains only static files. To view the site locally you need to serve `index.html` using a basic HTTP server. You can use Python's built in server:

```bash
python3 -m http.server 8000
```

Then navigate to `http://localhost:8000` in your browser.

### Environment variables

Stripe requires a public API key for the checkout flow. Set the following environment variable before running the server:

```bash
export STRIPE_PUBLIC_KEY=pk_test_your_key_here
```

Update `assets/js/payment.js` to read this variable or replace the placeholder key in the file.

## Folder Structure

After moving assets the repository is organised as follows:

```
Caremate/
├── index.html
└── assets/
    ├── css/
    │   ├── components.css
    │   ├── main.css
    │   ├── responsive.css
    │   └── variables.css
    ├── images/
    │   ├── favicon.ico
    │   └── logo.png
    └── js/
        ├── chat.js
        ├── main.js
        └── payment.js
```

All images, stylesheets and scripts now live under the `assets/` directory. Reference them with `assets/css/...`, `assets/js/...` and `assets/images/...` paths as shown in `index.html`.
