class RegistrationPage {
  constructor(page) {
    this.page = page;
    this.nameInput = page.locator('#signupName');
    this.lastNameInput = page.locator('#signupLastName');
    this.emailInput = page.locator('#signupEmail');
    this.passwordInput = page.locator('#signupPassword');
    this.repeatPasswordInput = page.locator('#signupRepeatPassword');
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.nameError = page.getByText('Name required');
    this.nameInvalidError = page.getByText('Name is invalid');
    this.nameLengthError = page.getByText('Name has to be from 2 to 20 characters long');
    this.lastNameError = page.getByText('Last name required');
    this.lastNameInvalidError = page.getByText('Last name is invalid');
    this.lastNameLengthError = page.getByText('Last name has to be from 2 to 20 characters long');
    this.emailError = page.getByText('Email required');
    this.emailInvalidError = page.getByText('Email is incorrect');
    this.passwordError = page.getByText('Password required');
    this.passwordLengthError = page.getByText('Password has to be from 8 to 15 characters long');
    this.repeatPasswordError = page.getByText('Re-enter password required');
    this.passwordsMismatchError = page.getByText('Passwords do not match');
  }

  async open() {
    await this.page.goto('/');
    await this.page.getByRole('button', { name: 'Sign In' }).click();
    await this.page.getByText('Registration').click();
  }

  async fillName(name) {
    await this.nameInput.fill(name);
  }

  async fillLastName(lastName) {
    await this.lastNameInput.fill(lastName);
  }

  async fillEmail(email) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  async fillRepeatPassword(password) {
    await this.repeatPasswordInput.fill(password);
  }

  async clickRegister() {
    await this.registerButton.click();
  }

  async register(name, lastName, email, password) {
    await this.fillName(name);
    await this.fillLastName(lastName);
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.fillRepeatPassword(password);
    await this.clickRegister();
  }
}

module.exports = { RegistrationPage };
