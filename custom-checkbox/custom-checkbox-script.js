
class CustomCheckbox extends HTMLElement {

    #checkbox;

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'closed' });

        const linkElement = document.createElement("link");
        linkElement.setAttribute("rel", "stylesheet");
        linkElement.setAttribute("href", "https://taurbalaur.github.io/HTML-elements-with-Web-Components/custom-checkbox/custom-checkbox-styles.css");

        shadow.appendChild(linkElement);

        const checkbox = document.createElement('div');
        checkbox.classList.add('checkbox');

        this.#checkbox = checkbox;

        shadow.appendChild(checkbox);
    }

    #toggleChecked() {
        if (!this.disabled) {
            this.checked = !this.checked;
        }
    }

    connectedCallback() {
        this.#checkbox.addEventListener('click', ()=>{this.#toggleChecked();});
    }

    static get observedAttributes() {
        return ['checked', 'disabled'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (newValue !== oldValue){
            if (name === 'checked' || name === 'disabled') {
                this.#checkbox.classList.toggle(name);
            }
        }
    }

    get checked() {
        return this.hasAttribute('checked');
    }

    set checked(val) {
        if (val) {
            this.setAttribute('checked', '');
        } else {
            this.removeAttribute('checked');
        }
    }

    get disabled() {
        return this.hasAttribute('disabled');
    }

    set disabled(val) {
        if (val) {
            this.setAttribute('disabled', '');
        } else {
            this.removeAttribute('disabled');
        }
    }
}

customElements.define('custom-checkbox', CustomCheckbox);