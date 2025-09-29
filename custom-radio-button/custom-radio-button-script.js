
class CustomRadioButton extends HTMLElement {

    #radioButton;

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const linkElement = document.createElement("link");
        linkElement.setAttribute("rel", "stylesheet");
        linkElement.setAttribute("href", "https://taurbalaur.github.io/HTML-elements-with-Web-Components/custom-radio-button/custom-radio-button-styles.css");

        shadow.appendChild(linkElement);

        const radioButton = document.createElement('div');
        radioButton.classList.add('radio-button');

        this.#radioButton = radioButton;

        shadow.appendChild(radioButton);
    }

    #toggleChecked() {
        if (!this.disabled) {
            this.checked = !this.checked;
        }
    }

    connectedCallback() {
        this.#radioButton.addEventListener('click', ()=>{this.#toggleChecked();});
    }

    static get observedAttributes() {
        return ['checked', 'disabled'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (newValue !== oldValue){
            if (name === 'checked' || name === 'disabled') {
                this.#radioButton.classList.toggle(name);
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

customElements.define('custom-radio-button', CustomRadioButton); 