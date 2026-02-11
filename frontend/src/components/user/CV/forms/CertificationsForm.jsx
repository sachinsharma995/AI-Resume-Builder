import { Trash2 } from 'lucide-react';

const CertificationsForm = ({ formData, setFormData }) => {
  const addCertification = () => {
    setFormData(prev => ({
      ...prev,
<<<<<<< Updated upstream
      certifications: [...prev.certifications, {
        id: Date.now(),
        name: '',
        issuer: '',
        date: '',
        link: ''
      }]
=======
      certifications: [
        ...prev.certifications,
        {
          id: Date.now(),
          name: "",
          issuer: "",
          date: "",
          link: "",
        },
      ],
>>>>>>> Stashed changes
    }));
  };

  const removeCertification = (id) => {
    setFormData(prev => ({
      ...prev,
<<<<<<< Updated upstream
      certifications: prev.certifications.filter(c => c.id !== id)
=======
      certifications: prev.certifications.filter((c) => c.id !== id),
>>>>>>> Stashed changes
    }));
  };

  const handleChange = (id, field, value) => {
<<<<<<< Updated upstream
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.map(c =>
        c.id === id ? { ...c, [field]: value } : c
      )
=======
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((c) =>
        c.id === id ? { ...c, [field]: value } : c,
      ),
>>>>>>> Stashed changes
    }));
  };

  return (
    <div className="form-section">
      {formData.certifications.map((cert, index) => (
<<<<<<< Updated upstream
        <div key={cert.id} className="entry-card">
=======
        <div key={cert.id} className="entry-card break-inside-avoid">
>>>>>>> Stashed changes
          <div className="entry-header">
            <span className=" ">Certification {index + 1}</span>
            {formData.certifications.length > 1 && (
              <button
                className="remove-entry-btn"
                onClick={() => removeCertification(cert.id)}
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>Certification Name *</label>
              <input
                type="text"
                placeholder="AWS Solutions Architect"
                value={cert.name}
<<<<<<< Updated upstream
                onChange={(e) => handleChange(cert.id, 'name', e.target.value)}
=======
                onChange={(e) => handleChange(cert.id, "name", e.target.value)}
>>>>>>> Stashed changes
              />
            </div>
            <div className="form-group">
              <label>Issuing Organization</label>
              <input
                type="text"
                placeholder="Amazon Web Services"
                value={cert.issuer}
<<<<<<< Updated upstream
                onChange={(e) => handleChange(cert.id, 'issuer', e.target.value)}
=======
                onChange={(e) =>
                  handleChange(cert.id, "issuer", e.target.value)
                }
>>>>>>> Stashed changes
              />
            </div>
            <div className="form-group">
              <label>Date Obtained</label>
              <input
                type="month"
                value={cert.date}
<<<<<<< Updated upstream
                onChange={(e) => handleChange(cert.id, 'date', e.target.value)}
=======
                onChange={(e) => handleChange(cert.id, "date", e.target.value)}
>>>>>>> Stashed changes
              />
            </div>
            <div className="form-group">
              <label>Credential Link (Optional)</label>
              <input
                type="text"
                placeholder="https://credential.url"
                value={cert.link}
<<<<<<< Updated upstream
                onChange={(e) => handleChange(cert.id, 'link', e.target.value)}
=======
                onChange={(e) => handleChange(cert.id, "link", e.target.value)}
>>>>>>> Stashed changes
              />
            </div>
          </div>
        </div>
      ))}
      <button className="add-entry-btn" onClick={addCertification}>
        + Add Certification
      </button>
    </div>
  );
};

export default CertificationsForm;
