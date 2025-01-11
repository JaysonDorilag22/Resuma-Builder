import Header from "./components/Header";
import ResumeForm from "./ResumeForm";
import ResumePreview from "./ResumePreview";
import { useState } from "react";

export default function Form() {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      portfolio: "",
      summary: "",
      profileImage: "",
    },
    skills: {
      technicalSkills: "",
      softSkills: "",
    },
    experience: {
      experiences: [
        {
          // Add initial item
          jobTitle: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          isPresent: false,
          responsibilities: "",
        },
      ],
    },
    education: {
      educations: [
        {
          // Add initial item
          degree: "",
          school: "",
          graduationYear: "",
          coursework: "",
        },
      ],
    },
    certifications: {
      certifications: [
        {
          // Add initial item
          certificationName: "",
          issuingOrganization: "",
          issueDate: "",
          description: "",
        },
      ],
    },
    projects: {
      projects: [
        {
          // Add initial item
          projectName: "",
          technologies: "",
          projectUrl: "",
          description: "",
        },
      ],
    },
  });

  const handleUpdateData = (data) => {
    setResumeData(data);
  };

  return (
    <div className="min-h-screen">
    <Header />
    <main className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="w-full"> {/* Form column */}
          <ResumeForm data={resumeData} onUpdate={handleUpdateData} />
        </div>
        <div className="w-full lg:sticky lg:top-6"> {/* Preview column */}
          <ResumePreview data={resumeData} />
        </div>
      </div>
    </main>
  </div>
  );
}
