# crowd – collaborative spotify playlists in real time

This website allows users to create "rooms" that connect to their spotify account, allowing other users to connect to the same room and add songs to a queue, and vote on those songs to potentially change the order.

This is a project I designed and developed with the intention of learning Node, react and redux. Using the spotify api, this webapp takes control of the users currently active spotify player.

I learned a lot from looking at [José M. Pérez's c repo](https://github.com/JMPerez/c "c - JMPerez"), which does the same task on a slightly smaller scale.

## Setting up

Clone or download Repo:

```shell
git clone https://github.com/claytercek/spotify.git
```

Copy .env to .env.local and replace dummy content with your content.

> Note: your callback url should be "< your host url >/auth/callback"

> To run locally, callback should be set equal to "http://localhost:3001/auth/callback"

```shell
CLIENT_ID="<YOUR CLIENT ID>"
CLIENT_SECRET="<YOUR CLIENT SECRET>"
CALLBACK="<CALLBACK URL>"
```

install dependencies

```shell
yarn install
#or
npm install
```

In order to run the two development servers properly, you must disable CORS on your browser of choice.
Can be done with a plugin in chrome or firefox.

## How to run

enter any of the following commands from root:

```shell
#start production server
yarn start

#start dev server
yarn server

#start client dev server
yarn client

#start both dev servers
yarn dev

#build client
yarn build
```

> you can substitute "yarn" with "npm run" here
