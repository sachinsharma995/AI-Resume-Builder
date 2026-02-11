import { Trash2 } from 'lucide-react';

const ProjectsForm = ({ formData, setFormData }) => {
  const addProject = () => {
    setFormData(prev => ({
      ...prev,
<<<<<<< Updated upstream
      projects: [...prev.projects, {
        id: Date.now(),
        name: '',
        description: '',
        technologies: '',
        link: ''
      }]
=======
      projects: [
        ...prev.projects,
        {
          id: Date.now(),
          name: "",
          description: "",
          technologies: "",
          link: "",
        },
      ],
>>>>>>> Stashed changes
    }));
  };

  const removeProject = (id) => {
    setFormData(prev => ({
      ...prev,
<<<<<<< Updated upstream
      projects: prev.projects.filter(p => p.id !== id)
=======
      projects: prev.projects.filter((p) => p.id !== id),
>>>>>>> Stashed changes
    }));
  };

  return (
    <div className="form-section">
      <h3 className="form-section-title">Projects</h3>
      {formData.projects.map((project, index) => (
<<<<<<< Updated upstream
        <div key={project.id} className="entry-card">
=======
        <div key={project.id} className="entry-card break-inside-avoid">
>>>>>>> Stashed changes
          <div className="entry-header">
            <span className="">Project {index + 1}</span>
            {formData.projects.length > 1 && (
              <button
                className="remove-entry-btn"
                onClick={() => removeProject(project.id)}
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>Project Name *</label>
              <input
                type="text"
                placeholder="E-commerce Platform"
                value={project.name}
                onChange={(e) => {
                  const newProj = [...formData.projects];
                  newProj[index].name = e.target.value;
                  setFormData({ ...formData, projects: newProj });
                }}
              />
            </div>
            <div className="form-group">
              <label>Technologies Used</label>
              <input
                type="text"
                placeholder="React, Node.js, MongoDB"
                value={project.technologies}
                onChange={(e) => {
                  const newProj = [...formData.projects];
                  newProj[index].technologies = e.target.value;
                  setFormData({ ...formData, projects: newProj });
                }}
              />
            </div>
          </div>
          <div className="form-group full-width mt-4">
            <label>Description</label>
            <textarea
              placeholder="Describe the project and your contributions..."
              rows={3}
              value={project.description}
              onChange={(e) => {
                const newProj = [...formData.projects];
                newProj[index].description = e.target.value;
                setFormData({ ...formData, projects: newProj });
              }}
            />
          </div>
          <div className="form-group full-width mt-4">
            <label>Project Link (Optional)</label>
            <input
              type="text"
              placeholder="github.com/username/project"
              value={project.link}
              onChange={(e) => {
                const newProj = [...formData.projects];
                newProj[index].link = e.target.value;
                setFormData({ ...formData, projects: newProj });
              }}
            />
          </div>
        </div>
      ))}
      <button className="add-entry-btn" onClick={addProject}>
        + Add Project
      </button>
    </div>
  );
};

export default ProjectsForm;
