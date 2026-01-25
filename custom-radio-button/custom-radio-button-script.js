
class CustomRadioButton extends HTMLElement {
    #value; #defaultChecked; #tabIndex;
    #dirtyCheckedness;
    #radioButton;
    #pointerFocused; #lastClicked; #reportToElement;
    #internals;

    constructor() {
        super();
        this.#value = 'on';
        this.#defaultChecked = this.#dirtyCheckedness = false;
        this.#tabIndex = 0;
        this.#internals = this.attachInternals();

        const shadow = this.attachShadow({ mode: 'closed' });

        const linkElement = document.createElement("link");
        linkElement.setAttribute("rel", "stylesheet");
        linkElement.setAttribute("href", "https://taurbalaur.github.io/HTML-elements-with-Web-Components/custom-radio-button/custom-radio-button-styles.min.css");
        shadow.appendChild(linkElement);

        const radioButton = document.createElement('div');
        radioButton.setAttribute('tabindex', '0');
        shadow.appendChild(radioButton);

        this.#radioButton = radioButton;
    }

    #handleCheck(clicked=false){
        if(this.name){
            this.#uncheckOtherElementFromGroup();
        }
        if(clicked){
            this.#radioButton.blur();
        }
        if(!this.#internals.states.has("checked")){
            this.#internals.states.add("checked");
            if(clicked){
                this.dispatchEvent(new CustomEvent("custom-change", {
                        bubbles: true,
                        detail:{
                            checked: this.checked,
                            name: this.getAttribute('name'),
                            value: this.value
                        }
                    }
                ));
            }
        }
    }

    #uncheckOtherElementFromGroup(){
        if(this.#reportToElement){
            const currentlyCheckedFromGroup = this.#getCurrentlyCheckedFromGroup();
            if(currentlyCheckedFromGroup){
                currentlyCheckedFromGroup.checked=false;
            }
        } 
    }

    #getCurrentlyCheckedFromGroup(){
        let checkedElements;

        if(this.#reportToElement.tagName==='CUSTOM-FORM'){
            checkedElements = this.#reportToElement.querySelectorAll(`custom-radio-button:state(checked)[name=${this.getAttribute('name')}]`);
        }else{
            checkedElements = this.#reportToElement.querySelectorAll(`custom-radio-button:state(checked)[name=${this.getAttribute('name')}]:not(custom-form *)`);
        }
        
        if(!checkedElements || !checkedElements.length){
            return null;
        }else if(checkedElements[0]===this){
            return checkedElements[1];
        }else{
            return checkedElements[0];
        }
    }

    connectedCallback() {
        this.#reportToElement = this.closest('custom-form');
        if(!this.#reportToElement){
            this.#reportToElement = this.parentElement;
        }

        if(this.checked){
            this.#handleCheck();
        }

        this.addEventListener('pointerdown', () => {
            this.#internals.states.add("active");
            this.#pointerFocused = true;
            this.#lastClicked = this;
        });
        
        document.addEventListener('pointerup', (event) => {
            if (event.target === this.#lastClicked) {
                if(!this.disabled){
                    this.#handleCheck(true);
                }
            }
            this.#internals.states.delete("active");
            this.#pointerFocused = false;
            this.#lastClicked = null;
        });

        this.#radioButton.addEventListener('focus', () => {
            if (!this.#pointerFocused) {
                this.#internals.states.add("focused");
            }
        });

        this.#radioButton.addEventListener('blur', () => {
            this.#internals.states.delete("focused");
        });

        this.addEventListener('keydown', (event) => {
            if (event.code === 'Space' && this.#internals.states.has("focused")) {
                event.preventDefault();
                this.#internals.states.add("active");
            }
        });

        this.addEventListener('keyup', (event) => {
            if (this.#internals.states.has("focused")) {
                if (event.code === 'Space') {
                    if(!this.disabled){
                        this.#handleCheck();
                    }
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
                    this.#radioButton.setAttribute('tabindex', '0');
                } else {
                    this.#internals.states.add("disabled");
                    this.#radioButton.removeAttribute('tabindex');
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
                if(newValue===''){
                    this.removeAttribute('name');
                } else if(newValue && this.checked) {
                    this.#uncheckOtherElementFromGroup();
                }
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
            this.#dirtyCheckedness = true;
        }
        if (val) {
            this.#handleCheck();
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
        return this.getAttribute('name');
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
        this.#dirtyCheckedness = false;
        this.#defaultChecked ? this.#internals.states.add("checked") : this.#internals.states.delete("checked");
    }
}

customElements.define('custom-radio-button', CustomRadioButton); 