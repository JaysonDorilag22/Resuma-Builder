import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"
import { PlusCircle, Trash2 } from "lucide-react"

export default function CertificationsForm({ data = {}, updateData }) {
  const { certifications = [{
    certificationName: '',
    issuingOrganization: '',
    issueDate: '',
    description: ''
  }] } = data

  const handleChange = (index, field, value) => {
    const updatedCertifications = certifications.map((cert, i) => {
      if (i === index) {
        return { ...cert, [field]: value }
      }
      return cert
    })
    updateData({ ...data, certifications: updatedCertifications })
  }

  const addCertification = () => {
    updateData({
      ...data,
      certifications: [...certifications, {
        certificationName: '',
        issuingOrganization: '',
        issueDate: '',
        description: ''
      }]
    })
  }

  const removeCertification = (index) => {
    updateData({
      ...data,
      certifications: certifications.filter((_, i) => i !== index)
    })
  }

  return (
    <div className="space-y-4">
      <ScrollArea className="h-[600px]">
        <div className="space-y-8">
          {certifications.map((certification, index) => (
            <div key={index} className="space-y-6 p-4 relative">
              {index > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => removeCertification(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
              
              <div className="grid gap-4">
                <div>
                  <Label htmlFor={`certificationName-${index}`}>Certification Name</Label>
                  <Input 
                    id={`certificationName-${index}`}
                    value={certification.certificationName}
                    onChange={(e) => handleChange(index, 'certificationName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`issuingOrganization-${index}`}>Issuing Organization</Label>
                  <Input 
                    id={`issuingOrganization-${index}`}
                    value={certification.issuingOrganization}
                    onChange={(e) => handleChange(index, 'issuingOrganization', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`issueDate-${index}`}>Issue Date</Label>
                  <Input 
                    id={`issueDate-${index}`}
                    type="month"
                    value={certification.issueDate}
                    onChange={(e) => handleChange(index, 'issueDate', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`description-${index}`}>Description</Label>
                  <Textarea 
                    id={`description-${index}`}
                    value={certification.description}
                    onChange={(e) => handleChange(index, 'description', e.target.value)}
                    placeholder="Brief description of the certification..."
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
        onClick={addCertification}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Certification
      </Button>
    </div>
  )
}