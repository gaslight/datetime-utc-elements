import { fixture, html, expect } from '@open-wc/testing';
import { zonedTimeToUtc } from 'date-fns-tz';

import '../src/datetime-utc-input';

describe('time-output', () => {

  const localTime = '2021-12-12T13:00:00'; // 1pm local
  const utcTime = zonedTimeToUtc(localTime, Intl.DateTimeFormat().resolvedOptions().timeZone);

  it('adds the value to the form', async () => {
    const el = await fixture(`
      <form>
        <label for="appointment_time">Appointment Time</label>
        <datetime-utc-input name="appointment_time" required></datetime-utc-input>
        <button type="submit">Submit</button>
      </form>
    `);
    const datetimeUtcInput = el.querySelector('datetime-utc-input');
    const datetimeLocalInput = datetimeUtcInput.shadowRoot.querySelector('input[type="datetime-local"]');
    datetimeLocalInput.value = localTime;
    const event = new Event('input', {
      bubbles: true,
      cancelable: true,
    });
    datetimeLocalInput.dispatchEvent(event);
    await el.updateComplete;
    const formData = new FormData(el);
    expect(formData.get('appointment_time')).to.equal(utcTime.toISOString());
  });
});
