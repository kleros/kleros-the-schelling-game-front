<p align="center">
  <b style="font-size: 32px;">the schelling game</b>
</p>

<p align="center">
  <a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="JavaScript Style Guide"></a>
  <a href="https://travis-ci.org/kleros/the-schelling-game"><img src="https://travis-ci.org/kleros/the-schelling-game.svg?branch=master" alt="Build Status"></a>
  <a href="https://david-dm.org/kleros/the-schelling-game"><img src="https://david-dm.org/kleros/the-schelling-game.svg" alt="Dependencies"></a>
  <a href="https://david-dm.org/kleros/the-schelling-game?type=dev"><img src="https://david-dm.org/kleros/the-schelling-game/dev-status.svg" alt="Dev Dependencies"></a>
  <a href="https://github.com/facebook/jest"><img src="https://img.shields.io/badge/tested_with-jest-99424f.svg" alt="Tested with Jest"></a>
  <a href="https://coveralls.io/github/kleros/the-schelling-game?branch=master"><img src="https://coveralls.io/repos/github/kleros/the-schelling-game/badge.svg?branch=master" alt="Coverage Status"></a>
  <a href="https://conventionalcommits.org"><img src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg" alt="Conventional Commits"></a>
  <a href="http://commitizen.github.io/cz-cli/"><img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg" alt="Commitizen Friendly"></a>
  <a href="https://github.com/prettier/prettier"><img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg" alt="Styled with Prettier"></a>
</p>

A boilerplate for Ethereum dapps.

## Get Started

1. Clone this repo.
2. Install and set up the [MetaMask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) chrome extension.
3. Configure MetaMask on the Kovan Test Network.
4. Run `yarn` to install dependencies and then `yarn start` to start the dev server.

## Create the both

Use bot father, create a new bot and use `/setdomain` command.

## Developement

Telegram works only with a domain on the 80 port.
To change the local domain, you can edit `/eth/hosts`.

```
# /etc/hosts
127.0.0.1	mydomain.local localhost
```

and run `create-react-app` with the `PORT=80`

```
sudo PORT=80 yarn Start
```

## Other Scripts

* `yarn run prettify` - Apply prettier to the entire project.
* `yarn run lint:scss` - Lint the entire project's .scss files.
* `yarn run lint:js` - Lint the entire project's .js files.
* `yarn run lint:scss --fix` - Fix fixable linting errors in .scss files.
* `yarn run lint:js --fix` - Fix fixable linting errors in .js files.
* `yarn run lint` - Lint the entire project's .scss and .js files.
* `yarn test` - Run the jest test suites + storyshots.
* `yarn run storybook` - Start the storybook.
* `yarn run cz` - Run commitizen.
* `yarn run build` - Create a production build.
* `yarn run build:analyze` - Analyze the production build using source-map-explorer.

## Testing

Storybook Storyshots for `components` and jest integration tests for `containers`.
