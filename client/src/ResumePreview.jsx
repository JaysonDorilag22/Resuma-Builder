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

  const getResponsiveScale = () => {
    // Calculate scale based on viewport width
    const pageWidth = 210; // mm
    const viewportWidth = window.innerWidth;
    const scale = Math.min((viewportWidth - 32) / pageWidth, 1);
    return scale;
  };
  
  const pageStyle = {
    width: "210mm",
    minHeight: "297mm",
    fontFamily,
    transform: `scale(${getResponsiveScale()})`,
    transformOrigin: "top center",
    margin: "0 auto",
    border: "2px solid hsl(var(--border))",
    "@media screen and (max-width: 768px)": {
      width: "100%",
      transform: "scale(1)",
      border: "none",
    },
    "@media print": {
      width: "210mm",
      height: "297mm",
      transform: "scale(1)",
    },
  };
  
  const contentStyle = {
    width: "100%",
    maxWidth: "184.6mm",
    minHeight: "271.6mm",
    padding: "clamp(1rem, 3vw, 12.7mm)",
    boxSizing: "border-box",
    margin: "0 auto",
    "@media screen and (max-width: 768px)": {
      padding: "1rem",
    },
  };
  
  const headerStyle = {
    fontSize: "clamp(1rem, 2vw, 12pt)",
    fontWeight: "bold",
    marginBottom: "clamp(0.5rem, 1vw, 2mm)",
  };
  
  const bodyStyle = {
    fontSize: "clamp(0.875rem, 1.5vw, 10pt)",
    lineHeight: "1.5",
  };
  
  const nameStyle = {
    fontSize: "clamp(1.25rem, 2.5vw, 14pt)",
    fontWeight: "bold",
    marginBottom: "clamp(0.5rem, 1vw, 2mm)",
  };
  
  // Add responsive container
  const containerStyle = {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "1rem",
    "@media screen and (max-width: 768px)": {
      padding: "0.5rem",
    },
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
