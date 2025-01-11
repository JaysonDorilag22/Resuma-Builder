import { PreviewControls } from "./components/PreviewControls";
import { useState } from "react";

export default function ResumePreview({ data }) {
  const [fontFamily, setFontFamily] = useState("Arial");
  const children = [];
  const hasContent = (section) => {
    if (!section) return false;
    if (Array.isArray(section)) {
      return (
        section.length > 0 &&
        section.some((item) =>
          Object.values(item).some((value) => value && value.trim() !== "")
        )
      );
    }
    return Object.values(section).some((value) => value && value.trim() !== "");
  };

  const personalInfo = data?.["personal-info"] || {};
  const skills = data?.skills || {};
  const experiences = data?.experience?.experiences || [];
  const educations = data?.education?.educations || [];
  const certifications = data?.certifications?.certifications || [];
  const projects = data?.projects?.projects || [];
  const references = data?.references?.references || [];

  const pageStyle = {
    width: "210mm", // Full A4 width
    height: "297mm", // Full A4 height
    fontFamily,
    transform: "scale(1)", // Set to 100% for now; you can scale up if needed
    transformOrigin: "top center",
    margin: "0 auto",
    border: "2px solid hsl(var(--border))",
  };
  
  const contentStyle = {
    width: "184.6mm", // Width adjusted for 1.27cm margins
    height: "271.6mm", // Height adjusted for 1.27cm margins
    padding: "12.7mm", // Set padding to match the Word margin
    boxSizing: "border-box", // Ensure padding is included in dimensions
  };
  
  // Adjusted font sizes for better readability at A4 size
  const headerStyle = {
    fontSize: "12pt", // Standard readable font size
    fontWeight: "bold",
    marginBottom: "2mm",
  };
  
  const bodyStyle = {
    fontSize: "10pt", // Standard body font size
    lineHeight: "1.5", // Keep a readable line height
  };
  
  const nameStyle = {
    fontSize: "14pt", // Larger for the name
    fontWeight: "bold",
    marginBottom: "2mm",
  };
  

  return (
    <div>
      <PreviewControls
        fontFamily={fontFamily}
        setFontFamily={setFontFamily}
        personalInfo={personalInfo} // Pass the actual data
        skills={skills}
        experiences={experiences}
        educations={educations}
        certifications={certifications}
        projects={projects}
        references={references}
      />

      <div className="flex justify-center overflow-hidden">
        <div id="resume-preview" style={pageStyle}>
          <div style={contentStyle}>
            {/* Personal Info Section */}
            {hasContent(personalInfo) && (
              <div className="text-left mb-1 border-b pb-3">
                <h1 style={nameStyle}>{personalInfo.fullName}</h1>
                <div
                  style={bodyStyle}
                  className=" space-x-2"
                >
                  {personalInfo.email && <span>{personalInfo.email}</span>}
                  {personalInfo.phone && (
                    <>
                      <span>|</span>
                      <span>{personalInfo.phone}</span>
                    </>
                  )}
                  {personalInfo.location && (
                    <>
                      <span>|</span>
                      <span>{personalInfo.location}</span>
                    </>
                  )}
                  {personalInfo.portfolio && (
                    <>
                      <span>|</span>
                      <span>{personalInfo.portfolio}</span>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Summary Section */}
            {personalInfo.summary && (
              <div className="mb-1">
                <h2 style={headerStyle} className="border-b">
                  Professional Summary
                </h2>
                <p style={bodyStyle} className="text-justify">
                  {personalInfo.summary}
                </p>
              </div>
            )}

            {/* Skills Section */}
            {hasContent(skills) && (
              <div className="mb-1">
                {skills.technicalSkills && (
                  <div className="mb-4">
                    <h2 style={headerStyle} className="border-b mb-2">
                      Technical Skills
                    </h2>
                    <p style={bodyStyle}>{skills.technicalSkills}</p>
                  </div>
                )}
                {skills.softSkills && (
                  <div>
                    <h2 style={headerStyle} className="border-b mb-2">
                      Soft Skills
                    </h2>
                    <p style={bodyStyle} className="text-justify">
                      {skills.softSkills}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Experience Section */}
            {hasContent(experiences) && (
              <div className="">
                <h2 style={headerStyle} className="border-b mb-2">
                  Work Experience
                </h2>
                {experiences.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between" style={bodyStyle}>
                      <h3 className="font-medium">{exp.jobTitle}</h3>
                      <span className="text-muted-foreground">
                        {exp.startDate} -{" "}
                        {exp.isPresent ? "Present" : exp.endDate}
                      </span>
                    </div>
                    <div style={bodyStyle}>
                      {exp.company} {exp.location && `• ${exp.location}`}
                    </div>
                    <p style={bodyStyle} className="mt-1">
                      {exp.responsibilities}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Education Section */}
            {hasContent(educations) && (
              <div className="mb-3">
                <h2 style={headerStyle} className="border-b mb-2">
                  Education
                </h2>
                {educations.map((edu, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between" style={bodyStyle}>
                      <h3 className="font-medium">{edu.degree}</h3>
                      <span className="text-muted-foreground">
                        {edu.startYear} -{" "}
                        {edu.isPresent ? "Present" : edu.endYear}
                      </span>
                    </div>
                    <div style={bodyStyle}>{edu.school}</div>
                    {edu.coursework && (
                      <p style={bodyStyle} className="mt-1">
                        {edu.coursework}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Projects Section */}
            {hasContent(projects) && (
              <div className="mb-3">
                <h2 style={headerStyle} className="border-b mb-2">
                  Projects
                </h2>
                {projects.map((project, index) => (
                  <div key={index} className="mb-3">
                    <h3 style={bodyStyle} className="font-medium">
                      {project.projectName}
                    </h3>
                    <div style={bodyStyle} className="text-muted-foreground">
                      {project.technologies}
                    </div>
                    {project.projectUrl && (
                      <div style={bodyStyle} className="text-blue-600">
                        {project.projectUrl}
                      </div>
                    )}
                    <p style={bodyStyle} className="mt-1">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Certifications Section */}
            {hasContent(certifications) && (
              <div className="mb-3">
                <h2 style={headerStyle} className="border-b mb-2">
                  Certifications
                </h2>
                {certifications.map((cert, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between" style={bodyStyle}>
                      <h3 className="font-medium">{cert.certificationName}</h3>
                      <span className="text-muted-foreground">
                        {cert.issueDate}
                      </span>
                    </div>
                    <div style={bodyStyle}>{cert.issuingOrganization}</div>
                    {cert.description && (
                      <p style={bodyStyle} className="mt-1">
                        {cert.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* References Section */}
            {hasContent(references) && (
              <div className="mb-3">
                <h2 style={headerStyle} className="border-b mb-2">
                  References
                </h2>
                {references.map((ref, index) => (
                  <div key={index} className="mb-3">
                    <div style={bodyStyle}>
                      <h3 className="font-medium">{ref.name}</h3>
                      <div className="text-muted-foreground">
                        {ref.jobTitle} {ref.company && `at ${ref.company}`}
                      </div>
                      <div>
                        {ref.email && <span>{ref.email}</span>}
                        {ref.email && ref.phone && <span> | </span>}
                        {ref.phone && <span>{ref.phone}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
