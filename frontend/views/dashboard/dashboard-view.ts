import '@vaadin/vaadin-board';
import '@vaadin/vaadin-charts';
import '@vaadin/vaadin-grid';
import { GridBodyRenderer, GridItemModel } from '@vaadin/vaadin-grid';
import { GridColumnElement } from '@vaadin/vaadin-grid/src/vaadin-grid-column';
// import types used in the endpoint
import ChartSeries from 'Frontend/generated/com/example/application/views/dashboard/ChartSeries';
import HealthGridItem from 'Frontend/generated/com/example/application/views/dashboard/HealthGridItem';
// import the remote endpoint
import * as viewEndpoint from 'Frontend/generated/DashboardEndpoint';
import { customElement, html, internalProperty } from 'lit-element';
import { render } from 'lit-html';
import { View } from '../view';

@customElement('dashboard-view')
export class DashboardView extends View {
  @internalProperty()
  conversionRate = 18;

  @internalProperty()
  currentUsers = 745;

  @internalProperty()
  numEvents = '54.6k';

  @internalProperty()
  private monthNames: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  @internalProperty()
  statusColumnRenderer: GridBodyRenderer = this.renderStatusColumn.bind(this);

  @internalProperty()
  gridItems: HealthGridItem[] = [];

  @internalProperty()
  monthlyVisitors: ChartSeries[] = [];

  @internalProperty()
  responseTimes: ChartSeries[] = [];

  render() {
    return html`
      <vaadin-board>
        <vaadin-board-row>
          <div class="wrapper">
            <div class="card space-m">
              <span theme="badge">Users</span>
              <h2 class="primary-text">${this.currentUsers}</h2>
              <span class="secondary-text">Current users in the app</span>
            </div>
          </div>
          <div class="wrapper">
            <div class="card space-m">
              <span theme="badge success">Events</span>
              <h2 class="success-text">${this.numEvents}</h2>
              <span class="secondary-text">Events from the views</span>
            </div>
          </div>
          <div class="wrapper">
            <div class="card space-m">
              <span theme="badge error">Conversion</span>
              <h2 class="error-text">${this.conversionRate}%</h2>
              <span class="secondary-text">User conversion rate</span>
            </div>
          </div>
        </vaadin-board-row>
        <div class="wrapper">
          <div class="card">
            <vaadin-chart
              type="column"
              id="monthlyVisitors"
              title="Monthly visitors per city"
              .categories=${this.monthNames}
              .additionalOptions=${{ xAxis: { crosshair: true }, yAxis: { min: 0 } }}
            >
              ${this.monthlyVisitors.map(
                (visitors) =>
                  html`<vaadin-chart-series .title=${visitors.name} .values=${visitors.data}></vaadin-chart-series>`
              )}
            </vaadin-chart>
          </div>
        </div>
        <vaadin-board-row>
          <div class="wrapper">
            <div class="card">
              <h3>Service health</h3>
              <vaadin-grid id="grid" theme="no-border" .items="${this.gridItems}">
                <vaadin-grid-column path="city" header="City"></vaadin-grid-column>
                <vaadin-grid-column
                  id="statusColumn"
                  header="Status"
                  auto-width
                  flex-grow="0"
                  .renderer=${this.statusColumnRenderer}
                ></vaadin-grid-column>
                <vaadin-grid-column path="date" header="Date" auto-width flex-grow="0"></vaadin-grid-column>
              </vaadin-grid>
            </div>
          </div>
          <div class="wrapper">
            <div class="card">
              <vaadin-chart
                id="responseTimes"
                title="Response times"
                .categories=${this.monthNames}
                .additionalOptions=${{ xAxis: { crosshair: true }, yAxis: { min: 0 } }}
              >
                ${this.responseTimes.map(
                  (responseTime) =>
                    html`<vaadin-chart-series
                      .title=${responseTime.name}
                      .values=${responseTime.data}
                    ></vaadin-chart-series>`
                )}
              </vaadin-chart>
            </div>
          </div>
        </vaadin-board-row>
      </vaadin-board>
    `;
  }

  renderStatusColumn(root: HTMLElement, _column: GridColumnElement | undefined, data: GridItemModel | undefined) {
    const item: HealthGridItem = data!.item as any;
    render(html`<span theme="${item.theme}">${item.status}</span>`, root);
  }

  async connectedCallback() {
    super.connectedCallback();
    this.gridItems = await viewEndpoint.healthGridItems();
    this.monthlyVisitors = await viewEndpoint.monthlyVisitorsSeries();
    this.responseTimes = await viewEndpoint.responseTimesSeries();
  }
}
