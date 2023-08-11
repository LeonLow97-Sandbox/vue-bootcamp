# API Testing

### `mockResolvedValue`

- `mockResolvedValue` is a method used to mock asynchronous functions like those returned by Axios.
- It simulates the behavior of a Promise resolved with a specific value when a function is called.
- Useful when you want to mock the behavior of asynchronous operations like network requests.

```js
import axios from 'axios';

import getJobs from '@/api/getJobs';

vi.mock('axios'); // mock axios

beforeEach(() => {
  axios.get.mockResolvedValue({
    data: [
      {
        id: 1,
        title: 'Java Software Developer',
      },
    ],
  });
});
```
