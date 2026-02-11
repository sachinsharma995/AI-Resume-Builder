import React from "react";

<<<<<<< Updated upstream
const CreativeTemplate = ({ formData }) => (
  <div
    className="bg-white w-full border border-slate-300 min-h-[1400px] max-w-[820px] flex resume-root space-y-6"
    style={{ fontFamily: '"Poppins", sans-serif' }}
  >
    <div className="w-1/3 bg-gradient-to-b from-purple-600 to-purple-800 text-white p-8">
      {formData.fullName && (
        <h1 className="text-2xl font-bold mb-6 leading-tight">
          {formData.fullName}
        </h1>
      )}

      <div className="mb-8">
        <h2 className="text-sm font-bold uppercase tracking-wider mb-3 opacity-90">
          Contact
        </h2>
        <div className="space-y-2 text-sm">
          {formData.email && <div className="break-all">{formData.email}</div>}
          {formData.phone && <div>{formData.phone}</div>}
          {formData.location && <div>{formData.location}</div>}
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

      {(formData.skills?.technical?.length > 0 ||
        formData.skills?.soft?.length > 0) && (
        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-3 opacity-90">
            Skills
          </h2>
          {formData.skills.technical?.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xs font-semibold mb-2 opacity-80">
                Technical
              </h3>
              <div className="space-y-1.5">
                {formData.skills.technical.map((skill, idx) => (
                  <div key={idx} className="text-sm">
                    • {skill}
                  </div>
                ))}
              </div>
            </div>
          )}
          {formData.skills.soft?.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold mb-2 opacity-80">
                Soft Skills
              </h3>
              <div className="space-y-1.5">
                {formData.skills.soft.map((skill, idx) => (
                  <div key={idx} className="text-sm">
                    • {skill}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {formData.certifications?.some((cert) => cert.name) && (
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider mb-3 opacity-90">
            Certifications
          </h2>
          {formData.certifications
            .filter((cert) => cert.name)
            .map((cert, idx) => (
              <div key={idx} className="mb-3 text-sm">
                <div className="font-semibold">{cert.name}</div>
                {cert.issuer && (
                  <div className="text-xs opacity-80 mt-0.5">{cert.issuer}</div>
                )}
                {cert.date && (
                  <div className="text-xs opacity-80">{cert.date}</div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>

    <div className="flex-1 p-10">
      {formData.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-purple-700 mb-3 uppercase tracking-wide">
            Profile
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            {formData.summary}
          </p>
        </div>
      )}

      {formData.experience?.some((exp) => exp.company || exp.title) && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-purple-700 mb-4 uppercase tracking-wide">
            Experience
          </h2>
          {formData.experience
            .filter((exp) => exp.company || exp.title)
            .map((exp, idx) => (
              <div
                key={idx}
                className="mb-6 last:mb-0 relative pl-4 border-l-2 border-purple-300"
              >
                {exp.title && (
                  <h3 className="font-bold text-slate-900 text-base">
                    {exp.title}
                  </h3>
                )}
                {exp.company && (
                  <div className="text-purple-600 font-semibold text-sm">
                    {exp.company}
                  </div>
                )}
                <div className="text-xs text-slate-600 mt-1">
                  {exp.location} • {exp.startDate} - {exp.endDate}
                </div>
                {exp.description && (
                  <p className="text-sm text-slate-700 leading-relaxed mt-2 whitespace-pre-line">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
        </div>
      )}

      {formData.education?.some((edu) => edu.school || edu.degree) && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-purple-700 mb-4 uppercase tracking-wide">
            Education
          </h2>
          {formData.education
            .filter((edu) => edu.school || edu.degree)
            .map((edu, idx) => (
              <div
                key={idx}
                className="mb-4 last:mb-0 relative pl-4 border-l-2 border-purple-300"
              >
                {edu.degree && (
                  <h3 className="font-bold text-slate-900 text-base">
                    {edu.degree}
                  </h3>
                )}
                {edu.school && (
                  <div className="text-purple-600 font-semibold text-sm">
                    {edu.school}
                  </div>
                )}
                <div className="text-xs text-slate-600 mt-1">
                  {edu.location} • {edu.graduationDate}
                </div>
                {edu.gpa && (
                  <div className="text-sm text-slate-700 mt-1">
                    GPA: {edu.gpa}
                  </div>
                )}
              </div>
            ))}
        </div>
      )}

      {formData.projects?.some((project) => project.name) && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-purple-700 mb-4 uppercase tracking-wide">
            Projects
          </h2>
          {formData.projects
            .filter((project) => project.name)
            .map((project, idx) => (
              <div
                key={idx}
                className="mb-4 last:mb-0 relative pl-4 border-l-2 border-purple-300"
              >
                {project.name && (
                  <h3 className="font-bold text-slate-900 text-base">
                    {project.name}
                  </h3>
                )}
                {project.technologies && (
                  <div className="text-sm text-purple-600 font-medium mt-1">
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
);
=======
const CreativeTemplate = ({ formData }) => {
  // Helper for required fields
  const req = (field, label) =>
    field || <span className="text-red-300 italic">[{label} Required]</span>;

  if (!formData) return null;

  return (
    <div
      className="resume-root bg-white mx-auto text-slate-800"
      style={{
        width: "794px",
        minHeight: "1123px", // Standard A4 height
        boxSizing: "border-box",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* ===== CREATIVE HEADER ===== */}
      <header className="bg-slate-900 text-white p-12 flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-extrabold tracking-tighter mb-2">
            {req(formData.fullName, "Full Name")}
          </h1>
          <p className="text-xl text-emerald-400 font-medium tracking-wide">
            {formData.experience?.[0]?.title || "Creative Professional"}
          </p>
        </div>
        <div className="text-right text-sm space-y-1 text-slate-300">
          <p>{req(formData.email, "Email")}</p>
          <p>{formData.phone}</p>
          <p>{formData.location}</p>
        </div>
      </header>

      <div className="flex">
        {/* ===== LEFT COLUMN: Main Info ===== */}
        <main className="w-2/3 p-12 pt-10">
          {/* Summary */}
          <section className="mb-12">
            <h2 className="text-emerald-600 font-bold text-xs uppercase tracking-[0.3em] mb-4">
              About Me
            </h2>
            <p className="text-lg leading-relaxed font-light text-slate-600">
              {formData.summary}
            </p>
          </section>

          {/* Experience with Timeline UI */}
          <section className="mb-12">
            <h2 className="text-emerald-600 font-bold text-xs uppercase tracking-[0.3em] mb-8">
              Work Path
            </h2>
            <div className="space-y-10 border-l-2 border-slate-100 ml-2">
              {formData.experience?.map((exp, i) => (
                <div key={i} className="relative pl-8">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-emerald-500" />

                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-xl font-bold text-slate-800">
                      {exp.company}
                    </h3>
                    <span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded text-slate-500">
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  <p className="text-emerald-600 font-semibold mb-3">
                    {exp.title}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* ===== RIGHT COLUMN: Sidebar ===== */}
        <aside className="w-1/3 bg-slate-50 p-10 pt-10">
          {/* Skills with Progress Dots */}
          <section className="mb-10">
            <h2 className="text-slate-900 font-bold text-xs uppercase tracking-[0.2em] mb-6">
              Expertise
            </h2>
            <div className="flex flex-wrap gap-2">
              {formData.skills?.technical?.map((skill, i) => (
                <span
                  key={i}
                  className="bg-white shadow-sm border border-slate-200 px-3 py-1.5 rounded-full text-xs font-medium text-slate-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="mb-10">
            <h2 className="text-slate-900 font-bold text-xs uppercase tracking-[0.2em] mb-6">
              Education
            </h2>
            {formData.education?.map((edu, i) => (
              <div key={i} className="mb-6">
                <p className="font-bold text-sm text-slate-800">{edu.school}</p>
                <p className="text-xs text-slate-500 mt-1">{edu.degree}</p>
                <p className="text-[10px] text-emerald-600 font-bold uppercase mt-1">
                  {edu.graduationDate}
                </p>
              </div>
            ))}
          </section>

          {/* Projects/Links */}
          <section>
            <h2 className="text-slate-900 font-bold text-xs uppercase tracking-[0.2em] mb-6">
              Portfolios
            </h2>
            <div className="space-y-4">
              {formData.projects?.map((proj, i) => (
                <div key={i} className="group">
                  <p className="text-sm font-bold group-hover:text-emerald-600 transition-colors cursor-default">
                    {proj.name}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">
                    {proj.link}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>

      {/* Page 2 Start - Content Wrapper */}
      <div className="break-before-page p-12">
        {/* Additional content that overflows from page 1 will naturally land here */}
        {formData.certifications?.length > 0 && (
          <section>
            <h2 className="text-emerald-600 font-bold text-xs uppercase tracking-[0.3em] mb-6 text-center">
              Certifications & Awards
            </h2>
            <div className="grid grid-cols-2 gap-6">
              {formData.certifications.map((cert, i) => (
                <div key={i} className="border border-slate-100 p-4 rounded-lg">
                  <p className="font-bold text-slate-800 text-sm">
                    {cert.name}
                  </p>
                  <p className="text-xs text-slate-500">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
>>>>>>> Stashed changes

export default CreativeTemplate;
