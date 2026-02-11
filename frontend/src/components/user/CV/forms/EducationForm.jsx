<<<<<<< Updated upstream
import { Trash2 } from 'lucide-react';

const EducationForm = ({ formData, setFormData }) => {
  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, {
        id: Date.now(),
        degree: '',
        school: '',
        location: '',
        graduationDate: '',
        gpa: ''
      }]
=======
import { Trash2 } from "lucide-react";

const EducationForm = ({ formData, setFormData }) => {
  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now(),
          degree: "",
          school: "",
          location: "",
          graduationDate: "",
          gpa: "",
        },
      ],
>>>>>>> Stashed changes
    }));
  };

  const removeEducation = (id) => {
    setFormData(prev => ({
      ...prev,
<<<<<<< Updated upstream
      education: prev.education.filter(e => e.id !== id)
=======
      education: prev.education.filter((e) => e.id !== id),
>>>>>>> Stashed changes
    }));
  };

  return (
    <div className="form-section">
      {formData.education.map((edu, index) => (
<<<<<<< Updated upstream
        <div key={edu.id} className="entry-card">
=======
        <div key={edu.id} className="entry-card break-inside-avoid">
>>>>>>> Stashed changes
          <div className="entry-header">
            <span className="">Education {index + 1}</span>
            {formData.education.length > 1 && (
              <button
                className="remove-entry-btn"
                onClick={() => removeEducation(edu.id)}
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>School / University *</label>
              <input
                type="text"
                placeholder="University Name"
                value={edu.school}
                onChange={(e) => {
                  const newEdu = [...formData.education];
                  newEdu[index].school = e.target.value;
                  setFormData({ ...formData, education: newEdu });
                }}
              />
            </div>
            <div className="form-group">
              <label>Degree *</label>
              <input
                type="text"
                placeholder="Bachelor of Science"
                value={edu.degree}
                onChange={(e) => {
                  const newEdu = [...formData.education];
                  newEdu[index].degree = e.target.value;
                  setFormData({ ...formData, education: newEdu });
                }}
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                placeholder="City, Country"
                value={edu.location}
                onChange={(e) => {
                  const newEdu = [...formData.education];
                  newEdu[index].location = e.target.value;
                  setFormData({ ...formData, education: newEdu });
                }}
              />
            </div>
            <div className="form-group">
              <label>Graduation Date</label>
              <input
                type="text"
                placeholder="MM/YYYY"
                value={edu.graduationDate}
                onChange={(e) => {
                  const newEdu = [...formData.education];
                  newEdu[index].graduationDate = e.target.value;
                  setFormData({ ...formData, education: newEdu });
                }}
              />
            </div>
            <div className="form-group">
              <label>GPA (Optional)</label>
              <input
                type="text"
                placeholder="3.8/4.0"
                value={edu.gpa}
                onChange={(e) => {
                  const newEdu = [...formData.education];
                  newEdu[index].gpa = e.target.value;
                  setFormData({ ...formData, education: newEdu });
                }}
              />
            </div>
          </div>
        </div>
      ))}
      <button className="add-entry-btn" onClick={addEducation}>
        + Add Education
      </button>
    </div>
  );
};

export default EducationForm;