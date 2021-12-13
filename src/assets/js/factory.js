export default class Modal {
    constructor(element) {
        this.element = element;
        this.closBtn = this.element.getElementsByTagName('span')[0];
        this.header = this.element.getElementsByTagName('header')[0];
        this.body = this.element.getElementsByTagName('main')[0];
        this.footer = this.element.getElementsByTagName('footer')[0];
        this.close = this.close.bind(this);
        this.empty = this.empty.bind(this);
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.closBtn.addEventListener('click', this.close);
        this.element.addEventListener('click', this.close);
    }

    renderContentFromTemplate(HTMLTemplate){
        this.body.appendChild(HTMLTemplate);
        this.show();
    }

    renderError(err, title) {
        const isString = typeof (err) === 'string';
        const dftTitle = title || 'Error';

        if (isString) {
            return this.render({title: dftTitle, content: err});
        }

        if (err.message) {
            return this.render({title: dftTitle, content: err.message});
        }

        return this.render({title: dftTitle, content: JSON.stringify(err)});
    }

    close(event) {
        if (event.target !== event.currentTarget) return;
        this.hide();
        this.empty();
    }

    render({ title = "", content = "", buttons = [] }) {
        const t = document.createElement('h4');
        const c = document.createElement('p');
        t.textContent = title;
        c.textContent = content;
        this.header.appendChild(t);
        this.body.appendChild(c);

        if (buttons.length > 0) {
            buttons.map(btn => {
                const b = document.createElement('button');
                b.setAttribute('type', 'button');
                b.textContent = btn.label;
                btn.classes && b.classList.add(btn.classes);
                b.addEventListener('click', btn.handler);
                this.footer.appendChild(b);
            })
        }

        this.show();
    }

    empty() {
        this.header.innerHTML = "";
        this.body.innerHTML = "";
        this.footer.innerHTML = "";
    }

    show() {
        this.element.setAttribute("data-show", true);
    }

    hide() {
        this.element.setAttribute("data-show", false);
    }
}