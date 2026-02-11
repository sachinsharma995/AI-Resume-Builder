<<<<<<< Updated upstream
import React, { useState, useMemo, useEffect } from "react";
import { Check, Eye, Loader2 } from "lucide-react";

import mergeWithSampleData, {
  hasAnyUserData,
} from "../../../utils/Datahelpers";
import CVTemplates from "./Cvtemplates";
import { getAllTemplateStatuses } from "../../../utils/templateVisibility";

const allTemplates = [
  { id: "professional", name: "Professional", category: "Traditional" },
  { id: "modern", name: "Modern Blue", category: "Contemporary" },
  { id: "creative", name: "Creative", category: "Creative" },
  { id: "minimal", name: "Minimal", category: "Contemporary" },
  { id: "executive", name: "Executive", category: "Traditional" },
  { id: "academic", name: "Academic", category: "Academic" },
  { id: "twoColumn", name: "Two Column", category: "Academic" },
  { id: "simple", name: "Simple", category: "Traditional" },
  { id: "academicSidebar", name: "Academic Sidebar", category: "Academic" },
];

const TemplatesGallery = ({ selectedTemplate, onSelectTemplate, formData }) => {
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [templateStatuses, setTemplateStatuses] = useState({});
  const [isLoadingStatuses, setIsLoadingStatuses] = useState(true);

  const categories = [
    "All",
    "Traditional",
    "Contemporary",
    "Creative",
    "Academic",
  ];

  // Fetch template visibility statuses on mount
  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        setIsLoadingStatuses(true);
        const statuses = await getAllTemplateStatuses();
        setTemplateStatuses(statuses);
      } catch (error) {
        console.error("Error fetching template statuses:", error);
      } finally {
        setIsLoadingStatuses(false);
      }
    };
    fetchStatuses();
  }, []);
=======
import React, { useState, useMemo, useRef } from "react";
import { Check, Eye, ChevronLeft, ChevronRight, X } from "lucide-react";
import CVTemplates from "./Cvtemplates";
import mergeWithSampleData, {
  hasAnyUserData,
} from "../../../utils/Datahelpers";

export const templates = [
  { id: "professional", name: "Professional", category: "Traditional" },
  { id: "modern", name: "Modern Blue", category: "Contemporary" },
  { id: "creative", name: "Creative", category: "Creative" },
  { id: "minimal", name: "Minimal", category: "Traditional" },
  { id: "executive", name: "Executive", category: "Traditional" },
  { id: "academic", name: "Academic", category: "Traditional" },
  { id: "twoColumn", name: "Two Column", category: "Traditional" },
  { id: "simple", name: "Simple", category: "Traditional" },
];

/* ----------------------------- Card ----------------------------- */

const TemplateCard = ({
  template,
  isSelected,
  displayData,
  onPreview,
  onUse,
}) => {
  const TemplateComponent = CVTemplates[template.id];

  return (
    <div className="min-w-[280px] w-[280px] bg-white border border-slate-200 rounded-xl p-2 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col flex-shrink-0 select-none overflow-hidden">
      {/* A4 Aspect Container */}
      <div className="relative w-full aspect-[210/297] rounded-lg overflow-hidden group bg-white">
        {/* Scaled CV Preview */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: "scale(0.38)",
            transformOrigin: "top left",
            width: 794,
          }}
        >
          {TemplateComponent && <TemplateComponent formData={displayData} />}
        </div>

        {/* Gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent pt-12 pb-3 px-3 flex flex-col justify-end pointer-events-none z-10">
          <h3 className="text-base font-semibold text-white truncate">
            {template.name}
          </h3>
          <p className="text-xs text-slate-300 truncate">{template.category}</p>
        </div>

        {/* Preview button */}
        <div className="absolute top-2 right-2 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPreview(template);
            }}
            className="bg-black/50 hover:bg-black/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5 transition-all shadow-sm cursor-pointer border border-white/10"
          >
            <Eye size={12} /> Preview
          </button>
        </div>

        {/* Use button */}
        <div className="absolute bottom-16 left-2 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUse(template.id);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded-full font-medium flex items-center gap-1.5 transition-all shadow-lg cursor-pointer"
          >
            <Check size={12} /> Use Template
          </button>
        </div>

        {/* Selected badge */}
        {isSelected && (
          <div className="absolute top-2 left-2 z-20 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
            <Check size={12} /> Active
          </div>
        )}
      </div>
    </div>
  );
};

