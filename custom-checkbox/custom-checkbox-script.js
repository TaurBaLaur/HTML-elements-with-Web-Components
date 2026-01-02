
class CustomCheckbox extends HTMLElement {
    #value; #defaultChecked;
    #tabIndex; #name;
    #dirtyCheckedness;
    #checkbox;
    #pointerFocused; #lastClicked;

    #internals;

    constructor() {
        super();
        this.#value = 'on';
        this.#defaultChecked = false;
        this.#dirtyCheckedness = this.#tabIndex = 0;
        const shadow = this.attachShadow({ mode: 'closed' });

        this.#internals = this.attachInternals();

        const linkElement = document.createElement("link");
        linkElement.setAttribute("rel", "stylesheet");
        linkElement.setAttribute("href", "https://taurbalaur.github.io/HTML-elements-with-Web-Components/custom-checkbox/custom-checkbox-styles.css");

        shadow.appendChild(linkElement);
        const checkbox = document.createElement('div');
        checkbox.setAttribute('tabindex', '0');

        this.#checkbox = checkbox;

        shadow.appendChild(checkbox);
    }

    #toggleChecked() {
        if (!this.disabled) {
            if (!this.#dirtyCheckedness) {
                this.#dirtyCheckedness = 1;
            }
            this.checked ? this.#internals.states.delete("checked") : this.#internals.states.add("checked");
        }
    }

    #handleClick() {
        this.#checkbox.blur();
        this.#toggleChecked();
    }

    connectedCallback() {
        this.addEventListener('pointerdown', () => {
            this.#internals.states.add("active");
            this.#pointerFocused = true;
            this.#lastClicked = this;
        });
        document.addEventListener('pointerup', (event) => {
            if (event.target === this.#lastClicked) {
                this.#internals.states.delete("active");
                this.#handleClick();
            } else if (this.#lastClicked === this) {
                this.#internals.states.delete("active");
            }
            this.#pointerFocused = false;
            this.#lastClicked = null;
        });
        this.#checkbox.addEventListener('focus', () => {
            if (!this.#pointerFocused) {
                this.#internals.states.add("focused");
            }
        });
        this.#checkbox.addEventListener('blur', () => {
            this.#internals.states.delete("focused");
        });
        this.addEventListener('keydown', (event) => {
            if (event.code === 'Space' && this.#internals.states.has("focused")) {
                event.preventDefault();
            }
            this.#internals.states.add("active");
        });
        this.addEventListener('keyup', (event) => {
            if (this.#internals.states.has("focused")) {
                if (event.code === 'Space') {
                    this.#toggleChecked();
                    this.#internals.states.delete("active");
                }
            }
        });
    }

    static get observedAttributes() {
        return ['checked', 'disabled', 'tabindex', 'name', 'value'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (newValue !== oldValue) {
            if (name === 'checked') {
                if (newValue === null) {
                    this.#defaultChecked = false;
                } else {
                    this.#defaultChecked = true;
                }
                if (!this.#dirtyCheckedness) {
                    this.#defaultChecked ? this.#internals.states.add("checked") : this.#internals.states.delete("checked");
                }
            } else if (name === 'disabled') {
                if (newValue === null) {
                    this.#internals.states.delete("disabled");
                    this.#checkbox.setAttribute('tabindex', '0');
                } else {
                    this.#internals.states.add("disabled");
                    this.#checkbox.removeAttribute('tabindex');
                }
            } else if (name === 'tabindex') {
                if (newValue === null) {
                    this.#tabIndex = 0;
                    this.#checkbox.setAttribute('tabindex', '0');
                } else {
                    const temp = parseInt(newValue);
                    if (isNaN(temp) || temp >= 0) {
                        this.removeAttribute('tabindex');
                    } else {
                        this.#tabIndex = temp;
                    }
                }
            } else if (name === 'name') {
                this.#name = String(newValue);
            } else if (name === 'value') {
                if (newValue === null) {
                    this.#value = 'on';
                } else {
                    this.#value = newValue;
                }
            }
        }
    }

    get defaultChecked() {
        return this.#defaultChecked;
    }

    set defaultChecked(val) {
        this.setAttribute('checked', val);
    }

    get checked() {
        return this.#internals.states.has("checked");
    }

    set checked(val) {
        if (!this.#dirtyCheckedness) {
            this.#dirtyCheckedness = 1;
        }
        if (val) {
            this.#internals.states.add("checked");
        } else {
            this.#internals.states.delete("checked");
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

    get name() {
        return this.#name;
    }

    set name(val) {
        this.setAttribute('name', val);
    }

    get value() {
        return this.#value;
    }

    set value(val) {
        this.setAttribute('value', val);
    }

    reset() {
        this.#dirtyCheckedness = 0;
        this.#defaultChecked ? this.#internals.states.add("checked") : this.#internals.states.delete("checked");
    }
}

customElements.define('custom-checkbox', CustomCheckbox);