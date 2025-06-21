# Redis Agent

## Server API Key

The server API key is the key that is used to authenticate the requests to the server.
It is set in the `.env` file.

## Configuration

```javascript
{
  id: 'redis',
  name: 'Redis Agent',
  description: 'Interact with Redis to perform CRUD operations',
  type: 'external',
  endpoint: '[YOUR_API_ENDPOINT]',
  apiKey: 'redis',
  oauth: [],
  variables: ['redis-host', 'redis-port', 'redis-password'],
  author: 'kalash'
}
```

## API Endpoints

### List tools

```bash
curl -X GET "[YOUR_API_ENDPOINT]/redis/tools" \
-H "x-api-key: [YOUR_SERVER_API_KEY]" \
-H "Content-Type: application/json"
```

### Execute tool - get

```bash
curl -X POST "[YOUR_API_ENDPOINT]/redis/tools/get" \
-H "x-api-key: [YOUR_SERVER_API_KEY]" \
-H "Content-Type: application/json" \
-H "x-redis-host: localhost" \
-H "x-redis-port: 6379" \
-H "x-redis-password: mypassword" \
-d '{"key": "mykey"}'
```

### Execute tool - set

```bash
curl -X POST "[YOUR_API_ENDPOINT]/redis/tools/set" \
-H "x-api-key: [YOUR_SERVER_API_KEY]" \
-H "Content-Type: application/json" \
-H "x-redis-host: localhost" \
-H "x-redis-port: 6379" \
-H "x-redis-password: mypassword" \
-d '{"key": "mykey", "value": "myvalue"}'
```
