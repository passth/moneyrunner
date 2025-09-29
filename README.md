## Moneyrunner
Moneyrunner is a demo application to showcase Passthrough's API integration.


### Getting started

1. Go to localhost:8000 Django admin and set "Public API enabled" to yes for
the organization you want to test with.

2. Go to the Organization settings page and "Add API Key".
    1. No need to check "Enable webhooks" when adding the API key.

```bash
cd ~/passthrough/moneyrunner
# Remember to replace PASSTHROUGH_API_KEY
cp .env.example .env
```

Set up symlinks so local changes to `frontend/sdk` are reflected in moneyrunner.

```bash
# Unclear if this symlink does anything
ln -s ~/passthrough/frontend/sdk/dist ~/passthrough/moneyrunner/backend/public/sdk
# This symlink seems to be required
ln -s ~/passthrough/frontend/sdk/dist ~/passthrough/moneyrunner/dist/backend/public/sdk
```

```bash
# Build the uikit
cd ~/passthrough/uikit
npm run prod
# Build the sdk
cd ~/passthrough/frontend
npm run sdk
```

```bash
# Install the dependencies
> npm install

# Build frontend and backend files
> npm run build

# Run server
> npm run server
```

### Deploying
Any commit merged to main will be automatically deployed.

### License

Moneyrunner is licensed under the license stated in the [LICENSE](LICENSE) file.
