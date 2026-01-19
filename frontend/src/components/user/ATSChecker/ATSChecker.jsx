import { useState } from "react";
import ATSUpload from "./ATSUpload";
import "./ATSChecker.css";

export default function ATSChecker() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleUpload = async (file) => {
    setLoading(true);
    setError(null);
    setUploadedFile(file);

    // Create preview URL for PDF
    if (file.type === "application/pdf") {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch("http://localhost:5000/api/resumes/upload", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setAnalysisResult(data.data);
      } else {
        setError(data.message || "Failed to analyze resume");
      }
    } catch (err) {
      setError("Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    if (!analysisResult) return;

    const reportContent = `
ATS RESUME ANALYSIS REPORT
==========================

Overall Score: ${analysisResult.overallScore}/10
Status: ${analysisResult.passThreshold ? "PASS ✓" : "NEEDS IMPROVEMENT ✗"}

SECTION SCORES
--------------
${analysisResult.sectionScores
  .map(
    (section) =>
      `${section.sectionName}: ${section.score}/20 [${section.status.toUpperCase()}]`
  )
  .join("\n")}

MATCHED KEYWORDS (${analysisResult.matchedKeywords.length})
-----------------
${analysisResult.matchedKeywords.map((k) => `✓ ${k.keyword}`).join("\n")}

MISSING KEYWORDS (${analysisResult.missingKeywords.length})
-----------------
${analysisResult.missingKeywords.map((k) => `✗ ${k.keyword}`).join("\n")}

SUGGESTIONS FOR IMPROVEMENT
---------------------------
${analysisResult.suggestions.map((s, i) => `${i + 1}. ${s}`).join("\n")}

RECOMMENDATIONS
---------------
${analysisResult.recommendations
  .map(
    (r, i) =>
      `${i + 1}. [${r.priority.toUpperCase()}] ${r.title}\n   ${r.description}`
  )
  .join("\n\n")}

EXTRACTED INFORMATION
---------------------
Name: ${analysisResult.extractedData?.name || "Not found"}
Email: ${analysisResult.extractedData?.email || "Not found"}
Phone: ${analysisResult.extractedData?.phone || "Not found"}
Skills Found: ${analysisResult.extractedData?.skills?.join(", ") || "None"}

---
Generated: ${new Date().toLocaleString()}
Report powered by AI Resume Builder
    `.trim();

    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ATS_Report_${new Date().getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <div className="w-full p-4 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-800">ATS Checker</h1>
        <p className="text-slate-500 mt-1 text-sm">
          Optimize your resume for applicant tracking systems.
        </p>
      </div>

      <div className="bg-slate-50 min-h-screen">
        <div className="flex flex-col lg:flex-row min-h-full w-full max-w-7xl mx-auto p-4 gap-6">
          {/* LEFT: DOCUMENT PREVIEW */}
          <div className="w-full lg:w-2/3 bg-white rounded-xl p-4 lg:p-6 border border-slate-200 shadow-sm">
            <div className="w-full flex justify-between items-center mb-4 pb-3 border-b">
              <h3 className="text-sm font-semibold text-slate-700">
                📄 Resume Preview
              </h3>
              {uploadedFile && (
                <span className="text-xs text-slate-500">
                  {uploadedFile.name}
                </span>
              )}
            </div>

            {/* Preview Area */}
            <div className="w-full bg-slate-50 rounded-lg overflow-hidden">
              {!uploadedFile ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <svg
                    className="w-16 h-16 text-slate-300 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold text-slate-700 mb-2">
                    No Resume Uploaded
                  </h3>
                  <p className="text-sm text-slate-500">
                    Upload your resume to see the preview and get ATS analysis
                  </p>
                </div>
              ) : previewUrl && uploadedFile.type === "application/pdf" ? (
                <iframe
                  src={previewUrl}
                  className="w-full h-[600px] border-0"
                  title="Resume Preview"
                />
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <svg
                    className="w-16 h-16 text-blue-500 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold text-slate-700 mb-2">
                    Document Uploaded Successfully
                  </h3>
                  <p className="text-sm text-slate-500 mb-1">
                    {uploadedFile.name}
                  </p>
                  <p className="text-xs text-slate-400">
                    Preview available for PDF files only
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: ANALYSIS PANEL */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            {/* UPLOAD SECTION */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="font-semibold text-lg mb-4">📤 Upload Resume</h3>
              <ATSUpload onUpload={handleUpload} />
              
              {loading && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3">
                    <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-sm text-blue-700 font-medium">Analyzing resume...</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
            </div>

            {/* ATS SCORE SECTION */}
            {analysisResult && (
              <>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-semibold text-lg">📊 ATS Score</h2>
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full ${
                        analysisResult.passThreshold
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {analysisResult.passThreshold ? "✓ PASS" : "⚠ NEEDS WORK"}
                    </span>
                  </div>

                  {/* SCORE CIRCLE */}
                  <div className="flex items-center gap-4 mb-6 bg-gradient-to-br from-slate-50 to-blue-50 p-6 rounded-xl border border-slate-200">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <svg
                        className="w-full h-full -rotate-90"
                        viewBox="0 0 36 36"
                      >
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="3"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
                          fill="none"
                          stroke={
                            analysisResult.overallScore >= 7
                              ? "#16a34a"
                              : analysisResult.overallScore >= 5
                              ? "#f59e0b"
                              : "#dc2626"
                          }
                          strokeWidth="3"
                          strokeDasharray={`${
                            analysisResult.overallScore * 10
                          },100`}
                        />
                      </svg>
                      <span className="absolute text-2xl font-bold">
                        {analysisResult.overallScore}
                      </span>
                    </div>

                    <div>
                      <p className="text-xs uppercase text-slate-500 font-semibold mb-1">
                        Overall Score
                      </p>
                      <p className="text-3xl font-bold">
                        {analysisResult.overallScore}
                        <span className="text-lg text-slate-400">/10</span>
                      </p>
                      <p
                        className={`text-xs font-medium mt-1 ${
                          analysisResult.overallScore >= 7
                            ? "text-green-600"
                            : analysisResult.overallScore >= 5
                            ? "text-amber-600"
                            : "text-red-600"
                        }`}
                      >
                        {analysisResult.overallScore >= 7
                          ? "🎉 Excellent ATS compatibility"
                          : analysisResult.overallScore >= 5
                          ? "⚡ Good, but needs improvement"
                          : "❌ Requires significant changes"}
                      </p>
                    </div>
                  </div>

                  {/* SECTION BREAKDOWN */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-slate-700 mb-3">
                      📋 Score Breakdown
                    </h3>
                    {analysisResult.sectionScores.map((section, idx) => (
                      <ScoreItem
                        key={idx}
                        title={section.sectionName}
                        score={section.score}
                        maxScore={20}
                        status={section.status}
                      />
                    ))}
                  </div>
                </div>

                {/* MISTAKES & SUGGESTIONS */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <span>🔧</span> Issues & Improvements
                  </h3>

                  {/* Missing Keywords */}
                  {analysisResult.missingKeywords.length > 0 && (
                    <div className="mb-4 p-4 bg-red-50 rounded-lg border border-red-200">
                      <h4 className="text-sm font-semibold text-red-800 mb-2 flex items-center gap-2">
                        <span>❌</span>
                        Missing Keywords ({analysisResult.missingKeywords.length})
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.missingKeywords.slice(0, 8).map((k, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 bg-white rounded border border-red-300 text-red-700"
                          >
                            {k.keyword}
                          </span>
                        ))}
                        {analysisResult.missingKeywords.length > 8 && (
                          <span className="text-xs px-2 py-1 text-red-600">
                            +{analysisResult.missingKeywords.length - 8} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Matched Keywords */}
                  {analysisResult.matchedKeywords.length > 0 && (
                    <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="text-sm font-semibold text-green-800 mb-2 flex items-center gap-2">
                        <span>✓</span>
                        Matched Keywords ({analysisResult.matchedKeywords.length})
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.matchedKeywords.slice(0, 8).map((k, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 bg-white rounded border border-green-300 text-green-700"
                          >
                            {k.keyword}
                          </span>
                        ))}
                        {analysisResult.matchedKeywords.length > 8 && (
                          <span className="text-xs px-2 py-1 text-green-600">
                            +{analysisResult.matchedKeywords.length - 8} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Suggestions */}
                  {analysisResult.suggestions.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-slate-700 mb-3">
                        💡 Suggestions
                      </h4>
                      {analysisResult.suggestions.map((suggestion, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-sm text-blue-800"
                        >
                          <span className="font-medium">{idx + 1}.</span>{" "}
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Download Report Button */}
                  <button
                    onClick={downloadReport}
                    className="w-full mt-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Download Detailed Report
                  </button>
                </div>
              </>
            )}

            {/* INITIAL STATE - NO UPLOAD */}
            {!analysisResult && !loading && !error && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <h3 className="font-semibold text-slate-800 mb-3">
                  📌 How it works
                </h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">1.</span>
                    <span>Upload your resume (PDF or DOCX)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">2.</span>
                    <span>Get instant ATS score analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">3.</span>
                    <span>Review missing keywords & suggestions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">4.</span>
                    <span>Download detailed improvement report</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- SCORE ITEM COMPONENT ---------- */
function ScoreItem({ title, score, maxScore, status }) {
  const percentage = (score / maxScore) * 100;
  const statusColor =
    status === "ok"
      ? "text-green-600"
      : status === "warn"
      ? "text-amber-600"
      : "text-red-600";
  const barColor =
    status === "ok"
      ? "bg-green-500"
      : status === "warn"
      ? "bg-amber-500"
      : "bg-red-500";

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-slate-700">{title}</span>
        <span className={`font-bold ${statusColor}`}>
          {score}/{maxScore}
        </span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full ${barColor} transition-all duration-500 rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}