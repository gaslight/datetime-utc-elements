import { LitElement, html } from 'lit-element';
import { zonedTimeToUtc, format } from 'date-fns-tz';
import { parseISO } from 'date-fns';


export class DateTimeUTCInput extends LitElement {
  static get formAssociated() {
    return true;
  }

  static get properties() {
    return {
      name: { type: String, reflect: true },
      required: { type: Boolean, reflect: true },
      value: { type: String, reflect: true }
    };
  }

  get localDateString() {
    if (this.value) {
      const localDate = format(parseISO(this.value), 'yyyy-MM-dd');
      const localTime = format(parseISO(this.value), 'HH:mm:ss');
      return `${localDate}T${localTime}`;
    }
  }

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  inputChange(event) {
    const localDate = event.target.value;
    this.value = zonedTimeToUtc(localDate, Intl.DateTimeFormat().resolvedOptions().timeZone).toISOString();
  }

  update(changedProperties) {
    super.update(changedProperties);
    this.internals.setFormValue(this.value);
  }

  render() {
    return html`
      <input part="input" type="datetime-local" @input=${this.inputChange} value="${this.localDateString}"/>
    `;
  }
}

customElements.define('datetime-utc-input', DateTimeUTCInput);
