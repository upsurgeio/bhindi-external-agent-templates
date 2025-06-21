# Twitter Agent

## Configuration

```javascript
{
  id: 'twitter',
  name: 'Twitter Agent',
  description: 'Interact with Twitter API to send tweets, get user information, and more',
  type: 'external',
  endpoint: '[YOUR_API_ENDPOINT]',
  apiKey: 'twitter',
  oauth: ['twitter'],
  variables: [],
  author: 'kalash'
}
```

## API Endpoints

### List tools

```bash
curl -X GET "[YOUR_API_ENDPOINT]/twitter/tools" \
-H "x-api-key: [YOUR_SERVER_API_KEY]" \
-H "Content-Type: application/json"
```

### Execute tool - tweet

```bash
curl -X POST "[YOUR_API_ENDPOINT]/twitter/tools/tweet" \
-H "x-api-key: [YOUR_SERVER_API_KEY]" \
-H "x-twitter-token: test-token" \
-H "Content-Type: application/json" \
-d '{"content": "Hello, world!"}'
```
