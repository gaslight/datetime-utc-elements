import { LitElement, html } from 'lit-element';
import { zonedTimeToUtc, format } from 'date-fns-tz';
import { parseISO } from 'date-fns';


export class DateAndTimeUTCInput extends LitElement {
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

  get dateValue() {
    if (this.value) {
      return format(parseISO(this.value), 'yyyy-MM-dd');
    }
  }

  get timeValue() {
    if (this.value) {
      return format(parseISO(this.value), 'HH:mm:ss');
    }
  }

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  inputChange(event) {
    const dateInput = this.shadowRoot.querySelector('input[type="date"]')
    const timeInput = this.shadowRoot.querySelector('input[type="time"]')
    if (dateInput.value && timeInput.value) {
      this.value = zonedTimeToUtc(`${dateInput.value}T${timeInput.value}`, Intl.DateTimeFormat().resolvedOptions().timeZone).toISOString();
    } else {
      this.value = '';
    }
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    this.internals.setFormValue(this.value);
    this.validate();
  }

  validate() {
    if (this.required && !this.value) {
      this.internals.setValidity({ valueMissing: true }, 'You need this', this.shadowRoot.querySelector('input'));
    } else {
      this.internals.setValidity({});
    }
  }

  get validity() { return this.internals.validity; }

  render() {
    return html`
      <input part="date-input" type="date" @input=${this.inputChange} value="${this.dateValue}"/>
      <input part="time-input" type="time" @input=${this.inputChange} value="${this.timeValue}"/>
    `;
  }
}

customElements.define('date-and-time-utc-input', DateAndTimeUTCInput);
