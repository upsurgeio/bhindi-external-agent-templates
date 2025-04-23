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
  requiresAuth: false,
  author: 'kalash'
}
```

## API Endpoints

### List tools

```bash
curl -X GET "http://localhost:3000/calculator/tools" \
-H "x-api-key: calculator" \
-H "Content-Type: application/json"
```

### Execute tool - add

```bash
curl -X POST "http://localhost:3000/calculator/tools/add" \
-H "x-api-key: calculator" \
-H "Content-Type: application/json" \
-d '{"a": 1, "b": 2}'
```

### Execute tool - subtract

```bash
curl -X POST "http://localhost:3000/calculator/tools/subtract" \
-H "x-api-key: calculator" \
-H "Content-Type: application/json" \
-d '{"a": 1, "b": 2}'
```

### Execute tool - multiply
