import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"
import { PlusCircle, Trash2 } from "lucide-react"
import { Checkbox } from "../ui/checkbox"

export default function EducationForm({ data = {}, updateData }) {
  const { educations = [{
    degree: '',
    school: '',
    startYear: '',
    endYear: '',
    isPresent: false,
    coursework: ''
  }] } = data;

  const handleChange = (index, field, value) => {
    const updatedEducations = educations.map((edu, i) => {
      if (i === index) {
        if (field === 'isPresent') {
          return {
            ...edu,
            isPresent: value,
            endYear: value ? '' : edu.endYear // Clear endYear if Present is checked
          };
        }
        return { ...edu, [field]: value };
      }
      return edu;
    });
    updateData({ ...data, educations: updatedEducations });
  };

  const addEducation = () => {
    updateData({
      ...data,
      educations: [...educations, {
        degree: '',
        school: '',
        startYear: '',
        endYear: '',
        isPresent: false,
        coursework: ''
      }]
    });
  };

  const removeEducation = (index) => {
    updateData({
      ...data,
      educations: educations.filter((_, i) => i !== index)
    })
  }

  return (
    <div className="space-y-4">
      <ScrollArea className="h-[600px]">
        <div className="space-y-4">
          {educations.map((education, index) => (
            <div key={index} className="space-y-6 p-4 relative">
              {index > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => removeEducation(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
              
              <div className="grid gap-4">
                <div>
                  <Label htmlFor={`degree-${index}`}>Degree/Qualification *</Label>
                  <Input 
                    id={`degree-${index}`}
                    value={education.degree}
                    onChange={(e) => handleChange(index, 'degree', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor={`school-${index}`}>School/University *</Label>
                  <Input 
                    id={`school-${index}`}
                    value={education.school}
                    onChange={(e) => handleChange(index, 'school', e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`startYear-${index}`}>Start Year</Label>
                    <Input 
                      id={`startYear-${index}`}
                      type="number"
                      value={education.startYear}
                      onChange={(e) => handleChange(index, 'startYear', e.target.value)}
                      placeholder="YYYY"
                      min="1900"
                      max="2099"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`endYear-${index}`}>End Year</Label>
                    <div className="space-y-2">
                      <Input 
                        id={`endYear-${index}`}
                        type="number"
                        value={education.endYear}
                        onChange={(e) => handleChange(index, 'endYear', e.target.value)}
                        placeholder="YYYY"
                        min="1900"
                        max="2099"
                        disabled={education.isPresent}
                      />
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`isPresent-${index}`}
                          checked={education.isPresent || false}
                          onCheckedChange={(checked) => 
                            handleChange(index, 'isPresent', checked)
                          }
                        />
                        <Label htmlFor={`isPresent-${index}`}>Present</Label>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor={`coursework-${index}`}>Relevant Coursework</Label>
                  <Textarea 
                    id={`coursework-${index}`}
                    value={education.coursework}
                    onChange={(e) => handleChange(index, 'coursework', e.target.value)}
                    placeholder="List relevant courses..."
                    className="h-24"
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
        onClick={addEducation}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Education
      </Button>
    </div>
  )
}