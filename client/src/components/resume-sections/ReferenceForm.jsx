import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

export default function ReferenceForm({ data = {}, updateData }) {
  const {
    references = [
      {
        name: "",
        jobTitle: "",
        company: "",
        email: "",
        phone: "",
      },
    ],
  } = data;

  const handleChange = (index, field, value) => {
    const updatedReferences = references.map((ref, i) => {
      if (i === index) {
        return { ...ref, [field]: value };
      }
      return ref;
    });
    updateData({ ...data, references: updatedReferences });
  };

  const addReference = () => {
    updateData({
      ...data,
      references: [
        ...references,
        {
          name: "",
          jobTitle: "",
          company: "",
          email: "",
          phone: "",
        },
      ],
    });
  };

  const removeReference = (index) => {
    updateData({
      ...data,
      references: references.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-4">
      <ScrollArea className="h-[600px]">
        <div className="space-y-8">
          {references.map((reference, index) => (
            <div key={index} className="space-y-6 p-4 relative">
              {index > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => removeReference(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}

              <div className="grid gap-4">
                <div>
                  <Label htmlFor={`name-${index}`}>Full Name *</Label>
                  <Input
                    id={`name-${index}`}
                    value={reference.name}
                    onChange={(e) => handleChange(index, "name", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor={`jobTitle-${index}`}>Job Title *</Label>
                  <Input
                    id={`jobTitle-${index}`}
                    value={reference.jobTitle}
                    onChange={(e) => handleChange(index, "jobTitle", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor={`company-${index}`}>Company *</Label>
                  <Input
                    id={`company-${index}`}
                    value={reference.company}
                    onChange={(e) => handleChange(index, "company", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor={`email-${index}`}>Email *</Label>
                  <Input
                    id={`email-${index}`}
                    type="email"
                    value={reference.email}
                    onChange={(e) => handleChange(index, "email", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor={`phone-${index}`}>Phone Number</Label>
                  <Input
                    id={`phone-${index}`}
                    value={reference.phone}
                    onChange={(e) => handleChange(index, "phone", e.target.value)}
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
        size="sm"
        className="w-full"
        onClick={addReference}
      >
        <PlusCircle className="w-4 h-4 mr-2" />
        Add Reference
      </Button>
    </div>
  );
}