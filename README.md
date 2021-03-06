## datetime-utc-elements

### UPDATE: version 0.0.4 now uses a form associated custom element
### UPDATED UPDATE: version 0.0.5 now includes <date-and-time-utc-input> for when you want to separate date and time

You will need to use [this polyfill](https://www.npmjs.com/package/element-internals-polyfill) if your browser does not support the [ElementInternals API](https://html.spec.whatwg.org/multipage/custom-elements.html#element-internals). If this is not to your liking, use version 0.0.2 which uses a hidden input instead.

### Description

1. Store dates and times as UTC.
2. Display them in the user's time zone
3. Profit!

The idea here is hopefully pretty simple. We store our dates in UTC, and use custom elements to display dates and times to the user in their browser's time zone. This means that the server never sends or receives anything other than UTC. We leverage the `Intl.DateTimeFormat` api to get the user's time zone, and the excellent `date-time-fns` library to convert to UTC when we send and receive it. Finally, we use the built in date time editing of our browser by using an `<input type="datetime-local">`. 

Two custom elements work together to implement our solution:

### `<datetime-utc-input>`

This is a custom element which renders a datetime-local input and uses the [ElementInternals API](https://html.spec.whatwg.org/multipage/custom-elements.html#element-internals) to set the form value with the date as UTC. It takes 2 attributes:

* name - used to set form value
* value - an initial value, if desired, in ISO format

### `<date-and-time-utc-input>`

The same as `<datetime-utc-input>` but renders as separate date and time inputs. Both will display and expect input in local timezone. Same attributes as `<datetime-utc-input>`. 

### `<datetime-utc-output>`

This element is responsible for taking a UTC datetime and displaying it in the browser timezone. It takes 2 attributes as well:

* datetime - string in ISO format
* format - string specifying format. Uses the format specified in `date-fns` here.

## Styling

Both input elements expose shadow parts to let you style the internal input(s) in the spoooky Shadow DOM.

`<datetime-utc-input>` gives you an `input` part.
`<date-and-time-utc-input>` gives you `date-input` and `time-input` parts.

### Usage

```
npm install datetime-utc-elements
```

In your javascript

```javascript
import 'datetime-utc-elements';
```
