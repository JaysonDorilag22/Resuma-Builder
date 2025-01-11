import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Badge } from "../ui/badge"

export default function SkillsForm({ data = {}, updateData }) {
  const {
    technicalSkills = '',
    softSkills = ''
  } = data

  const skillCategories = {
    frontend: ['React', 'Angular', 'Vue.js', 'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Redux', 'Next.js'],
    backend: ['Node.js', 'Express.js', 'Python', 'Django', 'FastAPI', 'Java Spring', 'RESTful APIs', 'GraphQL'],
    languages: ['JavaScript', 'Python', 'Java', 'C++', 'TypeScript', 'PHP', 'Ruby', 'Go'],
    database: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase'],
    tools: ['Git', 'Docker', 'AWS', 'Linux', 'CI/CD', 'Webpack', 'Jest']
  }

  const handleChange = (field, value) => {
    updateData({
      ...data,
      [field]: value
    })
  }

  const addSkill = (skill) => {
    const currentSkills = technicalSkills.split(',').map(s => s.trim()).filter(Boolean)
    if (!currentSkills.includes(skill)) {
      const newSkills = [...currentSkills, skill].join(', ')
      handleChange('technicalSkills', newSkills)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <Label>Select Technical Skills</Label>
        <div className="space-y-4 mb-4">
          {Object.entries(skillCategories).map(([category, skills]) => (
            <div key={category} className="space-y-2">
              <Label className="text-sm text-muted-foreground capitalize">{category}</Label>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge 
                    key={skill}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => addSkill(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Label htmlFor="technicalSkills">Technical Skills *</Label>
        <Textarea 
          id="technicalSkills"
          value={technicalSkills}
          onChange={(e) => handleChange('technicalSkills', e.target.value)}
          placeholder="Click skills above or type manually"
          className="h-32"
        />
      </div>
      <div>
        <Label htmlFor="softSkills">Soft Skills</Label>
        <Textarea 
          id="softSkills"
          value={softSkills}
          onChange={(e) => handleChange('softSkills', e.target.value)}
          placeholder="e.g., Leadership, Communication, Problem Solving"
          className="h-32"
        />
      </div>
    </div>
  )
}