import { html } from 'lit-html';

export function main(items) {
    return html`
        <ul>
            ${items.map((item) => html`<li>Number: ${item}</li>`)}
        </ul>
    `;
}
