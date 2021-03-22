import { fixture, html, expect } from '@open-wc/testing';
import { zonedTimeToUtc } from 'date-fns-tz';

import '../src/datetime-utc-input';

describe('time-output', () => {

  const localTime = '2021-12-12T13:00:00'; // 1pm local
  const utcTime = zonedTimeToUtc(localTime, Intl.DateTimeFormat().resolvedOptions().timeZone);

  it('updates the hidden field in utc when a time is entered', async () => {
    const el = await fixture(`<datetime-utc-input name="datetime"></datetime-utc-input>`);
    const datetimeLocalInput = el.querySelector('input[type="datetime-local"]');
    datetimeLocalInput.value = localTime;
    const event = new Event('input', {
      bubbles: true,
      cancelable: true,
    });
    datetimeLocalInput.dispatchEvent(event);
    await el.updateComplete;
    const hidden = el.querySelector('input[name="datetime"]');
    expect(hidden.value).to.equal(utcTime.toISOString());
  });

  it('initializes the hidden and datetime local', async () => {
    const el = await fixture(`<datetime-utc-input name="datetime" value="${utcTime.toISOString()}"></datetime-utc-input>`);
    const datetimeLocalInput = el.querySelector('input[type="datetime-local"]');
    expect(datetimeLocalInput.value).to.equal(localTime);
    const hidden = el.querySelector('input[name="datetime"]');
    expect(hidden.value).to.equal(utcTime.toISOString());
  });
});
