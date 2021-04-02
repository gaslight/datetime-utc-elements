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
      value: { type: String }
    };
  }

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

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  inputChange(event) {
    const localDate = event.target.value;
    this.isoString = zonedTimeToUtc(localDate, Intl.DateTimeFormat().resolvedOptions().timeZone).toISOString();
    this.internals.setFormValue(this.isoString);
  }

  render() {
    return html`
      <input part="input" type="datetime-local" @input=${this.inputChange} value="${this.localDateString}"/>
    `;
  }
}

customElements.define('datetime-utc-input', DateTimeUTCInput);
