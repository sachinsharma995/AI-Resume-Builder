<<<<<<< Updated upstream
import React, { useState, useMemo } from "react";
=======
import React, {
  useState,
  useMemo,
  useLayoutEffect,
  useRef,
  useEffect,
} from "react";
>>>>>>> Stashed changes
import {
  Eye,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
<<<<<<< Updated upstream
=======
  ChevronLeft,
  ChevronRight,
>>>>>>> Stashed changes
} from "lucide-react";
import CVTemplates from "./CVTemplates";
import mergeWithSampleData, {
  hasAnyUserData,
} from "../../../utils/Datahelpers";

<<<<<<< Updated upstream
const Page = ({ children }) => (
  <div
    className="bg-white shadow-md mb-6"
    style={{
      width: 794,
      minHeight: 1123,
      padding: 24,
      pageBreakAfter: "always",
      breakAfter: "page",
    }}
  >
    {children}
  </div>
);

const CVPreview = ({
  formData,
  selectedTemplate,
  isMaximized,
  onToggleMaximize,
}) => {
  const [zoom, setZoom] = useState(1);
  const TemplateComponent = CVTemplates[selectedTemplate];

  const zoomIn = () => setZoom((z) => Math.min(z + 0.1, 2));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.1, 0.5));
  const resetZoom = () => setZoom(1);

  const displayData = useMemo(() => mergeWithSampleData(formData), [formData]);
  const showingUserData = useMemo(() => hasAnyUserData(formData), [formData]);
  const PreviewContent = () => (
    <div className="flex justify-center">
      <div
        style={{
          width: 794 * zoom,
          minHeight: 1123 * zoom,
        }}
      >
        <div
          className="bg-white shadow"
          style={{
            width: 794,
            minHeight: 1123,
            padding: 24,
            transform: `scale(${zoom})`,
            transformOrigin: "top left",
=======
const PAGE_WIDTH = 794;
const PAGE_HEIGHT = 1123;
const PAGE_PADDING = 24;

const Page = ({ children }) => (
  <div
    className="bg-white shadow-md overflow-hidden"
    style={{
      width: PAGE_WIDTH,
      height: PAGE_HEIGHT,
      padding: PAGE_PADDING,
    }}
  >
    {children}
  </div>
);

const CVPreview = ({
  formData,
  selectedTemplate,
  isMaximized,
  onToggleMaximize,
}) => {
  const [manualZoom, setManualZoom] = useState(1);
  const [autoScale, setAutoScale] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  const measureRef = useRef(null);
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  const TemplateComponent = CVTemplates[selectedTemplate];

  const displayData = useMemo(() => mergeWithSampleData(formData), [formData]);
  const showingUserData = useMemo(() => hasAnyUserData(formData), [formData]);

  /* ================= AUTO FIT TO CONTAINER ================= */
  useEffect(() => {
    if (!containerRef.current) return;

    const resize = () => {
      const cw = containerRef.current.clientWidth;
      const ch = containerRef.current.clientHeight;

      const scaleX = (cw - 48) / PAGE_WIDTH;
      const scaleY = (ch - 48) / PAGE_HEIGHT;

      const scale = Math.min(1, scaleX, scaleY);
      setAutoScale(scale);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  const zoomIn = () => setManualZoom((z) => Math.min(z + 0.1, 2));
  const zoomOut = () => setManualZoom((z) => Math.max(z - 0.1, 0.5));
  const resetZoom = () => setManualZoom(1);

  const zoom = autoScale * manualZoom;

  /* ============ MEASURE TOTAL HEIGHT & AUTO-NAVIGATE ============ */
  useLayoutEffect(() => {
    if (!measureRef.current) return;

    const contentHeight = measureRef.current.scrollHeight;
    const usableHeight = PAGE_HEIGHT - PAGE_PADDING * 2;
    const pages = Math.max(1, Math.ceil(contentHeight / usableHeight));

    setPageCount(pages);

    // Auto-navigate to next page if content extends beyond current page
    const currentPageEnd = (currentPage + 1) * usableHeight;
    const currentPageStart = currentPage * usableHeight;

    // If content extends significantly beyond current page (more than 50% into next page)
    if (contentHeight > currentPageEnd + usableHeight * 0.3) {
      // Content is filling up next page, auto-advance
      if (currentPage < pages - 1) {
        setCurrentPage((prev) => prev + 1);
      }
    }
    // If user is on a page beyond the content, go back
    else if (currentPage >= pages) {
      setCurrentPage(Math.max(0, pages - 1));
    }
  }, [displayData, TemplateComponent, currentPage]);

  /* ============ SMART PAGE DETECTION ============ */
  useEffect(() => {
    if (!contentRef.current) return;

    // Check if content on current page is cut off
    const usableHeight = PAGE_HEIGHT - PAGE_PADDING * 2;
    const currentOffset = currentPage * usableHeight;

    // Get all sections/elements in the content
    const elements = contentRef.current.querySelectorAll("[data-section]");

    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const relativeTop = rect.top + currentOffset;
      const relativeBottom = relativeTop + rect.height;

      const pageBottom = (currentPage + 1) * usableHeight;

      // If element is cut in half (starts before page end but extends beyond)
      if (
        relativeTop < pageBottom &&
        relativeBottom > pageBottom + rect.height * 0.4
      ) {
        // Element is significantly cut, move to next page
        if (currentPage < pageCount - 1) {
          setTimeout(() => setCurrentPage((prev) => prev + 1), 100);
        }
      }
    });
  }, [displayData, currentPage, pageCount]);

  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, pageCount - 1));
  const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 0));

  /* ============ PAGE RENDERER (SINGLE PAGE) ============ */
  const RenderSinglePage = () => (
    <div className="flex justify-center items-start py-10 min-w-fit">
      <Page>
        <div
          ref={contentRef}
          style={{
            transform: `translateY(-${
              currentPage * (PAGE_HEIGHT - PAGE_PADDING * 2)
            }px)`,
            transition: "transform 0.3s ease-in-out",
>>>>>>> Stashed changes
          }}
        >
          {TemplateComponent ? (
            <TemplateComponent formData={displayData} />
          ) : (
            <div className="flex items-center justify-center h-[900px] text-slate-400 text-lg font-medium">
              Select a template to preview
            </div>
          )}
        </div>
<<<<<<< Updated upstream
      </div>
=======
      </Page>
>>>>>>> Stashed changes
    </div>
  );

  /* ================= FULLSCREEN ================= */
  if (isMaximized) {
    return (
      <div className="fixed inset-0 z-[99] bg-slate-200 flex flex-col">
        {/* Header */}
        <div className="bg-white flex items-center justify-between px-6 py-3 border-b">
          <div className="flex items-center gap-3">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <Eye size={18} /> Live Preview
              {selectedTemplate && (
                <span className="text-slate-500 font-normal">
                  - {selectedTemplate}
                </span>
              )}
            </h3>
            {showingUserData ? (
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                ✨ Your Data
              </span>
            ) : (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                📝 Sample Data
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
<<<<<<< Updated upstream
=======
              onClick={prevPage}
              disabled={currentPage === 0}
              className="p-1 hover:bg-slate-100 rounded disabled:opacity-40"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-xs font-medium">
              Page {currentPage + 1} / {pageCount}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === pageCount - 1}
              className="p-1 hover:bg-slate-100 rounded disabled:opacity-40"
            >
              <ChevronRight size={18} />
            </button>

            <div className="w-px h-6 bg-slate-300 mx-2" />

            <button
>>>>>>> Stashed changes
              onClick={zoomOut}
              className="p-1 hover:bg-slate-100 rounded"
            >
              <ZoomOut size={18} />
            </button>
            <span className="text-sm font-medium">
              {Math.round(zoom * 100)}%
            </span>
            <button onClick={zoomIn} className="p-1 hover:bg-slate-100 rounded">
              <ZoomIn size={18} />
            </button>
            <button
              onClick={resetZoom}
              className="p-1 hover:bg-slate-100 rounded"
            >
              <RotateCcw size={18} />
            </button>
<<<<<<< Updated upstream
            <div className="w-px h-6 bg-slate-300 mx-1" />
            <button
              onClick={() => {
                onToggleMaximize();
                setZoom(1);
=======

            <div className="w-px h-6 bg-slate-300 mx-2" />

            <button
              onClick={() => {
                onToggleMaximize();
                setManualZoom(1);
>>>>>>> Stashed changes
              }}
              className="p-1 hover:bg-slate-100 rounded"
            >
              <Minimize2 size={18} />
            </button>
            <button className="p-1 hover:bg-slate-100 rounded">
              <Download size={18} />
            </button>
          </div>
        </div>

        {/* Canvas */}
<<<<<<< Updated upstream
        <div className="flex-1 overflow-auto bg-slate-200 p-10">
          <div className="flex justify-center">
            <PreviewContent />
=======
        <div
          ref={containerRef}
          className="flex-1 overflow-auto bg-slate-200 flex justify-center items-start py-6"
        >
          <div
            className="transition-transform duration-200"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "top center",
            }}
          >
            <RenderSinglePage />
>>>>>>> Stashed changes
          </div>
        </div>
      </div>
    );
  }

  /* ================= NORMAL MODE ================= */
  return (
<<<<<<< Updated upstream
    <div className="w-full h-full flex flex-col bg-slate-100">
=======
    <div className="w-full h-full flex flex-col bg-slate-100 min-h-[calc(100vh-140px)]">
>>>>>>> Stashed changes
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-white">
        <div className="flex items-center gap-2">
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <Eye size={16} /> Live Preview
            {selectedTemplate && (
              <span className="text-slate-500 font-normal">
                - {selectedTemplate}
              </span>
            )}
          </h3>
          {showingUserData ? (
            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">
              ✨ Your Data
            </span>
          ) : (
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">
              📝 Sample
            </span>
          )}
        </div>

<<<<<<< Updated upstream
        <button
          onClick={onToggleMaximize}
          className="p-1 hover:bg-slate-100 rounded"
          title="Fullscreen"
        >
          <Maximize2 size={16} />
        </button>
      </div>

      {/* Canvas */}
      <div className="flex-1 flex justify-center bg-slate-200 py-8">
        <PreviewContent />
=======
        <div className="flex items-center gap-2">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className="p-1 hover:bg-slate-100 rounded disabled:opacity-40"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-xs font-medium">
            {currentPage + 1}/{pageCount}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === pageCount - 1}
            className="p-1 hover:bg-slate-100 rounded disabled:opacity-40"
          >
            <ChevronRight size={16} />
          </button>

          <button
            onClick={onToggleMaximize}
            className="p-1 hover:bg-slate-100 rounded ml-2"
            title="Fullscreen"
          >
            <Maximize2 size={16} />
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto bg-slate-200 flex justify-center items-start py-6"
      >
        <div
          className="transition-transform duration-200"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "top center",
          }}
        >
          <RenderSinglePage />
        </div>
>>>>>>> Stashed changes
      </div>

      {!showingUserData && (
        <div className="px-4 py-2 bg-blue-50 border-t text-center">
          <p className="text-xs text-blue-700">
            💡 Start filling the form to see your information replace the sample
            data
          </p>
        </div>
      )}
<<<<<<< Updated upstream
=======

      {/* ======= Invisible measuring layer ======= */}
      <div
        ref={measureRef}
        className="absolute opacity-0 pointer-events-none -z-50"
        style={{ width: PAGE_WIDTH, padding: PAGE_PADDING }}
      >
        {TemplateComponent && <TemplateComponent formData={displayData} />}
      </div>
>>>>>>> Stashed changes
    </div>
  );
};

export default CVPreview;
