import React from "react";

<<<<<<< Updated upstream
const MinimalTemplate = ({ formData }) => (
  <div
    className="bg-white resume-root space-y-6 w-full border border-slate-300 p-16 min-h-[1400px] max-w-[820px]"
    style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif' }}
  >
    {formData.fullName && (
      <h1 className="text-5xl font-light text-slate-900 mb-2 tracking-tight">
        {formData.fullName}
      </h1>
    )}
    <div className="text-slate-600 text-sm mb-10 flex flex-wrap gap-4">
      {[formData.email, formData.phone, formData.location, formData.linkedin]
        .filter(Boolean)
        .map((item, idx) => (
          <span key={idx}>{item}</span>
        ))}
    </div>

    {formData.summary && (
      <div className="mb-12">
        <p className="text-sm text-slate-700 leading-relaxed">
          {formData.summary}
        </p>
      </div>
    )}

    {formData.experience?.some((exp) => exp.company || exp.title) && (
      <div className="mb-12">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
          Experience
        </h2>
        {formData.experience
          .filter((exp) => exp.company || exp.title)
          .map((exp, idx) => (
            <div key={idx} className="mb-8 last:mb-0">
              <div className="flex justify-between items-baseline mb-2">
                <div>
                  {exp.title && (
                    <h3 className="font-semibold text-slate-900 text-lg">
                      {exp.title}
                    </h3>
                  )}
                  {exp.company && (
                    <div className="text-slate-700 text-sm">{exp.company}</div>
                  )}
                </div>
                <div className="text-sm text-slate-500">
                  {exp.startDate} - {exp.endDate}
                </div>
              </div>
              {exp.description && (
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {exp.description}
                </p>
              )}
            </div>
          ))}
      </div>
    )}

    {formData.education?.some((edu) => edu.school || edu.degree) && (
      <div className="mb-12">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
          Education
        </h2>
        {formData.education
          .filter((edu) => edu.school || edu.degree)
          .map((edu, idx) => (
            <div key={idx} className="mb-6 last:mb-0">
              <div className="flex justify-between items-baseline">
                <div>
                  {edu.degree && (
                    <h3 className="font-semibold text-slate-900 text-base">
                      {edu.degree}
                    </h3>
                  )}
                  {edu.school && (
                    <div className="text-slate-700 text-sm">{edu.school}</div>
                  )}
                </div>
                <div className="text-sm text-slate-500">
                  {edu.graduationDate}
                </div>
              </div>
              {edu.gpa && (
                <div className="text-sm text-slate-600 mt-1">
                  GPA: {edu.gpa}
                </div>
              )}
            </div>
          ))}
      </div>
    )}

    {(formData.skills?.technical?.length > 0 ||
      formData.skills?.soft?.length > 0) && (
      <div className="mb-12">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
          Skills
        </h2>
        <div className="text-sm text-slate-700">
          {formData.skills.technical?.length > 0 && (
            <div className="mb-2">{formData.skills.technical.join(" • ")}</div>
          )}
          {formData.skills.soft?.length > 0 && (
            <div>{formData.skills.soft.join(" • ")}</div>
          )}
        </div>
      </div>
    )}

    {formData.projects?.some((project) => project.name) && (
      <div className="mb-12">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
          Projects
        </h2>
        {formData.projects
          .filter((project) => project.name)
          .map((project, idx) => (
            <div key={idx} className="mb-6 last:mb-0">
              {project.name && (
                <h3 className="font-semibold text-slate-900 text-base">
                  {project.name}
                </h3>
              )}
              {project.technologies && (
                <div className="text-sm text-slate-600 mt-1">
                  {project.technologies}
                </div>
              )}
              {project.description && (
                <p className="text-sm text-slate-600 leading-relaxed mt-2 whitespace-pre-line">
                  {project.description}
                </p>
              )}
            </div>
          ))}
      </div>
    )}
  </div>
);

=======
const Section = ({ title, children }) => (
  <div className="mb-8 break-inside-avoid">
    <h2 className="text-xs font-semibold tracking-[0.2em] text-gray-400 uppercase mb-4 border-b border-gray-100 pb-1">
      {title}
    </h2>
    {children}
  </div>
);

