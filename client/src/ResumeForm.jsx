import { Button } from "./components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { ScrollArea } from "./components/ui/scroll-area"

// Import form sections
import PersonalInfoForm from "./components/resume-sections/PersonalInfoForm"
import SkillsForm from "./components/resume-sections/SkillsForm"
import ExperienceForm from "./components/resume-sections/ExperienceForm"
import EducationForm from "./components/resume-sections/EducationForm"
import CertificationsForm from "./components/resume-sections/CertificationsForm"
import ProjectsForm from "./components/resume-sections/ProjectsForm"

import {
  UserCircle,
  Briefcase,
  GraduationCap,
  Award,
  FolderGit2,
  Lightbulb,
  Users
} from "lucide-react"
import ReferenceForm from "./components/resume-sections/ReferenceForm"

export default function ResumeForm({ data, onUpdate }) {
  const updateResumeData = (section, sectionData) => {
    onUpdate({
      ...data,
      [section]: sectionData // Remove the special case for personal-info
    });
  }

  const sections = [
    {
      id: "personal-info",
      title: "Personal Info",
      icon: UserCircle,
      component: PersonalInfoForm,
      next: "skills"
    },
    { 
      id: "skills", 
      title: "Skills", 
      icon: Lightbulb, 
      component: SkillsForm,
      prev: "personal-info",
      next: "experience"
    },
    {
      id: "experience",
      title: "Experience",
      icon: Briefcase,
      component: ExperienceForm,
      prev: "skills", 
      next: "education"
    },
    {
      id: "education",
      title: "Education",
      icon: GraduationCap,
      component: EducationForm,
      prev: "experience",
      next: "certifications"
    },
    {
      id: "certifications",
      title: "Certifications",
      icon: Award,
      component: CertificationsForm,
      prev: "education",
      next: "projects"
    },
    {
      id: "projects",
      title: "Projects",
      icon: FolderGit2,
      component: ProjectsForm,
      prev: "certifications",
      next: "references" // Add next link to references
    },
    {
      id: "references",
      title: "References",
      icon: Users,
      component: ReferenceForm,
      prev: "projects"
    }
]

  return (
    <div className="p-5 border border-dashed">
    <Tabs defaultValue="personal-info" className="w-full">
      <TabsList className="flex justify-between w-full py-5">
        {sections.map(({ id, icon: Icon }) => (
          <TabsTrigger
            key={id}
            value={id}
            className="flex-1 flex items-center justify-center p-2"
          >
            <Icon className="w-5 h-5" />
          </TabsTrigger>
        ))}
      </TabsList>

      {sections.map(({ id, title, component: Component}) => (
        <TabsContent key={id} value={id}>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="text-muted-foreground">
                Fill in your {title.toLowerCase()} details below.
              </p>
            </div>
            
            <Component
              data={data[id]}
              updateData={(sectionData) => updateResumeData(id, sectionData)}
            />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  </div>
  )
}