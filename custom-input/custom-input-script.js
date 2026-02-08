
class CustomInput extends HTMLElement {

    #type; #value; #defaultValue; #placeholder; #spellcheck; #tabIndex;
    #dirtyFlag;
    #textInput;
    #pointerFocused; #hasChanged;
    #shadow; #internals;

    constructor() {
        super();
        this.#type = 'text';
        this.#value = this.#defaultValue = this.#placeholder = '';
        this.#spellcheck = this.#dirtyFlag = false;
        this.#tabIndex = 0;
        this.#internals = this.attachInternals();

        this.#shadow = this.attachShadow({ mode: 'closed', delegatesFocus: true });

        const linkElement = document.createElement("link");
        linkElement.setAttribute("rel", "stylesheet");
        linkElement.setAttribute("href", "https://taurbalaur.github.io/HTML-elements-with-Web-Components/custom-input/custom-input-styles.min.css");
        this.#shadow.appendChild(linkElement);
    }

    #handleBlur() {
        this.#textInput.scrollTo(0, 0);

        if (this.#hasChanged) {
            this.dispatchEvent(new CustomEvent("custom-change", {
                bubbles: true,
                detail: {
                    name: this.getAttribute('name'),
                    value: this.value
                }
            }
            ));

            this.#hasChanged = false;
        }
    }

    connectedCallback() {
        if (this.#type === 'text') {
            const textInput = document.createElement('div');
            if (!this.#internals.states.has('disabled')) {
                textInput.setAttribute('contenteditable', 'plaintext-only');
            }
            textInput.setAttribute('placeholder', this.#placeholder);
            textInput.setAttribute('spellcheck', this.#spellcheck);
            textInput.innerText = this.#value;
            textInput.classList.add('textinput');

            this.#textInput = textInput;
            this.#shadow.appendChild(textInput);

            this.addEventListener('pointerdown', () => {
                if (!this.disabled) {
                    this.#pointerFocused = true;
                    this.#internals.states.add('active');
                }
            });

            document.addEventListener('pointerup', () => {
                this.#internals.states.delete('active');
            });

            window.addEventListener('blur', () => {
                this.#internals.states.delete("active");
            });

            this.addEventListener('focus', () => {
                this.#internals.states.add('focused');
                if (!this.#pointerFocused) {
                    let range = document.createRange();
                    range.selectNodeContents(this.#textInput);
                    window.getSelection().removeAllRanges();
                    window.getSelection().addRange(range);
                }
            });

            this.#textInput.addEventListener('blur', () => {
                this.#internals.states.delete('focused');
                this.#pointerFocused = false;
                this.#handleBlur();
            });

            this.#textInput.addEventListener('input', () => {
                if (this.#textInput.innerHTML === '<br>') {
                    this.#textInput.innerHTML = '';
                }
                if (!this.#dirtyFlag) {
                    this.#dirtyFlag = 1;
                }
                this.#value = this.#textInput.innerText;
                this.#hasChanged = true;

                this.dispatchEvent(new CustomEvent("custom-input", {
                    bubbles: true,
                    detail: {
                        name: this.getAttribute('name'),
                        value: this.value
                    }
                }));
            });

            this.#textInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    this.#textInput.blur();
                }
            });
        } else {
            this.#type = 'text';
            this.connectedCallback();
        }
    }

    static get observedAttributes() {
        return ['type', 'placeholder', 'spellcheck', 'disabled', 'tabindex', 'name', 'value'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (newValue !== oldValue) {
            if (name === 'type') {
                this.setAttribute('type', 'text');
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
                    if (this.#textInput && this.#textInput.innerHTML.includes('<br>')) {
                        this.#textInput.innerHTML = '';
                    }
                    this.#textInput?.setAttribute('contenteditable', 'plaintext-only');
                    this.#internals.states.delete('disabled');
                } else {
                    if (this.#textInput && this.#value.trim() === '' && this.#placeholder.trim() === '') {
                        this.#textInput.innerHTML = '<br>';
                    }
                    this.#textInput?.removeAttribute('contenteditable');
                    this.#internals.states.add('disabled');
                }
            } else if (name === 'tabindex') {
                if (newValue === null) {
                    this.#tabIndex = 0;
                } else {
                    const temp = parseInt(newValue);
                    if (isNaN(temp) || temp >= 0) {
                        this.removeAttribute('tabindex');
                    } else {
                        this.#tabIndex = temp;
                    }
                }
            } else if (name === 'name') {
                if (newValue === '') {
                    this.removeAttribute('name');
                }
            } else if (name === 'value') {
                this.#defaultValue = newValue;
                if (!this.#dirtyFlag) {
                    this.#value = newValue;
                    if (this.#textInput) {
                        this.#textInput.innerText = newValue;
                    }
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
        if (this.#textInput) {
            this.#textInput.innerText = val;
        }
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
        return this.#internals.states.has("disabled");
    }

    set disabled(val) {
        if (val) {
            this.setAttribute('disabled', '');
        } else {
            this.removeAttribute('disabled');
        }
    }

    get tabIndex() {
        return this.#tabIndex;
    }

    set tabIndex(val) {
        const temp = parseInt(val);
        if (!isNaN(temp) && temp < 0) this.setAttribute('tabindex', temp);
    }
}

customElements.define('custom-input', CustomInput);