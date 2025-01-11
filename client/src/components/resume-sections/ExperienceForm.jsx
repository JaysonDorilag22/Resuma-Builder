import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { PlusCircle, Trash2 } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

export default function ExperienceForm({ data = {}, updateData }) {
  const {
    experiences = [
      {
        jobTitle: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        isPresent: false,
        responsibilities: "",
      },
    ],
  } = data;

  const handleChange = (index, field, value) => {
    const updatedExperiences = experiences.map((exp, i) => {
      if (i === index) {
        if (field === "isPresent") {
          return {
            ...exp,
            isPresent: value,
            endDate: value ? "" : exp.endDate, // Clear endDate if Present is checked
          };
        }
        return { ...exp, [field]: value };
      }
      return exp;
    });
    updateData({ ...data, experiences: updatedExperiences });
  };

  const addExperience = () => {
    updateData({
      ...data,
      experiences: [
        ...experiences,
        {
          jobTitle: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          isPresent: false,
          responsibilities: "",
        },
      ],
    });
  };

  const removeExperience = (index) => {
    updateData({
      ...data,
      experiences: experiences.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-4">
      <ScrollArea className="h-[600px]">
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <div key={index} className="space-y-6 p-4 relative">
              {index > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => removeExperience(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}

              <div className="grid gap-4">
                <div>
                  <Label htmlFor={`jobTitle-${index}`}>Job Title *</Label>
                  <Input
                    id={`jobTitle-${index}`}
                    value={experience.jobTitle}
                    onChange={(e) =>
                      handleChange(index, "jobTitle", e.target.value)
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor={`company-${index}`}>Company *</Label>
                  <Input
                    id={`company-${index}`}
                    value={experience.company}
                    onChange={(e) =>
                      handleChange(index, "company", e.target.value)
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor={`location-${index}`}>Location</Label>
                  <Input
                    id={`location-${index}`}
                    value={experience.location}
                    onChange={(e) =>
                      handleChange(index, "location", e.target.value)
                    }
                    placeholder="City, State"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                    <Input
                      id={`startDate-${index}`}
                      type="month"
                      value={experience.startDate}
                      onChange={(e) =>
                        handleChange(index, "startDate", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor={`endDate-${index}`}>End Date</Label>
                    <div className="space-y-2">
                      <Input
                        id={`endDate-${index}`}
                        type="month"
                        value={experience.endDate}
                        onChange={(e) =>
                          handleChange(index, "endDate", e.target.value)
                        }
                        disabled={experience.isPresent}
                      />
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`isPresent-${index}`}
                          checked={experience.isPresent || false}
                          onCheckedChange={(checked) =>
                            handleChange(index, "isPresent", checked)
                          }
                        />
                        <Label htmlFor={`isPresent-${index}`}>Present</Label>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor={`responsibilities-${index}`}>
                    Responsibilities & Achievements
                  </Label>
                  <Textarea
                    id={`responsibilities-${index}`}
                    value={experience.responsibilities}
                    onChange={(e) =>
                      handleChange(index, "responsibilities", e.target.value)
                    }
                    placeholder="• List your key responsibilities and achievements..."
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
        onClick={addExperience}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Experience
      </Button>
    </div>
  );
}
