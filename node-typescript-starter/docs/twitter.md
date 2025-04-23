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
  requiresAuth: true,
  author: 'kalash'
}
```

## API Endpoints

### List tools

```bash
curl -X GET "http://localhost:3000/twitter/tools" \
-H "x-api-key: twitter" \
-H "Content-Type: application/json"
```

### Execute tool - tweet

```bash
curl -X POST "http://localhost:3000/twitter/tools/tweet" \
-H "x-api-key: test-api-key" \
-H "Authorization: Bearer test-token" \
-H "Content-Type: application/json" \
-d '{"content": "Hello, world!"}'
```