const MinimalTemplate = ({ formData }) => {
  // Required fields helper - ensures template doesn't crash if data is missing
  if (!formData)
    return <div className="p-8 text-red-500">No data provided</div>;

  return (
    <div
      className="resume-root bg-white mx-auto shadow-lg flex"
      style={{
        width: "794px", // A4 Width
        minHeight: "1123px", // A4 Height
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* SIDEBAR - 1/3 of the page */}
      <aside className="w-1/3 bg-slate-50 p-10 flex flex-col gap-8 border-r border-gray-100">
        <div className="mb-4">
          <h1 className="text-2xl font-light text-slate-800 leading-tight mb-2">
            {formData.fullName || "Required Name"}
          </h1>
          <p className="text-xs text-slate-500 italic uppercase tracking-wider">
            {formData.experience?.[0]?.title || "Professional"}
          </p>
        </div>

        <section>
          <h3 className="text-[10px] font-bold text-slate-400 uppercase mb-3 tracking-widest">
            Contact
          </h3>
          <div className="text-[11px] space-y-2 text-slate-600">
            {formData.email && (
              <p className="truncate">
                <strong>E:</strong> {formData.email}
              </p>
            )}
            {formData.phone && (
              <p>
                <strong>P:</strong> {formData.phone}
              </p>
            )}
            {formData.location && (
              <p>
                <strong>L:</strong> {formData.location}
              </p>
            )}
            {formData.linkedin && (
              <p className="truncate">
                <strong>In:</strong> {formData.linkedin}
              </p>
            )}
          </div>
        </section>

        {formData.skills && (
          <section>
            <h3 className="text-[10px] font-bold text-slate-400 uppercase mb-3 tracking-widest">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {formData.skills.technical?.map((skill, i) => (
                <span
                  key={i}
                  className="text-[10px] bg-white border border-slate-200 px-2 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </aside>

      {/* MAIN CONTENT - 2/3 of the page */}
      <main className="w-2/3 p-12">
        {/* Summary */}
        {formData.summary && (
          <div className="mb-10">
            <p className="text-sm text-slate-600 leading-relaxed italic">
              "{formData.summary}"
            </p>
          </div>
        )}

        {/* Experience Section */}
        <Section title="Experience">
          {formData.experience?.map((exp, idx) => (
            <div
              key={idx}
              className="mb-6 relative pl-4 border-l border-slate-100"
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-sm font-bold text-slate-800">
                  {exp.company}
                </h3>
                <span className="text-[10px] text-slate-400 font-medium uppercase">
                  {exp.startDate} — {exp.endDate}
                </span>
              </div>
              <p className="text-xs font-medium text-slate-500 mb-2">
                {exp.title}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                {exp.description}
              </p>
            </div>
          ))}
        </Section>

        {/* Education Section */}
        <Section title="Education">
          {formData.education?.map((edu, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex justify-between">
                <h3 className="text-sm font-bold text-slate-800">
                  {edu.school}
                </h3>
                <span className="text-[10px] text-slate-400">
                  {edu.graduationDate}
                </span>
              </div>
              <p className="text-xs text-slate-500">{edu.degree}</p>
            </div>
          ))}
        </Section>

        {/* Page Two Indicator / Spacer (For PDF generation) */}
        <div className="py-10 text-center opacity-20 select-none pointer-events-none">
          <hr className="border-dashed border-slate-300" />
          <span className="text-[8px] uppercase tracking-tighter">
            Page Break
          </span>
        </div>

        {/* Projects Section (Usually starts Page 2) */}
        <Section title="Projects">
          {formData.projects?.map((project, idx) => (
            <div key={idx} className="mb-4">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight">
                {project.name}
              </h3>
              <p className="text-[10px] text-blue-500 mb-1">{project.link}</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {project.description}
              </p>
            </div>
          ))}
        </Section>
      </main>
    </div>
  );
};

>>>>>>> Stashed changes
export default MinimalTemplate;
