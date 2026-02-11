import React from "react";

<<<<<<< Updated upstream
const ExecutiveTemplate = ({ formData }) => (
  <div
    className="bg-white resume-root space-y-6 w-full border border-slate-300 min-h-[1400px] max-w-[820px] flex flex-col"
    style={{ fontFamily: '"Georgia", serif' }}
  >
    <div className="bg-slate-900 text-white px-12 py-8">
      {formData.fullName && (
        <h1 className="text-3xl font-bold mb-2 tracking-wide">
          {formData.fullName}
        </h1>
      )}
      <div className="text-slate-300 text-sm">
        {[formData.email, formData.phone, formData.location]
          .filter(Boolean)
          .join(" • ")}
      </div>
    </div>

    <div className="flex flex-1">
      <div className="w-2/5 bg-slate-50 p-8 border-r border-slate-200">
        {(formData.linkedin || formData.github || formData.website) && (
          <div className="mb-8">
            <h2 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider border-b border-slate-300 pb-2">
              Links
            </h2>
            <div className="space-y-2 text-sm text-slate-700">
              {formData.linkedin && (
                <div className="break-all">{formData.linkedin}</div>
              )}
              {formData.github && (
                <div className="break-all">{formData.github}</div>
              )}
              {formData.website && (
                <div className="break-all">{formData.website}</div>
              )}
            </div>
          </div>
        )}

        {(formData.skills?.technical?.length > 0 ||
          formData.skills?.soft?.length > 0) && (
          <div className="mb-8">
            <h2 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider border-b border-slate-300 pb-2">
              Expertise
            </h2>
            {formData.skills.technical?.length > 0 && (
              <div className="mb-4">
                <h3 className="text-xs font-semibold text-slate-700 mb-2">
                  Technical
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {formData.skills.technical.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-white border border-slate-300 rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {formData.skills.soft?.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-slate-700 mb-2">
                  Leadership
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {formData.skills.soft.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-white border border-slate-300 rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {formData.education?.some((edu) => edu.school || edu.degree) && (
          <div className="mb-8">
            <h2 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider border-b border-slate-300 pb-2">
              Education
            </h2>
            {formData.education
              .filter((edu) => edu.school || edu.degree)
              .map((edu, idx) => (
                <div key={idx} className="mb-4 last:mb-0 text-sm">
                  {edu.degree && (
                    <div className="font-semibold text-slate-900">
                      {edu.degree}
                    </div>
                  )}
                  {edu.school && (
                    <div className="text-slate-700">{edu.school}</div>
                  )}
                  {edu.graduationDate && (
                    <div className="text-xs text-slate-600 mt-1">
                      {edu.graduationDate}
                    </div>
                  )}
                  {edu.gpa && (
                    <div className="text-xs text-slate-600">GPA: {edu.gpa}</div>
                  )}
                </div>
              ))}
          </div>
        )}

        {formData.certifications?.some((cert) => cert.name) && (
          <div>
            <h2 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider border-b border-slate-300 pb-2">
              Certifications
            </h2>
            {formData.certifications
              .filter((cert) => cert.name)
              .map((cert, idx) => (
                <div key={idx} className="mb-3 text-sm">
                  <div className="font-semibold text-slate-900">
                    {cert.name}
                  </div>
                  {cert.issuer && (
                    <div className="text-xs text-slate-700">{cert.issuer}</div>
                  )}
                  {cert.date && (
                    <div className="text-xs text-slate-600">{cert.date}</div>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>

      <div className="flex-1 p-10">
        {formData.summary && (
          <div className="mb-10">
            <h2 className="text-base font-bold text-slate-900 mb-3 uppercase tracking-wider">
              Executive Summary
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              {formData.summary}
            </p>
          </div>
        )}

        {formData.experience?.some((exp) => exp.company || exp.title) && (
          <div className="mb-10">
            <h2 className="text-base font-bold text-slate-900 mb-4 uppercase tracking-wider">
              Professional Experience
            </h2>
            {formData.experience
              .filter((exp) => exp.company || exp.title)
              .map((exp, idx) => (
                <div key={idx} className="mb-6 last:mb-0">
                  {exp.title && (
                    <h3 className="font-bold text-slate-900 text-base">
                      {exp.title}
                    </h3>
                  )}
                  <div className="flex justify-between items-baseline text-sm mt-1 mb-2">
                    {exp.company && (
                      <span className="text-slate-700 font-semibold">
                        {exp.company}
                      </span>
                    )}
                    <span className="text-slate-600">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
          </div>
        )}

        {formData.projects?.some((project) => project.name) && (
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-4 uppercase tracking-wider">
              Key Projects
            </h2>
            {formData.projects
              .filter((project) => project.name)
              .map((project, idx) => (
                <div key={idx} className="mb-5 last:mb-0">
                  {project.name && (
                    <h3 className="font-bold text-slate-900 text-base">
                      {project.name}
                    </h3>
                  )}
                  {project.technologies && (
                    <div className="text-sm text-slate-600 italic mt-1">
                      {project.technologies}
                    </div>
                  )}
                  {project.description && (
                    <p className="text-sm text-slate-700 leading-relaxed mt-2 whitespace-pre-line">
                      {project.description}
                    </p>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

=======
// Section wrapper
const Section = ({ id, children }) => (
  <section data-cv-section={id} className="mb-6 last:mb-0">
    {children}
  </section>
);

const ExecutiveTemplate = ({ formData, onlySections }) => {
  // Check if a section should render
  const shouldRender = (id) => !onlySections || onlySections.includes(id);

  // REQUIRED fields
  if (!formData.fullName || !formData.email) {
    return (
      <div className="text-red-600 font-bold p-4 border border-red-300 rounded">
        Error: Full name and Email are required to generate this CV.
      </div>
    );
  }

  return (
    <div
      className="resume-root bg-white mx-auto text-gray-900 shadow-lg"
      style={{
        width: "794px",
        minHeight: "1123px",
        padding: "48px",
        fontFamily: '"Georgia", serif',
        boxSizing: "border-box",
      }}
    >
      {/* ===== HEADER ===== */}
      {shouldRender("header") && (
        <Section id="header">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight mb-1">
              {formData.fullName}
            </h1>
            <div className="text-sm text-gray-600 flex flex-wrap justify-center gap-x-3 gap-y-1">
              {[formData.email, formData.phone, formData.location, formData.linkedin, formData.github, formData.website]
                .filter(Boolean)
                .map((item, index, arr) => (
                  <span key={index} className="flex items-center">
                    {item}
                    {index < arr.length - 1 && <span className="mx-2">|</span>}
                  </span>
                ))}
            </div>
          </div>
        </Section>
      )}

      {/* ===== EXECUTIVE SUMMARY ===== */}
      {shouldRender("summary") && formData.summary && (
        <Section id="summary">
          <h2 className="text-2xl font-bold mb-2 border-b-2 border-gray-400 inline-block">
            EXECUTIVE SUMMARY
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">{formData.summary}</p>
        </Section>
      )}

      {/* ===== EXPERIENCE ===== */}
      {shouldRender("experience") &&
        formData.experience?.length > 0 && (
          <Section id="experience">
            <h2 className="text-2xl font-bold mb-2 border-b-2 border-gray-400 inline-block">
              EXPERIENCE
            </h2>
            {formData.experience.map((exp, idx) => (
              <div key={idx} className="mb-4 last:mb-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-lg">{exp.company}</h3>
                  {(exp.startDate || exp.endDate) && (
                    <span className="italic text-sm">{exp.startDate} – {exp.endDate || 'Present'}</span>
                  )}
                </div>
                {exp.title && <div className="italic mb-1">{exp.title}</div>}
                {exp.description && <p className="text-sm text-gray-700 whitespace-pre-line">{exp.description}</p>}
              </div>
            ))}
          </Section>
        )}

      {/* ===== EDUCATION ===== */}
      {shouldRender("education") &&
        formData.education?.length > 0 && (
          <Section id="education">
            <h2 className="text-2xl font-bold mb-2 border-b-2 border-gray-400 inline-block">
              EDUCATION
            </h2>
            {formData.education.map((edu, idx) => (
              <div key={idx} className="mb-4 last:mb-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-lg">{edu.school}</h3>
                  {edu.graduationDate && <span className="italic text-sm">{edu.graduationDate}</span>}
                </div>
                {edu.degree && <div className="italic mb-1">{edu.degree}</div>}
                {edu.gpa && <div className="text-sm text-gray-700">GPA: {edu.gpa}</div>}
              </div>
            ))}
          </Section>
        )}

      {/* ===== PROJECTS ===== */}
      {shouldRender("projects") &&
        formData.projects?.length > 0 && (
          <Section id="projects">
            <h2 className="text-2xl font-bold mb-2 border-b-2 border-gray-400 inline-block">
              PROJECTS
            </h2>
            {formData.projects.map((project, idx) => (
              <div key={idx} className="mb-4 last:mb-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold">{project.name}</h3>
                  {project.link && <span className="text-sm text-gray-600">{project.link}</span>}
                </div>
                {project.technologies && <div className="italic mb-1">{project.technologies}</div>}
                {project.description && <p className="text-sm text-gray-700 whitespace-pre-line">{project.description}</p>}
              </div>
            ))}
          </Section>
        )}

      {/* ===== SKILLS ===== */}
      {shouldRender("skills") &&
        (formData.skills?.technical?.length > 0 || formData.skills?.soft?.length > 0) && (
          <Section id="skills">
            <h2 className="text-2xl font-bold mb-2 border-b-2 border-gray-400 inline-block">
              SKILLS
            </h2>
            <div className="text-sm text-gray-700">
              {formData.skills.technical?.length > 0 && (
                <div className="mb-1">
                  <span className="font-semibold">Technical:</span> {formData.skills.technical.join(", ")}
                </div>
              )}
              {formData.skills.soft?.length > 0 && (
                <div>
                  <span className="font-semibold">Soft Skills:</span> {formData.skills.soft.join(", ")}
                </div>
              )}
            </div>
          </Section>
        )}

      {/* ===== CERTIFICATIONS ===== */}
      {shouldRender("certifications") &&
        formData.certifications?.length > 0 && (
          <Section id="certifications">
            <h2 className="text-2xl font-bold mb-2 border-b-2 border-gray-400 inline-block">
              CERTIFICATIONS
            </h2>
            {formData.certifications.map((cert, idx) => (
              <div key={idx} className="mb-3 last:mb-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-sm">{cert.name}</h3>
                  {cert.date && <span className="italic text-sm">{cert.date}</span>}
                </div>
                {cert.issuer && <div className="text-sm text-gray-700">{cert.issuer}</div>}
              </div>
            ))}
          </Section>
        )}
    </div>
  );
};

>>>>>>> Stashed changes
export default ExecutiveTemplate;
