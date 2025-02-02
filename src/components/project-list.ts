import { Autobind } from "../decorators/autobind";
import { DragTarget } from "../models/drag-drop";
import { Project, ProjectStatus } from "../models/project";
import { projectState } from "../state/project-state";
import ComponentBase from "./base-component";
import { ProjectItem } from "./project-item";

export class ProjectList
    extends ComponentBase<HTMLDivElement, HTMLElement>
    implements DragTarget
{
    assignedProjects: Project[] = [];

    constructor(private type: "active" | "finished") {
        super("project-list", "app", false, `${type}-projects`);

        this.configure();
        this.renderContent();
    }

    configure() {
        this.element.addEventListener("dragover", this.dragOverHandler);
        this.element.addEventListener("drop", this.dropHandler);
        this.element.addEventListener("dragleave", this.dragLeaveHandler);

        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter((project) => {
                if (this.type === "active") {
                    return project.status === ProjectStatus.Active;
                } else {
                    return project.status === ProjectStatus.Finished;
                }
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }

    @Autobind
    dragOverHandler(event: DragEvent): void {
        if (
            event.dataTransfer &&
            event.dataTransfer.types[0] === "text/plain"
        ) {
            event.preventDefault(); // default is to not allow dropping, so prevent the default
            const listEl = this.element.querySelector("ul");
            listEl!.classList.add("droppable");
        }
    }

    @Autobind
    dropHandler(event: DragEvent): void {
        const projectId = event.dataTransfer!.getData("text/plain");
        projectState.moveProject(
            projectId,
            this.type === "active"
                ? ProjectStatus.Active
                : ProjectStatus.Finished
        );
    }

    @Autobind
    dragLeaveHandler(_: DragEvent): void {
        const listEl = this.element.querySelector("ul");
        listEl!.classList.remove("droppable");
    }

    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector("ul")!.id = listId;
        this.element.querySelector("h2")!.textContent =
            this.type.toUpperCase() + " PROJECTS";
    }

    private renderProjects() {
        const listEl = document.getElementById(
            `${this.type}-projects-list`
        )! as HTMLUListElement;
        listEl.innerHTML = "";
        for (const project of this.assignedProjects) {
            new ProjectItem(this.element.querySelector("ul")!.id, project);
        }
    }
}
