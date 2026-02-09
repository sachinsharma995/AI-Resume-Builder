import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Award,
  Briefcase,
  CheckCircle,
  Download,
  FolderKanban,
  GraduationCap,
  PenTool,
  Upload,
  User,
  Zap,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import FormTabs from "./FormTabs";

import PersonalInfoForm from "./forms/PersonalInfoForm";
import ExperienceForm from "./forms/ExperienceForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import ProjectsForm from "./forms/ProjectsForm";
import CertificationsForm from "./forms/CertificationsForm";

import LivePreview from "../Preview/LivePreview";
import FullPreview from "../Preview/FullPreview";
import TemplatesPage from "../Templates/TemplatesDashboardPage";
import { TEMPLATES } from "../Templates/TemplateRegistry";

import { getCompletionStatus } from "./completion";

import UserNavbar from "../UserNavBar/UserNavBar";
import { dummyData } from "./dummyData";

const ResumeBuilder = ({ setActivePage = () => { } }) => {
  /* -------------------- CORE STATE -------------------- */
  const [formData, setFormData] = useState(dummyData);
  const navigate = useNavigate();
  const [templates, setTemplates] = useState(TEMPLATES);
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]?.id || "jessica-claire");
  const [templateSearch, setTemplateSearch] = useState("");

  const [activeTab, setActiveTab] = useState("builder");
  const [activeSection, setActiveSection] = useState("personal");

  /* -------------------- PREVIEW STATE -------------------- */
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false);
  const [isPreviewHidden, setIsPreviewHidden] = useState(false);

  /* -------------------- HELPERS -------------------- */
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUseSummary = (text) => {
    setFormData((prev) => ({ ...prev, summary: text }));
  };

  const handleSelectTemplate = (id) => {
    setSelectedTemplate(id);
    setActiveTab("builder");
  };

  const currentTemplate = templates?.find((t) => t.id === selectedTemplate);

  // ============== Completed Status ===========
  const [completion, setcompletion] = useState({});
  useEffect(() => {
    const statusInfo = getCompletionStatus(formData);
    setcompletion(statusInfo);
  }, [formData]);

  /* ------------Input Validation ------------- */
  const [warning, setWarning] = useState(false);
  const isInputValid = (label) => {
    return completion?.missingSections?.includes(label);
  };

  /*------------------- PREVIOUS & NEXT BUTTON ------------*/
  const tabs = [
    { id: "personal", label: "Personal", icon: User },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "work", label: "Work", icon: Briefcase },
    { id: "projects", label: "Projects", icon: FolderKanban },
    { id: "certs", label: "Certifications", icon: Award },
    { id: "skills", label: "Skills", icon: Zap },
  ];
  const currentIdx = tabs.findIndex((tab) => tab.id === activeSection);

  /* --------------Handle scrolling ----------------------- */
  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    handleScroll();
  }, [activeSection]);

  const goLeft = () => {
    if (currentIdx > 0) {
      setActiveSection(tabs[currentIdx - 1].id);
      setWarning(false);
    }
  };

  const goRight = () => {
    if (currentIdx < tabs.length - 1) {
      setActiveSection(tabs[currentIdx + 1].id);
    }
  };

  /* -------------------- FORM RENDER -------------------- */
  const renderFormContent = () => {
    switch (activeSection) {
      case "personal":
        return (
          <PersonalInfoForm
            formData={formData}
            onInputChange={handleInputChange}
            onUseSummary={handleUseSummary}
          />
        );
      case "work":
        return <ExperienceForm formData={formData} setFormData={setFormData} />;
      case "education":
        return <EducationForm formData={formData} setFormData={setFormData} />;
      case "skills":
        return <SkillsForm formData={formData} setFormData={setFormData} />;
      case "projects":
        return <ProjectsForm formData={formData} setFormData={setFormData} />;
      case "certs":
        return (
          <CertificationsForm formData={formData} setFormData={setFormData} />
        );
      default:
        return null;
    }
  };

  /* -------------------- MAIN CONTENT -------------------- */
  const renderMainContent = () => {
    if (activeTab === "templates") {
      return (
        <TemplatesPage onSelectTemplate={handleSelectTemplate} isEmbedded={true} externalSearchTerm={templateSearch} />
      );
    }

    if (activeTab === "preview") {
      return (
        <FullPreview
          formData={formData}
          setActiveTab={setActiveTab}
        />
      );
    }

    return (
      <>
        {/* Alert Banner */}
        <div
          className={`flex items-center w-full gap-3 p-4 border rounded-lg mb-5 ${completion?.isComplete ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"} md:text-base text-sm md:flex-row flex-col select-none`}
        >
          {!completion.isComplete && (
            <>
              {/* Alert content */}
              <AlertTriangle className="text-amber-800 md:block hidden" size={30} />
              <div className="flex flex-col md:w-auto w-full">
                <div className="block font-medium text-amber-800 mb-0.5 md:text-sm text-xs">
                  Complete Your Resume
                </div>
                <p className="text-yellow-700 m-0 md:text-md text-xs">
                  Add the following information to enable export functionality:
                </p>
              </div>
              <div className="w-full flex flex-wrap gap-2 justify-start md:justify-end">
                {!completion?.isComplete &&
                  completion?.missingSections?.map((missing, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md font-medium bg-amber-100 text-amber-800 text-xs"
                    >
                      {missing}
                    </span>
                  ))}
              </div>
            </>
          )}
          {completion.isComplete && (
            <>
              <CheckCircle
                className="text-emerald-500 md:block hidden"
                size={20}
              />
              {/* Alert content */}
              <div className="flex flex-col md:w-auto w-full">
                <strong className="block text-left mb-0.5 text-emerald-500 md:text-xs text-sm">
                  Resume Ready
                </strong>
                <p className="text-emerald-500 m-0 md:text-md text-xs">
                  Your resume is ready to export.
                </p>
              </div>
              <div className="flex gap-2 ml-auto flex-wrap">
                <span className="px-2.5 py-1 rounded-md font-medium bg-emerald-100 text-emerald-800 md:text-md text-xs">
                  Resume is Ready
                </span>
              </div>
            </>
          )}
        </div>

        <div className="w-full overflow-y-hidden flex justify-center md:hidden block">
          <LivePreview
            formData={formData}
            currentTemplate={currentTemplate}
            isExpanded={isPreviewExpanded}
            onExpand={() => setIsPreviewExpanded(true)}
            onCollapse={() => setIsPreviewExpanded(false)}
            onMinimize={() => setIsPreviewHidden(true)}
          />
        </div>

        {/* BUILDER + PREVIEW */}
        <div
          className={`grid gap-14 p-1.5 ml-2 mr-2 grid-cols-1 md:grid-cols-[32%_68%] ${isPreviewExpanded ? "md:grid-cols-[0_100%]" : ""}`}
        >
          {/* builder-section */}
          <div className="bg-white rounded-xl h-full pl-0.5 overflow-hidden flex-1">
            <FormTabs
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
            {/* form-content */}
            <div className="w-full mt-5 overflow-auto">
              {warning && (
                <div className="text-sm text-red-700 bg-yellow-100 border border-yellow-300 px-4 py-2 my-2.5 rounded-lg">
                  Please fill in all required fields to continue.
                </div>
              )}
              {renderFormContent()}
            </div>
            {/* Previous & Next */}
            <div className="w-full flex items-center justify-between mt-10">
              <button
                onClick={() => {
                  goLeft();
                }}
                disabled={currentIdx === 0}
                className="flex gap-1 items-center text-sm bg-slate-100 px-4 py-2 rounded-lg select-none disabled:opacity-40 disabled:cursor-not-allowed transition select-none"
              >
                <ArrowLeft size={18} />
                <span>Previous</span>
              </button>
              <button
                onClick={() => {
                  if (isInputValid(tabs[currentIdx]?.label)) {
                    setWarning(true);
                    handleScroll();
                    return;
                  }
                  setWarning(false);
                  goRight();
                }}
                disabled={currentIdx === tabs.length - 1}
                className="flex gap-1 items-center text-sm bg-black text-white px-4 py-2 rounded-lg select-none disabled:opacity-40 disabled:cursor-not-allowed transition select-none"
              >
                <span>Next</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
          <div className="md:block hidden">
            {!isPreviewHidden && (
              <LivePreview
                formData={formData}
                currentTemplate={currentTemplate}
                isExpanded={isPreviewExpanded}
                onExpand={() => setIsPreviewExpanded(true)}
                onCollapse={() => setIsPreviewExpanded(false)}
                onMinimize={() => setIsPreviewHidden(true)}
              />
            )}
          </div>
        </div>
        <div className="w-full h-4"></div>
      </>
    );
  };

  /* -------------------- BUILDER PAGE -------------------- */
  return (
    <>
      <UserNavbar />
      {/* resume-builder-page */}
      <div className="p-2.5 overflow-hidden font-sans tracking-[0.01em]">
        {/* main-header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 p-2 min-h-[50px] gap-4">
          {/* LEFT SIDE: Heading + Toggle */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 w-full md:w-auto">
            {/* Title Section */}
            <div>
              <h1 className="text-2xl font-['Outfit']">
                {activeTab === "builder" ? "Create Resume" : "Resume Templates"}
              </h1>
              {activeTab === "templates" && (
                <p className="text-sm text-slate-500 mt-1 hidden md:block">
                  Choose a professionally designed template to get started.
                </p>
              )}
            </div>

            {/* Toggle Switch */}
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1.5 w-fit shrink-0">
              <button
                className={`py-1 px-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "builder" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
                  }`}
                onClick={() => setActiveTab("builder")}
              >
                Builder
              </button>
              <button
                className={`py-1 px-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "templates" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
                  }`}
                onClick={() => setActiveTab("templates")}
              >
                Templates
              </button>
            </div>
          </div>

          {/* RIGHT SIDE: Actions or Search */}
          <div className="w-full md:w-auto flex items-center justify-end gap-2">
            {activeTab === "builder" ? (
              <>
                <button
                  onClick={() => navigate("/user/cv")}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 font-medium shadow-sm hover:bg-gray-50 hover:shadow-md transition-all whitespace-nowrap"
                >
                  <PenTool size={18} />
                  CV Designer
                </button>
                <button className="flex gap-2 py-2.5 px-5 text-white cursor-pointer bg-gradient-to-br from-blue-600 to-blue-700 border-0 rounded-lg text-sm transition-all duration-200 hover:from-blue-700 hover:to-blue-800 whitespace-nowrap">
                  <Upload size={18} />
                  Upload
                </button>
                <button className="flex gap-2 py-2.5 px-5 text-white cursor-pointer bg-gradient-to-br from-blue-600 to-blue-700 border-0 rounded-lg text-sm transition-all duration-200 hover:from-blue-700 hover:to-blue-800 whitespace-nowrap">
                  <Download size={18} /> Export
                </button>
              </>
            ) : (
              /* Search Bar for Templates */
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={templateSearch}
                  onChange={(e) => setTemplateSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-full shadow-sm"
                />
              </div>
            )}
          </div>
        </div>

        {renderMainContent()}
      </div>
    </>
  );
};

export default ResumeBuilder;
