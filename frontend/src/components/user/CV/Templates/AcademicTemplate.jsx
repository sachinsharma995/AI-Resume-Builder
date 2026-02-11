import React from "react";

<<<<<<< Updated upstream
const AcademicTemplate = ({ formData }) => (
  <div
    className="bg-white w-full border border-slate-300 p-16 min-h-[1400px] max-w-[820px ] resume-root space-y-6"
    style={{ fontFamily: '"Garamond", "Times New Roman", serif' }}
  >
    {formData.fullName && (
      <div className="text-center mb-8 border-b-2 border-slate-900 pb-4">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          {formData.fullName}
        </h1>
        <div className="text-slate-600 text-sm">
          {[formData.email, formData.phone, formData.location]
            .filter(Boolean)
            .join(" • ")}
        </div>
        {(formData.linkedin || formData.website) && (
          <div className="text-slate-600 text-sm mt-1">
            {[formData.linkedin, formData.website].filter(Boolean).join(" • ")}
          </div>
        )}
      </div>
    )}

    {formData.summary && (
      <div className="mb-10">
        <h2 className="text-lg font-bold text-slate-900 mb-3">
          Research Interests
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed">
          {formData.summary}
        </p>
      </div>
    )}

    {formData.education?.some((edu) => edu.school || edu.degree) && (
      <div className="mb-10">
        <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-300 pb-1">
          Education
        </h2>
        {formData.education
          .filter((edu) => edu.school || edu.degree)
          .map((edu, idx) => (
            <div key={idx} className="mb-5 last:mb-0">
              <div className="flex justify-between items-baseline">
                {edu.degree && (
                  <h3 className="font-bold text-slate-900 text-base">
                    {edu.degree}
                  </h3>
                )}
                {edu.graduationDate && (
                  <span className="text-sm text-slate-700">
                    {edu.graduationDate}
                  </span>
                )}
              </div>
              {edu.school && (
                <div className="text-slate-700 text-sm italic">
                  {edu.school}
                </div>
              )}
              {edu.gpa && (
                <div className="text-sm text-slate-600 mt-1">
                  GPA: {edu.gpa}
                </div>
              )}
            </div>
          ))}
      </div>
    )}

    {formData.experience?.some((exp) => exp.company || exp.title) && (
      <div className="mb-10">
        <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-300 pb-1">
          Research Experience
        </h2>
        {formData.experience
          .filter((exp) => exp.company || exp.title)
          .map((exp, idx) => (
            <div key={idx} className="mb-6 last:mb-0">
              <div className="flex justify-between items-baseline mb-1">
                {exp.title && (
                  <h3 className="font-bold text-slate-900 text-base">
                    {exp.title}
                  </h3>
                )}
                <span className="text-sm text-slate-700">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              {exp.company && (
                <div className="text-slate-700 text-sm italic mb-2">
                  {exp.company}
                </div>
              )}
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
      <div className="mb-10">
        <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-300 pb-1">
          Projects & Publications
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
              {project.description && (
                <p className="text-sm text-slate-700 leading-relaxed mt-1 whitespace-pre-line">
                  {project.description}
                </p>
              )}
              {project.link && (
                <div className="text-sm text-blue-600 mt-1">{project.link}</div>
              )}
            </div>
          ))}
      </div>
    )}

    {formData.skills?.technical?.length > 0 && (
      <div className="mb-10">
        <h2 className="text-lg font-bold text-slate-900 mb-3 border-b border-slate-300 pb-1">
          Technical Skills
        </h2>
        <p className="text-sm text-slate-700">
          {formData.skills.technical.join(", ")}
        </p>
      </div>
    )}

    {formData.certifications?.some((cert) => cert.name) && (
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-3 border-b border-slate-300 pb-1">
          Certifications & Awards
        </h2>
        {formData.certifications
          .filter((cert) => cert.name)
          .map((cert, idx) => (
            <div key={idx} className="mb-3 last:mb-0">
              <div className="flex justify-between items-baseline">
                {cert.name && (
                  <h3 className="font-semibold text-slate-900 text-sm">
                    {cert.name}
                  </h3>
                )}
                {cert.date && (
                  <span className="text-sm text-slate-700">{cert.date}</span>
                )}
              </div>
              {cert.issuer && (
                <div className="text-sm text-slate-700 italic">
                  {cert.issuer}
                </div>
              )}
            </div>
          ))}
      </div>
    )}
  </div>
);
=======
/**
 * AcademicTemplate - Focused on Research, Publications, and Education.
 * Designed for multi-page depth and clean serif typography.
 */
