import { fixture, html, expect } from '@open-wc/testing';
import { zonedTimeToUtc } from 'date-fns-tz';

import '../src/date-and-time-utc-input';

describe('time-output', () => {

  const localDate = '2021-12-12';
  const localTime = '13:00:00'; // 1pm local
  const utcTime = zonedTimeToUtc(`${localDate}T${localTime}`, Intl.DateTimeFormat().resolvedOptions().timeZone);

  it('adds the value to the form', async () => {
    const el = await fixture(`
      <form>
        <label for="appointment_time">Appointment Time</label>
        <date-and-time-utc-input name="appointment_time" required></date-and-time-utc-input>
        <button type="submit">Submit</button>
      </form>
    `);
    const datetimeUtcInput = el.querySelector('date-and-time-utc-input');
    const dateInput = datetimeUtcInput.shadowRoot.querySelector('input[type="date"]');
    const timeInput = datetimeUtcInput.shadowRoot.querySelector('input[type="time"]');
    dateInput.value = localDate;
    timeInput.value = localTime;
    const event = new Event('input', {
      bubbles: true,
      cancelable: true,
    });
    timeInput.dispatchEvent(event);
    await el.updateComplete;
    const formData = new FormData(el);
    expect(formData.get('appointment_time')).to.equal(utcTime.toISOString());
  });

  it('sets the form when the property of the element is updated', async () => {
    const el = await fixture(`
      <form>
        <label for="appointment_time">Appointment Time</label>
        <date-and-time-utc-input name="appointment_time" required></date-and-time-utc-input>
        <button type="submit">Submit</button>
      </form>
    `);
    const datetimeUtcInput = el.querySelector('date-and-time-utc-input');
    datetimeUtcInput.value = utcTime.toISOString();
    await el.updateComplete;
    const formData = new FormData(el);
    expect(formData.get('appointment_time')).to.equal(utcTime.toISOString());
  });

  it('sets the initial form value', async () => {
    const el = await fixture(`
      <form>
        <label for="appointment_time">Appointment Time</label>
        <date-and-time-utc-input name="appointment_time" required value="${utcTime.toISOString()}"></date-and-time-utc-input>
        <button type="submit">Submit</button>
      </form>
    `);
    const formData = new FormData(el);
    expect(formData.get('appointment_time')).to.equal(utcTime.toISOString());
  });

  it('sets the internal input based on initial value', async () => {
    const el = await fixture(`<date-and-time-utc-input name="appointment_time" required value="${utcTime.toISOString()}"></date-and-time-utc-input>`);
    const timeInput = el.shadowRoot.querySelector('input[type="time"]');
    expect(timeInput.value).to.equal(localTime);
  });

  describe('validation', async () => {
    it('checks required validation', async () => {
      const el = await fixture(`
        <form>
          <label for="appointment_time">Appointment Time</label>
          <date-and-time-utc-input name="appointment_time" required value="${utcTime.toISOString()}"></date-and-time-utc-input>
          <button type="submit">Submit</button>
        </form>
      `);
      const datetimeUtcInput = el.querySelector('date-and-time-utc-input');
      const timeInput = datetimeUtcInput.shadowRoot.querySelector('input[type="time"]');
      expect(el.checkValidity()).to.be.true;
      timeInput.value = '';
      const event = new Event('input', {
        bubbles: true,
        cancelable: true,
      });
      timeInput.dispatchEvent(event);
      await el.updateComplete;
      expect(el.checkValidity()).to.be.false;
      expect(datetimeUtcInput.validity.valueMissing).to.be.true;
    });
  });
});
