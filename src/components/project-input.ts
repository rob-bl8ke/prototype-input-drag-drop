import { Autobind } from "../decorators/autobind.js";
import { projectState } from "../state/project-state.js";
import * as Validation from "../util/validation.js";
import { Component } from "./base-component.js";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        super("project-input", "app", true, "user-input");

        this.titleInputElement = this.element.querySelector(
            "#title"
        ) as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector(
            "#description"
        ) as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector(
            "#people"
        ) as HTMLInputElement;

        this.configure();
        this.renderContent();
    }

    configure() {
        this.element.addEventListener("submit", this.submitHandler);
    }

    renderContent() {
        // not doing much at the moment
    }

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle: Validation.Validatable = {
            value: this.titleInputElement.value,
            required: true,
            minLength: 5,
        };
        const enteredDescription: Validation.Validatable = {
            value: this.descriptionInputElement.value,
            required: true,
            minLength: 5,
        };
        const enteredPeople: Validation.Validatable = {
            value: +this.peopleInputElement.value,
            required: true,
            min: 1,
        };

        if (
            !Validation.validate(enteredTitle) ||
            !Validation.validate(enteredDescription) ||
            !Validation.validate(enteredPeople)
        ) {
            alert("Invalid input, please try again!");
            return;
        } else {
            return [
                enteredTitle.value as string,
                enteredDescription.value as string,
                +enteredPeople.value,
            ];
        }
    }

    private clearInputs() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    }

    @Autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        // A tuple is simply an array in JavaScript
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            projectState.addProject(title, desc, people);
            this.clearInputs();
        }
    }
}
