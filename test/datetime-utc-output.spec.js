import { fixture, html, expect } from '@open-wc/testing';
import '../src/datetime-utc-output';

describe('datetime-utc-output', () => {
  it('displays the time with a format', async () => {
    const el = await fixture(`<datetime-utc-output format="haaa" datetime="2021-03-04 16:30:00Z"></datetime-utc-output>`);
    expect(el.shadowRoot.innerHTML).to.contain('11am');
  });
});
