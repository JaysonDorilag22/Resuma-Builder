import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";


export default function PersonalInfoForm({ data = {}, updateData }) {
  const {
    fullName = "",
    email = "",
    phone = "",
    location = "",
    portfolio = "",
    summary = "",
  } = data;

  const handleChange = (field, value) => {
    updateData({
      ...data,
      [field]: value,
    });
  };

 

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div>
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={location}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="City, State"
          />
        </div>
        <div>
          <Label htmlFor="portfolio">Portfolio/Website</Label>
          <Input
            id="portfolio"
            type="url"
            value={portfolio}
            onChange={(e) => handleChange("portfolio", e.target.value)}
            placeholder="https://"
          />
        </div>
        <div>
          <Label htmlFor="summary">Professional Summary</Label>
          <Textarea
            id="summary"
            value={summary}
            onChange={(e) => handleChange("summary", e.target.value)}
            placeholder="Brief overview of your professional background..."
            className="h-32"
          />
        </div>
      </div>
    </div>
  );
}