/* -------------------------- Section Row -------------------------- */

const TemplateSection = ({
  title,
  items,
  selectedTemplate,
  displayData,
  onPreview,
  onUse,
}) => {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = 320;
    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  if (!items.length) return null;

  return (
    <div className="space-y-4 mb-12">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>
        <span className="text-sm font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
          {items.length}
        </span>
      </div>

      <div className="relative group/section">
        {/* Left */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 w-10 h-10 bg-white border border-slate-200 shadow-lg rounded-full flex items-center justify-center text-slate-700 opacity-0 group-hover/section:opacity-100 transition-all hover:bg-slate-50 hover:scale-110"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Scroll Row */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-1 px-1 -mx-1 scroll-smooth hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((tpl) => (
            <TemplateCard
              key={tpl.id}
              template={tpl}
              isSelected={selectedTemplate === tpl.id}
              displayData={displayData}
              onPreview={onPreview}
              onUse={onUse}
            />
          ))}
        </div>

        {/* Right */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 w-10 h-10 bg-white border border-slate-200 shadow-lg rounded-full flex items-center justify-center text-slate-700 opacity-0 group-hover/section:opacity-100 transition-all hover:bg-slate-50 hover:scale-110"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

/* --------------------------- Main Page --------------------------- */

const TemplatesGallery = ({ selectedTemplate, onSelectTemplate, formData }) => {
  const [previewTemplate, setPreviewTemplate] = useState(null);
>>>>>>> Stashed changes

  const displayData = useMemo(() => mergeWithSampleData(formData), [formData]);
  const showingUserData = useMemo(() => hasAnyUserData(formData), [formData]);

<<<<<<< Updated upstream
  // Filter out disabled templates
  const enabledTemplates = useMemo(() => {
    return allTemplates.filter((t) => templateStatuses[t.id] !== false);
  }, [templateStatuses]);

  const filteredTemplates =
    selectedCategory === "All"
      ? enabledTemplates
      : enabledTemplates.filter((t) => t.category === selectedCategory);
=======
  const traditional = templates.filter((t) => t.category === "Traditional");
  const contemporary = templates.filter((t) => t.category === "Contemporary");
  const creative = templates.filter((t) => t.category === "Creative");
  const academic = templates.filter((t) => t.category === "Academic");
>>>>>>> Stashed changes

  const PreviewModal = ({ template }) => {
    const TemplateComponent = CVTemplates[template.id];

    return (
      <div
<<<<<<< Updated upstream
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
=======
        className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
>>>>>>> Stashed changes
        onClick={() => setPreviewTemplate(null)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
<<<<<<< Updated upstream
          style={{ width: 860, maxHeight: "92vh" }}
=======
          style={{ width: 900, maxHeight: "92vh" }}
>>>>>>> Stashed changes
        >
          {/* Header */}
          <div className="px-4 py-3 border-b flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                {template.name} Preview
              </h2>
              <p className="text-xs text-slate-500">
                A4 size — click Use Template to apply
              </p>
            </div>
            <button
              onClick={() => setPreviewTemplate(null)}
<<<<<<< Updated upstream
              className="text-xl leading-none text-slate-400 hover:text-slate-700"
            >
              ×
            </button>
          </div>

          {/* A4 Preview Area */}
=======
              className="text-slate-400 hover:text-slate-700"
            >
              <X size={20} />
            </button>
          </div>

          {/* Preview Area */}
>>>>>>> Stashed changes
          <div className="flex-1 overflow-auto bg-slate-200/60 p-6 flex justify-center">
            <div className="shadow-xl bg-white rounded-sm">
              <div style={{ width: 794, minHeight: 1123 }}>
                {TemplateComponent && (
                  <TemplateComponent formData={displayData} />
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t flex justify-end gap-3 bg-white">
            <button
              onClick={() => setPreviewTemplate(null)}
              className="px-4 py-2 rounded-md border text-sm font-medium hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onSelectTemplate(template.id);
                setPreviewTemplate(null);
              }}
              className="px-5 py-2 rounded-md bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition"
            >
              Use Template
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
<<<<<<< Updated upstream
    <div className="w-full px-6 p-5 pb-10">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">CV Template's</h2>
          <p className="text-slate-600 mt-1">
            {showingUserData
              ? "Your data replaces sample content automatically"
              : "Choose a professionally designed template to get started."}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition ${selectedCategory === category
              ? "bg-slate-900 text-white shadow"
              : "bg-white border border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {isLoadingStatuses ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
          <p className="text-slate-600">Loading templates...</p>
        </div>
      ) : filteredTemplates.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-slate-600 text-lg">No templates available in this category.</p>
          <p className="text-slate-500 text-sm mt-2">Please try a different category or check back later.</p>
        </div>
      ) : (
        /* Cards Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredTemplates.map((template) => {
            const isSelected = selectedTemplate === template.id;
            const TemplateComponent = CVTemplates[template.id];

            return (
              <div
                key={template.id}
                className={`group relative rounded-2xl overflow-hidden bg-white transition-all cursor-pointer ${isSelected
                  ? "ring-2 ring-blue-600 shadow-2xl scale-[1.02]"
                  : "border border-slate-200 hover:shadow-xl hover:-translate-y-1"
                  }`}
                onClick={() => setPreviewTemplate(template)}
              >
                {/* Preview */}
                <div className="relative h-[460px] overflow-hidden bg-white">
                  <div
                    className="absolute inset-0"
                    style={{
                      transform: "scale(0.38)",
                      transformOrigin: "top left",
                      width: 794,
                    }}
                  >
                    {TemplateComponent && (
                      <TemplateComponent formData={displayData} />
                    )}
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition" />

                  {/* Hover actions */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewTemplate(template);
                      }}
                      className="flex items-center gap-2 px-5 py-2 rounded-lg bg-white shadow text-sm font-bold hover:bg-slate-100 transition"
                    >
                      <Eye size={16} />
                      Preview
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTemplate(template.id);
                      }}
                      className="flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition"
                    >
                      Use
                    </button>
                  </div>

                  {/* Selected badge */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                      <Check size={14} />
                      Selected
                    </div>
                  )}
                </div>

                {/* Bottom bar */}
                <div className="px-4 py-3 border-t flex items-center justify-between bg-white">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">
                      {template.name}
                    </h3>
                    <p className="text-xs text-slate-500">{template.category}</p>
                  </div>

                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${isSelected
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-600"
                      }`}
                  >
                    {isSelected ? "Active" : "Template"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {previewTemplate && <PreviewModal template={previewTemplate} />}
=======
    <div className="w-full bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Header */}

        {/* Sections */}
        <TemplateSection
          title="Traditional Templates"
          items={traditional}
          selectedTemplate={selectedTemplate}
          displayData={displayData}
          onPreview={setPreviewTemplate}
          onUse={onSelectTemplate}
        />

        <TemplateSection
          title="Contemporary Templates"
          items={contemporary}
          selectedTemplate={selectedTemplate}
          displayData={displayData}
          onPreview={setPreviewTemplate}
          onUse={onSelectTemplate}
        />

        <TemplateSection
          title="Creative Templates"
          items={creative}
          selectedTemplate={selectedTemplate}
          displayData={displayData}
          onPreview={setPreviewTemplate}
          onUse={onSelectTemplate}
        />

        <TemplateSection
          title="Academic Templates"
          items={academic}
          selectedTemplate={selectedTemplate}
          displayData={displayData}
          onPreview={setPreviewTemplate}
          onUse={onSelectTemplate}
        />

        {previewTemplate && <PreviewModal template={previewTemplate} />}
      </div>
>>>>>>> Stashed changes
    </div>
  );
};

export default TemplatesGallery;
