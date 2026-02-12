import React from "react";
import { Upload, Download, PenTool } from "lucide-react";

const CVBuilderTopBar = ({ activeTab, setActiveTab, onSave, formData }) => {
  // Check if essential fields are filled to enable download/upload
  const isFormComplete = !!(
    formData?.fullName?.trim() &&
    formData?.email?.trim() &&
    formData?.phone?.trim()
  );

  return (
    <div className="w-full   px-6 py-4 flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-6">
        <h1 className="text-2xl font-semibold text-slate-900">Create CV</h1>

        {/* Tabs */}
        <div className="flex bg-slate-100 rounded-xl p-1">
          <button
            onClick={() => setActiveTab("builder")}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${activeTab === "builder"
              ? "bg-white shadow text-slate-900"
              : "text-slate-500 hover:text-slate-700"
              }`}
          >
            Builder
          </button>
          <button
            onClick={() => setActiveTab("templates")}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${activeTab === "templates"
              ? "bg-white shadow text-slate-900"
              : "text-slate-500 hover:text-slate-700"
              }`}
          >
            Templates
          </button>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium hover:bg-slate-50">
          <PenTool size={16} />
          CV Designer
        </button>

        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all"
          title="Upload your resume"
        >
          <Upload size={16} />
          Upload
        </button>

        <button
          onClick={isFormComplete ? onSave : undefined}
          disabled={!isFormComplete}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isFormComplete
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-slate-300 text-slate-500 cursor-not-allowed"
            }`}
          title={
            isFormComplete
              ? "Download your resume"
              : "Please fill in Name, Email, and Phone to download"
          }
        >
          <Download size={16} />
          Download
        </button>
      </div>
    </div>
  );
};

export default CVBuilderTopBar;
