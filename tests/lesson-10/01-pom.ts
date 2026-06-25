import { Page } from '@playwright/test';
import { Locator } from '@playwright/test';

class MaterialBasePag {
    page: Page;
    baseURL: string;
    xpathRegisterPage: string;
    xpathProductPage: string;
    xpathTodoPage: string;
    personalNote: string;

    constructor(page: Page) {
        this.page = page;
        this.baseURL = "https://material.playwrightvn.com/";
        this.xpathRegisterPage = "//a[@href='01-xpath-register-page.html']";
        this.xpathProductPage = "//a[@href='02-xpath-product-page.html']";
        this.xpathTodoPage = "//a[@href='03-xpath-todo-list.html']";
        this.personalNote = "//a[@href='04-xpath-personal-notes.html']";
    }

    async openMaterialPage() {
        await this.page.goto("https://material.playwrightvn.com/");
    }

    async gotoPage(pageName: string) {
        await this.page.locator(pageName).click();
    }

}

export class RegisterPage extends MaterialBasePag {
    xpathUsername: string;
    xpathEmail: string;
    xpathGenderMale: string;
    xpathGenderFemale: string;
    xpathReadingHobbies: string;
    xpathTravelingHobbies: string;
    xpathCookingHobbies: string;
    xpathInterest: string;
    xpathCountry: string;
    xpathDateOfBirth: string;
    xpathProfilePicture: string;
    xpathBiography: string;
    buttonRegister: Locator;

    //Assertion locators
    registeredUsername: Locator;
    registeredEmail: Locator;
    registeredInfo: Locator;


    constructor(page: Page) {
        super(page);
        this.xpathUsername = "//input[@id='username']";
        this.xpathEmail = "//input[@id='email']";
        this.xpathGenderFemale = "//input[@id='female']";
        this.xpathGenderMale = "//input[@id='male']";
        this.xpathReadingHobbies = "//input[@id='reading']";
        this.xpathTravelingHobbies = "//input[@id='traveling']";
        this.xpathCookingHobbies = "//input[@id='cooking']";
        this.xpathInterest = "//select[@id='interests']";
        this.xpathCountry = "//select[@id='country']";
        this.xpathDateOfBirth = "//input[@id='dob']";
        this.xpathProfilePicture = "//input[@id='profile']";
        this.xpathBiography = "//textarea[@id='bio']";
        this.buttonRegister = this.page.locator("//button[text()='Register']");

        this.registeredUsername = this.page.locator("//tbody/tr[1]/td[2]");
        this.registeredEmail = this.page.locator("//tbody/tr[1]/td[3]");
        this.registeredInfo = this.page.locator("//tbody/tr[1]/td[4]");
    }

    async goto() {
        await this.openMaterialPage();
        await this.gotoPage(this.xpathRegisterPage);
    }

    async fillRegisterForm(data: {
        username: string,
        email: string,
        gender: 'Male' | 'Female',
        hobbies: { reading?: boolean, traveling?: boolean, cooking?: boolean },
        interests: string[],
        country: string,
        dob: string,
        filePath: string,
        bio: string
    }) {
        //Enter Username & Email
        await this.page.locator(this.xpathUsername).fill(data.username);
        await this.page.locator(this.xpathEmail).fill(data.email);

        //Gender (radio)
        if (data.gender === "Male") {
            await this.page.locator(this.xpathGenderMale).check();
        } else {
            await this.page.locator(this.xpathGenderFemale).check();
        }

        //Hobbies (checkbox)
        if (data.hobbies.reading) await this.page.locator(this.xpathReadingHobbies).check();
        if (data.hobbies.traveling) await this.page.locator(this.xpathTravelingHobbies).check();
        if (data.hobbies.cooking) await this.page.locator(this.xpathCookingHobbies).check();


        //Interes & Country (dropdown)
        await this.page.locator(this.xpathInterest).selectOption(data.interests);
        await this.page.locator(this.xpathCountry).selectOption(data.country);

        //Date of Birth
        await this.page.locator(this.xpathDateOfBirth).fill(data.dob);

        //Profile picture
        await this.page.locator(this.xpathProfilePicture).setInputFiles(data.filePath);

        //Biography
        await this.page.locator(this.xpathBiography).fill(data.bio);
    }

    async clickRegister() {
        await this.buttonRegister.click();
    }

}

export class ProductPage extends MaterialBasePag {
    cartRows: Locator;
    totalPriceLabel: Locator;

    constructor(page: Page) {
        super(page);
        this.cartRows = this.page.locator("//tbody[@id='cart-items']//tr");
        this.totalPriceLabel = this.page.locator("//td[@class='total-price']");
    }

    async goto() {
        await this.openMaterialPage();
        await this.gotoPage(this.xpathProductPage);
    }

    getAddToCartButton(productid: number): Locator {
        return this.page.locator(`//button[@data-product-id='${productid}']`);
    }

    async addProductToCart(productid: number, quantity: number = 1) {
        await this.getAddToCartButton(productid).click({ clickCount: quantity });
    }

    getCartProductPrice(productName: string): Locator {
        return this.page.locator(`//tbody[@id='cart-items']/tr[td[text()='${productName}']]/td[2]`);
    }

    getCartProductQuantity(productName: string): Locator {
        return this.page.locator(`//tbody[@id='cart-items']/tr[td[text()='${productName}']]/td[3]`);
    }

    getCartProductTotal(productName: string): Locator {
        return this.page.locator(`//tbody[@id='cart-items']/tr[td[text()='${productName}']]/td[4]`);
    }

    async parsePrice(amount: Locator) {
        const totalText = await amount.innerText()
        return parseFloat(totalText.replace('$', '').trim());
    }
}

export class TodoPage extends MaterialBasePag {
    newTaskInput: Locator;
    addTaskButton: Locator;

    constructor(page: Page) {
        super(page);
        this.newTaskInput = this.page.locator("//input[@id='new-task']");
        this.addTaskButton = this.page.locator("//button[@id='add-task']");
    }

    async goto() {
        await this.openMaterialPage();
        await this.gotoPage(this.xpathTodoPage);
    };

    async addTodoTask(task: string) {
        await this.newTaskInput.fill(task);
        await this.addTaskButton.click();
    }

    getTaskLocator(task: string): Locator {
        return this.page.locator(`//li[span[text()='${task}']]`);
    }

    getDeleteButtonByTaskName(task: string) {
        return this.page.locator(`//li[span[text()='${task}']]//button[text()='Delete']`);
    }

    async deleteTodoTask(task: string) {
        await this.getDeleteButtonByTaskName(task).click();
    }
}

export class PersonalNotePage extends MaterialBasePag {
    searchNote: Locator;
    titleInput: Locator;
    contentInput: Locator;
    noteTitles: Locator;
    noteContents: Locator;
    addNoteButton: Locator;

    constructor(page: Page) {
        super(page);
        this.searchNote = this.page.locator("//input[@id='search']");
        this.titleInput = this.page.locator("//input[@id='note-title']");
        this.contentInput = this.page.locator("//textarea[@id='note-content']");
        this.noteTitles = this.page.locator("//ul[@id='notes-list']//strong");
        this.noteContents = this.page.locator("//ul[@id='notes-list']//p");
        this.addNoteButton = this.page.locator("//button[@id='add-note']");
    }

    async goto() {
        await this.openMaterialPage();
        await this.gotoPage(this.personalNote);
    };

    async addNote(title: string, content: string) {
        await this.titleInput.fill(title);
        await this.contentInput.fill(content);
        await this.addNoteButton.click();
    }
}