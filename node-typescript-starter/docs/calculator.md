# Calculator Agent

## Configuration

```javascript
{
  id: 'calculator',
  name: 'Calculator Agent',
  description: 'Interact with calculator to perform basic arithmetic operations',
  type: 'external',
  endpoint: '[YOUR_API_ENDPOINT]',
  apiKey: 'calculator',
  oauth: [],
  variables: [],
  author: 'kalash'
}
```

## API Endpoints

### List tools

```bash
curl -X GET "[YOUR_API_ENDPOINT]/calculator/tools" \
-H "x-api-key: [YOUR_SERVER_API_KEY]" \
-H "Content-Type: application/json"
```

### Execute tool - add

```bash
curl -X POST "[YOUR_API_ENDPOINT]/calculator/tools/add" \
-H "x-api-key: [YOUR_SERVER_API_KEY]" \
-H "Content-Type: application/json" \
-d '{"a": 1, "b": 2}'
```

### Execute tool - subtract

```bash
curl -X POST "[YOUR_API_ENDPOINT]/calculator/tools/subtract" \
-H "x-api-key: [YOUR_SERVER_API_KEY]" \
-H "Content-Type: application/json" \
-d '{"a": 1, "b": 2}'
```
