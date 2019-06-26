import App from './app/app.js';

const ready = () => {
    return new Promise((resolve, reject) => {
        document.addEventListener("DOMContentLoaded", (event) => {
            const el = document.getElementById('app');
            resolve(el);
        });
    });
}

const start = async () => {
    const el = await ready();
    const app = new App(el);
    app.render();
    app.update();
};
start();
