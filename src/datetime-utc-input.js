import { LitElement, html } from 'lit-element';
import { zonedTimeToUtc, format } from 'date-fns-tz';
import { parseISO } from 'date-fns';


export class DateTimeUTCInput extends LitElement {
  static get properties() {
    return {
      name: {},
      value: {},
      isoString: { attribute: false },
      localDateString: { attribute: false }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.value) {
      this.isoString = this.value;
      const localDate = format(parseISO(this.isoString), 'yyyy-MM-dd');
      const localTime = format(parseISO(this.isoString), 'HH:mm:ss');
      this.localDateString = `${localDate}T${localTime}`;
    }
  }

  inputChange(event) {
    const localDate = event.target.value;
    this.isoString = zonedTimeToUtc(localDate, Intl.DateTimeFormat().resolvedOptions().timeZone).toISOString();
  }

  render() {
    return html`
      <input type="datetime-local" @input=${this.inputChange} value="${this.localDateString}"/>
      <input type="hidden" name="${this.name}" value="${this.isoString}" />
    `;
  }
  createRenderRoot() { return this; }
}

customElements.define('datetime-utc-input', DateTimeUTCInput);
