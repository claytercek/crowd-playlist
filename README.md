# Clone Instructions

Clone or download Repo:

```shell
git clone https://github.com/claytercek/spotify.git
```

Copy .env to .env.local and replace dummy content with your content.

> Note: your callback url should be "< your host url >/auth/callback"

> To run locally, callback should be ste equal to "http://localhost:3001/auth/callback"

```shell
CLIENT_ID="<YOUR CLIENT ID>"
CLIENT_SECRET="<YOUR CLIENT SECRET>"
CALLBACK="<CALLBACK URL>"
```

In order to run the two development servers properly, you must disable CORS on your browser of choice.
Can be done with a plugin in chrome or firefox.

# How to run

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
