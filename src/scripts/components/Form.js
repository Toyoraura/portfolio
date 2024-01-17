export default class Form {
  /**
   * method description
   * @param {HTMLelement} element - Element HTML sur lequel la composante est instancié
   */

  constructor(element) {
    this.element = element;
    this.formElements = this.element.elements;

    this.init();
  }

  init() {
    //nous allons chercher notre element pour y ajouter un attribut no-validate
    this.element.setAttribute('noValidate', '');

    for (let i = 0; i < this.formElements.length; i++) {
      const input = this.formElements[i];

      if (input.required) {
        input.addEventListener('input', this.validateInput.bind(this));
      }
    }

    this.element.addEventListener('submit', this.onSubmit.bind(this));
  }

  onSubmit(event) {
    event.preventDefault();

    if (this.validate()) {
      console.log('succes');
      //envoi ajax du formulaire
      this.showConfirmation();
    } else {
      console.log('fail');
    }
  }

  /**
   * method description
   * @return {boolean}  - status de la validation
   */
  validate() {
    let isValid = true;

    for (let i = 0; i < this.formElements.length; i++) {
      const input = this.formElements[i];

      if (input.required && !this.validateInput(input)) {
        isValid = false;
      }
    }
    return isValid;
  }

  validateInput(event) {
    const input = event.currentTarget || event;

    if (input.validity.valid) {
      //Pas d'erreur
      this.removeError(input);
    } else {
      //Erreur présente
      this.addError(input);
    }

    return input.validity.valid;
  }

  addError(input) {
    const container =
      input.closest('[data-input-container]') || input.closest('.input');
    container.classList.add('error');
  }

  removeError(input) {
    const container =
      input.closest('[data-input-container]') || input.closest('.input');
    container.classList.remove('error');
  }

  showConfirmation() {
    this.element.classList.add('is-sent');
  }
}
