
class CustomInput extends HTMLElement {

    #type; #value; #defaultValue; #placeholder; #spellcheck; #disabled;
    #dirtyFlag;
    #shadow;
    #textInput;
    #pointerFocus;

    #scrollToStart() {
        this.#textInput.scrollTo(0, 0);
    }

    constructor() {
        super();
        this.#type = 'text';
        this.#value = this.#defaultValue = this.#placeholder = '';
        this.#spellcheck = this.#disabled = false;
        this.#dirtyFlag = 0;

        this.#shadow = this.attachShadow({ mode: 'closed', delegatesFocus: true });

        const linkElement = document.createElement("link");
        linkElement.setAttribute("rel", "stylesheet");
        linkElement.setAttribute("href", "https://taurbalaur.github.io/HTML-elements-with-Web-Components/custom-input/custom-input-styles.min.css");

        this.#shadow.appendChild(linkElement);
    }

    connectedCallback() {
        if (this.#type === 'text') {
            const textInput = document.createElement('div');
            textInput.setAttribute('contenteditable', 'plaintext-only');
            textInput.setAttribute('placeholder', this.#placeholder);
            textInput.setAttribute('spellcheck', this.#spellcheck);
            textInput.innerText = this.#value;
            textInput.classList.add('textinput')

            this.#textInput = textInput;
            this.#shadow.appendChild(textInput);

            this.addEventListener('pointerdown', () => {
                this.#pointerFocus = true;
            });

            this.addEventListener('focus', () => {
                if (!this.#pointerFocus) {
                    let range = document.createRange();
                    range.selectNodeContents(this.#textInput);
                    window.getSelection().removeAllRanges();
                    window.getSelection().addRange(range);
                }
            });

            this.#textInput.addEventListener('blur', () => {
                this.#pointerFocus = false;
                this.#scrollToStart();
            });

            this.#textInput.addEventListener('input', () => {
                if (this.#textInput.innerHTML === '<br>') {
                    this.#textInput.innerHTML = '';
                }
                if (!this.#dirtyFlag) {
                    this.#dirtyFlag = 1;
                }
                this.#value = this.#textInput.innerText;
            });

            this.#textInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    this.#textInput.blur();
                    this.#scrollToStart();
                }
            });
        } else {
            this.#type = 'text';
            this.connectedCallback();
        }
    }

    static get observedAttributes() {
        return ['type', 'value', 'placeholder', 'spellcheck', 'disabled'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (newValue !== oldValue) {
            if (name === 'type') {
                this.setAttribute('type', 'text');
            } else if (name === 'value') {
                this.#defaultValue = newValue;
                if (!this.#dirtyFlag) {
                    this.#value = newValue;
                    if (this.#textInput) {
                        this.#textInput.innerText = newValue;
                    }
                }
            } else if (name === 'placeholder') {
                if (newValue === null) {
                    this.#placeholder = '';
                    this.#textInput?.removeAttribute(name);
                } else {
                    this.#placeholder = newValue;
                    this.#textInput?.setAttribute(name, newValue);
                }
            } else if (name === 'spellcheck') {
                if (newValue === null) {
                    this.#spellcheck = false;
                    this.#textInput?.setAttribute(name, false);
                } else {
                    this.#spellcheck = true;
                    this.#textInput?.setAttribute(name, true);
                }
            } else if (name === 'disabled') {
                if (newValue === null) {
                    this.#disabled = false;
                    if (this.#textInput && this.#textInput.innerHTML.includes('<br>')) {
                        this.#textInput.innerHTML = '';
                    }
                    this.#textInput?.setAttribute('contenteditable', 'plaintext-only');
                } else {
                    this.#disabled = true;
                    if (this.#textInput && this.#value.trim() === '' && this.#placeholder.trim() === '') {
                        this.#textInput.innerHTML = '<br>';
                    }
                    this.#textInput?.removeAttribute('contenteditable');
                }
            }
        }
    }

    get type() {
        return this.#type;
    }

    set type(val) {
        this.setAttribute('type', val);
    }

    get value() {
        return this.#value;
    }

    set value(val) {
        if (!this.#dirtyFlag) {
            this.#dirtyFlag = 1;
        }
        this.#textInput.innerText = val;
        this.#value = val;
    }

    get defaultValue() {
        return this.#defaultValue;
    }

    set defaultValue(val) {
        this.setAttribute('value', val);
    }

    get placeholder() {
        return this.#spellcheck;
    }

    set placeholder(val) {
        this.setAttribute('placeholder', val);
    }

    get spellcheck() {
        return this.#spellcheck;
    }

    set spellcheck(val) {
        if (val) {
            this.setAttribute('spellcheck', '');
        } else {
            this.removeAttribute('spellcheck');
        }
    }

    get disabled() {
        return this.#disabled;
    }

    set disabled(val) {
        if (val) {
            this.setAttribute('disabled', '');
        } else {
            this.removeAttribute('disabled');
        }
    }
}

customElements.define('custom-input', CustomInput);

