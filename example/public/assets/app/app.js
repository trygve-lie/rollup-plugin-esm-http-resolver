// import { render } from 'lit-html';
import * as views from './views.js';
import { data } from '../data/data.js';

export default class App {
    constructor(root) {
        this.root = root;
    }

    render() {
        const items = data();
        console.log(items);
        views.main(items);
        // render(views.main(items.data), this.root);
    }

    update() {
        setInterval(() => {
            this.render();
        }, 500);
    }
}
