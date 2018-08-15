# Clone Instructions

Clone or download Repo:

```shell
git clone https://github.com/claytercek/spotify.git
```

Tell git to ignore your local:

```shell
git update-index --assume-unchanged src/config/auth.js
```

Change dummy content in src/config/auth.js to your actual spotify client credentials:

```js
module.exports = {
	CLIENT_ID: "<CLIENT ID>",
	CLIENT_SECRET: "<CLIENT SECRET>"
};
```

# How to run

enter any of the following commands from root:

```shell
#build and start production server
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
