import { LitElement, html } from 'lit-element';
import {parseISO, format}  from 'date-fns';

export class DateTimeUTCOutput extends LitElement {
  static get properties() {
    return {
      datetime: {},
      format: {}
    };
  }
  render() {
    const date = parseISO(this.datetime);
    return html`${format(date, this.format)}`;
  }
}

customElements.define('datetime-utc-output', DateTimeUTCOutput);
