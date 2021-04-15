import { customElement, html, property } from 'lit-element';
import { View } from '../../views/view';
import * as helloEndpoint from 'Frontend/generated/HelloEndpoint';

@customElement('card-list-view')
export class CardListView extends View {
  @property() stringVal: string = "-NA-";

  render() {
    return html`
      <a href="/logout">Log out</a>
      <div>${this.stringVal}</div>
    `;
  }


  async connectedCallback() {
    super.connectedCallback();
    this.stringVal = await helloEndpoint.getString();
  }
}
