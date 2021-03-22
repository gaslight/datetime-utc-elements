## datetime-utc-elements

1. Store dates and times as UTC.
2. Display them in the user's time zone
3. Profit!

The idea here is hopefully pretty simple. We store our dates in UTC, and use custom elements to display dates and times to the user in their browser's time zone. This means that the server never sends or receives anything other than UTC. We leverage the `Intl.DateTimeFormat` api to get the user's time zone, and the excellent `date-time-fns` library to convert to UTC when we send and receive it. Finally, we use the built in date time editing of our browser by using an `<input type="datetime-local">`. 

Two custom elements work together to implement our solution:

### `<datetime-utc-input>`

This is a custom element which renders a datetime-local input and hidden field which is kept in sync and stores the date as UTC. It takes 2 attributes:

* name - used as the name attribute for the hidden field
* value - an initial value, if desired, in ISO format

### `<datetime-utc-output>`

This element is responsible for taking a UTC datetime and displaying it in the browser timezone. It takes 2 attributes as well:

* datetime - string in ISO format
* format - string specifying format. Uses the format specified in `date-fns` here.

### Usage

```
npm install datetime-utc-elements
```

In your javascript

```javascript
import 'datetime-utc-elements';
```
