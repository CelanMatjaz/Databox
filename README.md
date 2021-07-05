# Databox app

To run the app, after cloning and installing all the packages, populate the example.env file and rename it to .env.

You will have to have yarn installed to run scripts, or change them to use npm run in package.json.

To install yarn: `npm i -g yarn`

Run `yarn build-and-run` to build and run the app

Each time the server starts, a new browser tab will open to prompt you to login to your github account. After logging in, you will be redirected to / where you can look up all the locally stored data.

The locally stored data is stored on in a .json file that is specified in the .env file.

To run test you need to run `yarn test` or `npm run test`. This will run all the tests and show code coverage.

If you want to run in a dev environment, you'll need to first run `yarn dev:watch`, wait for webpack to output bundles and then run `yarn dev:server`. This will however, not open a browser tab to authenticate with github. You'll need to visit the link yourself. The link is always logged in dev environment.
