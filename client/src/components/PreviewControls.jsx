import { Button } from "./ui/button";
import { Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

export function PreviewControls({
  fontFamily,
  setFontFamily,
  personalInfo,
  skills,
  experiences,
  educations,
  certifications,
  projects,
}) {
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

  const createHeading = (text) => {
    return new Paragraph({
      children: [
        new TextRun({
          text,
          bold: true,
          size: 28,
          color: "000000",
        }),
      ],
      spacing: { before: 200, after: 50 },
    });
  };

  const separator = new Paragraph({
    children: [
      new TextRun({
        text: "________________________________________________________________________________________________________",
        color: "E8E7E6",
      }),
    ],
    spacing: { before: 0, after: 50 },
  });

  const exportToWord = async () => {
    try {
      const children = [];

      // Personal Info
      if (personalInfo?.fullName?.trim()) {
        children.push(
          new Paragraph({
            alignment: "center",
            children: [
              new TextRun({
                text: personalInfo.fullName,
                bold: true,
                size: 32,
                color: "000000",
              }),
            ],
            spacing: { after: 50 },
          })
        );

        const contactInfo = [
          personalInfo.email,
          personalInfo.phone,
          personalInfo.location,
          personalInfo.portfolio,
        ].filter(Boolean);

        if (contactInfo.length > 0) {
          children.push(
            new Paragraph({
              alignment: "center",
              children: [
                new TextRun({
                  text: contactInfo.join("  |  "),
                  size: 24,
                  color: "000000",
                }),
              ],
              spacing: { after: 50 },
            })
          );
          children.push(separator);
        }
      }

      // Summary
      if (personalInfo?.summary?.trim()) {
        children.push(createHeading("Professional Summary"));
        children.push(separator);
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: personalInfo.summary,
                size: 24,
                color: "000000",
              }),
            ],
            spacing: { after: 300 },
          })
        );
      }

      // Technical Skills
      if (skills?.technicalSkills?.trim()) {
        children.push(createHeading("Technical Skills"));
        children.push(separator);
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: skills.technicalSkills,
                size: 24,
                color: "000000",
              }),
            ],
            spacing: { after: 300 },
          })
        );
      }

      // Soft Skills section
      if (skills?.softSkills?.trim()) {
        children.push(createHeading("Soft Skills"));
        children.push(separator);
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: skills.softSkills,
                size: 24,
                color: "000000",
              }),
            ],
            spacing: { after: 300 },
          })
        );
      }

      // Update Experience Section
      if (hasContent(experiences)) {
        children.push(createHeading("Work Experience"));
        children.push(separator);
        experiences.forEach((exp, index) => {
          if (exp.jobTitle?.trim() || exp.company?.trim()) {
            // First: Date
            if (exp.startDate) {
              children.push(
                new Paragraph({
                  alignment: "right",
                  children: [
                    new TextRun({
                      text: `${exp.startDate} - ${
                        exp.isPresent ? "Present" : exp.endDate || ""
                      }`,
                      size: 24,
                      color: "000000",
                    }),
                  ],
                })
              );
            }
            // Second: Job Title
            children.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: exp.jobTitle || "",
                    bold: true,
                    size: 24,
                    color: "000000",
                  }),
                ],
              })
            );
            // Third: Company and Location
            if (exp.company) {
              children.push(
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `${exp.company}${
                        exp.location ? ` • ${exp.location}` : ""
                      }`,
                      size: 24,
                      color: "000000",
                    }),
                  ],
                })
              );
            }
            // In Experience section, update Responsibilities
            if (exp.responsibilities?.trim()) {
              children.push(
                new Paragraph({
                  children: [
                    new TextRun({
                      text: exp.responsibilities,
                      size: 24,
                      color: "000000",
                    }),
                  ],
                  spacing: {
                    after: index === experiences.length - 1 ? 200 : 100,
                  },
                })
              );
            }
          }
        });
      }

      // Update Education Section
      if (hasContent(educations)) {
        children.push(createHeading("Education"));
        children.push(separator);
        educations.forEach((edu, index) => {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: edu.degree || "",
                  bold: true,
                  size: 24,
                  color: "000000",
                }),
                new TextRun({
                  text: "\t",
                }),
                new TextRun({
                  text: `${edu.startYear} - ${
                    edu.isPresent ? "Present" : edu.endYear || ""
                  }`,
                  size: 24,
                  color: "000000",
                }),
              ],
              tabStops: [
                {
                  type: "right",
                  position: 11000,
                },
              ],
            })
          );

          if (edu.school?.trim()) {
            children.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: edu.school,
                    size: 24,
                    color: "000000",
                  }),
                ],
              })
            );
          }

          if (edu.coursework?.trim()) {
            children.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: edu.coursework,
                    size: 24,
                    color: "000000",
                  }),
                ],
                spacing: { after: index === educations.length - 1 ? 200 : 100 },
              })
            );
          }
        });
      }

      // Projects
      if (hasContent(projects)) {
        children.push(createHeading("Projects"));
        children.push(separator);
        projects.forEach((project, index) => {
          if (project.projectName?.trim()) {
            children.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: project.projectName,
                    bold: true,
                    size: 24,
                    color: "000000",
                  }),
                ],
              })
            );
            if (project.technologies?.trim()) {
              children.push(
                new Paragraph({
                  children: [
                    new TextRun({
                      text: project.technologies,
                      size: 24,
                      color: "000000",
                    }),
                  ],
                })
              );
            }
            if (project.projectUrl?.trim()) {
              children.push(
                new Paragraph({
                  children: [
                    new TextRun({
                      text: project.projectUrl,
                      size: 24,
                      color: "000000",
                    }),
                  ],
                })
              );
            }
            if (project.description?.trim()) {
              children.push(
                new Paragraph({
                  children: [
                    new TextRun({
                      text: project.description,
                      size: 24,
                      color: "000000",
                    }),
                  ],
                  spacing: { after: index === projects.length - 1 ? 200 : 100 },
                })
              );
            }
          }
        });
      }

      // Update Certifications Section
      if (hasContent(certifications)) {
        children.push(createHeading("Certifications"));
        children.push(separator);
        certifications.forEach((cert, index) => {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: cert.certificationName || "",
                  bold: true,
                  size: 24,
                  color: "000000",
                }),
                new TextRun({
                  text: "\t",
                }),
                new TextRun({
                  text: cert.issueDate || "",
                  size: 24,
                  color: "000000",
                }),
              ],
              tabStops: [
                {
                  type: "right",
                  position: 11000,
                },
              ],
            })
          );

          if (cert.issuingOrganization?.trim()) {
            children.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: cert.issuingOrganization,
                    size: 24,
                    color: "000000",
                  }),
                ],
              })
            );
          }

          if (cert.description?.trim()) {
            children.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: cert.description,
                    size: 24,
                    color: "000000",
                  }),
                ],
                spacing: {
                  after: index === certifications.length - 1 ? 200 : 100,
                },
              })
            );
          }
        });
      }

      const doc = new Document({
        sections: [
          {
            properties: {
              page: {
                margin: {
                  top: "1.27cm",
                  right: "1.27cm",
                  bottom: "1.27cm",
                  left: "1.27cm",
                },
              },
            },
            children: children,
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, "resume.docx");
    } catch (error) {
      console.error("Error creating Word document:", error);
    }
  };

  return (
    <div className="mb-4 flex justify-between items-center sticky top-0 bg-background z-10 py-2">
      <div className="flex items-center gap-4">
        <Select value={fontFamily} onValueChange={setFontFamily}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select font" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Arial">Arial</SelectItem>
            <SelectItem value="Times New Roman">Times New Roman</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="sm" onClick={exportToWord}>
          <Download className="w-4 h-4 mr-2" />
          Word
        </Button>
      </div>
    </div>
  );
}
