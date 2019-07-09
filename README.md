# Simple Comments NodeJS API

This is a simple NodeJS project for comments feature using redis as database.

##Features

- ES6/ES7 style
- Express
- Cheerio
- Redis caching
- Search/Autocomplete
- Eslint rules
- esm
- Export/Import style

**Clone the Repo**
```
git clone https://github.com/ramki2486/comments
```

## Download Redis

Install Redis & Start Redis Server
```
wget http://download.redis.io/releases/redis-5.0.5.tar.gz
tar xzf redis-5.0.5.tar.gz
cd redis-5.0.5
make
src/redis-server

```

## Installing Dependencies

Go to cloned working directory and run

```
npm install
```

## Development

```
npm run dev
```

## Production

For Running the project in production mode

```
npm run start
```

## Routes/API's
```
http://localhost:3002/<login|signup>
```

| QueryParams  | dataType |
|--------------|----------|
| username | string   |
| password        | string   |

```
http://localhost:3002/comments

GET: get all comments
POST: post a comment with authorization token
```

| QueryParams  | dataType |
|--------------|----------|
| comment | string   |

```
http://localhost:3002/comments/vote

POST: post a vote with id, up or down along authorization token
```

| QueryParams  | dataType |
|--------------|----------|
| id | integer   |
| up or down        | integer   |


## Documented

 - By Rama Kishore
