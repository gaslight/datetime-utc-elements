---
marp: true
---
# Form associated custom elements!
It's about time...

---

# Our problem
* That ancient developer nemesis: timezones
* Q: Does anybody really know what time it is?
* A: [the browser does](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)

---

# What do we want?
* User sees local time
* Server sees UTC
* (this bullet point intentionally left blank)

---

# I know! We'll use custom elements!
* [datetime-utc-elements npm](https://www.npmjs.com/package/datetime-utc-elements)
* datetime-utc-output takes UTC and displays in browser local
* datetime-utc-input let user input in browser local but sends UTC to server

---

# datetime-input version 0.0.2
* datetime-local input
* hidden field for UTC
* keep em in sync
* worked like champ

---

# Let's see

---

# Then I read [this](https://css-tricks.com/creating-custom-form-controls-with-elementinternals/)

---

# Let's make a form associated Custom Element
* static property `formAsociated` = true
* `this.attachInterals()` gives us an `ElementInternals`

---

# What's an ElementInternals?
* [This!](https://html.spec.whatwg.org/multipage/custom-elements.html#elementinternals)
* Not even an MDN page yet
* Chrome only so far
* But there is a [polyfill](https://www.npmjs.com/package/element-internals-polyfill)

---

# `internals.setFormValue()`
* updates the form's FormData
* uses the name attribute
* can take
  * String
  * File
  * FormData
  
---

# Let's see it!

---

# Form validation API
* `internals.setValidity()`
  * validityState
  * message (optional)
  * internal input element (optional)