const AcademicTemplate = ({ formData }) => {
  // Requirement Helper
  const isRequired = (val, label) =>
    val || <span className="text-red-400">[{label} Missing]</span>;

  if (!formData) return null;

  return (
    <div
      className="resume-root bg-white mx-auto text-stone-900 print:shadow-none shadow-2xl"
      style={{
        width: "794px",
        minHeight: "1123px",
        padding: "60px 72px",
        fontFamily: "'Times New Roman', Times, serif",
        boxSizing: "border-box",
      }}
    >
      {/* ===== ACADEMIC HEADER ===== */}
      <header className="text-center mb-10 border-b-2 border-stone-800 pb-6">
        <h1 className="text-3xl font-normal uppercase tracking-tight mb-2 italic">
          {isRequired(formData.fullName, "Full Name")}
        </h1>
        <div className="text-[12px] space-y-1 text-stone-700">
          <p className="font-medium tracking-wide">
            {formData.location} • {isRequired(formData.email, "Email")} •{" "}
            {formData.phone}
          </p>
          <div className="flex justify-center gap-4 italic">
            {formData.website && <span>{formData.website}</span>}
            {formData.linkedin && <span>LinkedIn: {formData.linkedin}</span>}
          </div>
        </div>
      </header>

      {/* ===== RESEARCH INTERESTS / SUMMARY ===== */}
      {formData.summary && (
        <section className="mb-10">
          <h2 className="text-sm font-bold border-b border-stone-300 mb-3 uppercase tracking-widest">
            Research Interests
          </h2>
          <p className="text-[13px] leading-relaxed text-justify text-stone-800 italic">
            {formData.summary}
          </p>
        </section>
      )}

      {/* ===== EDUCATION (The Core of Academic CVs) ===== */}
      <section className="mb-10 break-inside-avoid">
        <h2 className="text-sm font-bold border-b border-stone-300 mb-4 uppercase tracking-widest">
          Education
        </h2>
        <div className="space-y-6">
          {formData.education?.map((edu, idx) => (
            <div key={idx} className="relative">
              <div className="flex justify-between font-bold text-[14px]">
                <span>{edu.school}</span>
                <span>{edu.graduationDate}</span>
              </div>
              <div className="flex justify-between italic text-[13px] mb-1">
                <span>{edu.degree}</span>
                <span>{edu.location}</span>
              </div>
              {edu.gpa && (
                <p className="text-[12px] text-stone-600">GPA: {edu.gpa}</p>
              )}
              {/* Note: In Academia, people often add "Thesis Title" here */}
            </div>
          ))}
        </div>
      </section>

      {/* ===== EXPERIENCE / RESEARCH POSITIONS ===== */}
      <section className="mb-10">
        <h2 className="text-sm font-bold border-b border-stone-300 mb-4 uppercase tracking-widest">
          Professional Appointments
        </h2>
        <div className="space-y-8">
          {formData.experience?.map((exp, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex justify-between font-bold text-[13px]">
                <span>{exp.company}</span>
                <span>
                  {exp.startDate} – {exp.endDate}
                </span>
              </div>
              <p className="italic text-[13px] mb-2">{exp.title}</p>
              <p className="text-[12px] leading-relaxed text-stone-700 whitespace-pre-line pl-4 border-l border-stone-200">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PUBLICATIONS / PROJECTS (Page 2 Friendly) ===== */}
      <section className="mb-10 page-break-before">
        <h2 className="text-sm font-bold border-b border-stone-300 mb-4 uppercase tracking-widest">
          Publications & Research Projects
        </h2>
        <div className="space-y-4">
          {formData.projects?.map((project, idx) => (
            <div key={idx} className="text-[13px] text-stone-800">
              <span className="font-bold">{project.name}</span>.
              <span className="italic"> {project.technologies}</span>.
              <p className="mt-1 text-stone-600 leading-snug">
                {project.description}
              </p>
              {project.link && (
                <p className="text-[11px] text-blue-800 underline mt-1">
                  {project.link}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ===== SKILLS & CERTIFICATIONS ===== */}
      <div className="grid grid-cols-2 gap-8">
        <section>
          <h2 className="text-sm font-bold border-b border-stone-300 mb-3 uppercase tracking-widest text-stone-500">
            Technical Skills
          </h2>
          <p className="text-[12px] leading-relaxed">
            {formData.skills?.technical?.join(" • ")}
          </p>
        </section>

        <section>
          <h2 className="text-sm font-bold border-b border-stone-300 mb-3 uppercase tracking-widest text-stone-500">
            Honors & Awards
          </h2>
          <div className="space-y-2">
            {formData.certifications?.map((cert, idx) => (
              <div key={idx} className="text-[12px]">
                <span className="font-bold">{cert.name}</span>, {cert.date}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer / Page Numbering for Multi-page */}
      <footer className="mt-12 pt-8 border-t border-stone-100 text-center text-[10px] text-stone-400 uppercase tracking-widest">
        {formData.fullName} — Curriculum Vitae — Page 1 of 2
      </footer>
    </div>
  );
};
>>>>>>> Stashed changes

export default AcademicTemplate;
