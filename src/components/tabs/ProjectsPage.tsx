import { ProjectTemplate } from "../projects/ProjectTemplate"

type ProjectsProps = {
    current: string;
}

export const ProjectsPage: React.FC<ProjectsProps> = ({ current }) => {
    return (
      <div
        id="projects-content"
        className={`${
          current == "Projects" ? "flex opacity-100" : "hidden opacity-0"
        }`}
      >
        <span id="projects-header">Projects</span>
        <div id="project-scroller">
          <ProjectTemplate projectName="chrome-extension-project" />
          <ProjectTemplate projectName="michelin-project" />
          <ProjectTemplate projectName="us-census-project" />
        </div>
      </div>
    );
}