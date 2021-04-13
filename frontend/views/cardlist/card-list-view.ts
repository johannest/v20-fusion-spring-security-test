import { logout } from 'Frontend/../target/flow-frontend/Authentication';
import { customElement, html, property } from 'lit-element';
import { View } from '../../views/view';
import * as helloEndpoint from 'Frontend/generated/HelloEndpoint';

@customElement('card-list-view')
export class CardListView extends View {
  @property() stringVal: string = "-NA-";

  render() {
    return html`
      <vaadin-button @click="${this.logout}">Logout</vaadin-button>
      <div>${this.stringVal}</div>
    `;
  }

  async logout() {
    await logout();
  }

  async connectedCallback() {
    super.connectedCallback();
    this.stringVal = await helloEndpoint.getString();
  }
}
