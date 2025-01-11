import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { PlusCircle, Trash2 } from "lucide-react";

export default function ProjectsForm({ data = {}, updateData }) {
  const {
    projects = [
      {
        projectName: "",
        technologies: "",
        projectUrl: "",
        description: "",
      },
    ],
  } = data;

  const handleChange = (index, field, value) => {
    const updatedProjects = projects.map((proj, i) => {
      if (i === index) {
        return { ...proj, [field]: value };
      }
      return proj;
    });
    updateData({ ...data, projects: updatedProjects });
  };

  const addProject = () => {
    updateData({
      ...data,
      projects: [
        ...projects,
        {
          projectName: "",
          technologies: "",
          projectUrl: "",
          description: "",
        },
      ],
    });
  };

  const removeProject = (index) => {
    updateData({
      ...data,
      projects: projects.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-4 ">
      <ScrollArea className="h-[600px]">
        <div className="space-y-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="space-y-6 p-4 relative"
            >
              {index > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => removeProject(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}

              <div className="grid gap-4">
                <div>
                  <Label htmlFor={`projectName-${index}`}>Project Name</Label>
                  <Input
                    id={`projectName-${index}`}
                    value={project.projectName}
                    onChange={(e) =>
                      handleChange(index, "projectName", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor={`technologies-${index}`}>
                    Technologies Used
                  </Label>
                  <Input
                    id={`technologies-${index}`}
                    value={project.technologies}
                    onChange={(e) =>
                      handleChange(index, "technologies", e.target.value)
                    }
                    placeholder="e.g., React, Node.js, MongoDB"
                  />
                </div>
                <div>
                  <Label htmlFor={`projectUrl-${index}`}>Project URL</Label>
                  <Input
                    id={`projectUrl-${index}`}
                    type="url"
                    value={project.projectUrl}
                    onChange={(e) =>
                      handleChange(index, "projectUrl", e.target.value)
                    }
                    placeholder="https://"
                  />
                </div>
                <div>
                  <Label htmlFor={`description-${index}`}>
                    Project Description
                  </Label>
                  <Textarea
                    id={`description-${index}`}
                    value={project.description}
                    onChange={(e) =>
                      handleChange(index, "description", e.target.value)
                    }
                    placeholder="Describe your project, its features, and your role..."
                    className="h-32"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={addProject}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Project
      </Button>
    </div>
  );
}
