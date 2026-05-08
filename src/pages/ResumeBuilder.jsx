import { useEffect, useState } from "react";
import { dummyResumeData } from "../assets/assets";
import { useParams, Link } from "react-router-dom";
import html2pdf from "html2pdf.js/dist/html2pdf.bundle.min.js";

import {
  ArrowLeftIcon,
  FileText,
  User,
  Briefcase,
  GraduationCap,
  FolderIcon,
  Sparkle,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  EyeOffIcon,
  EyeIcon,
  Share2Icon,
} from "lucide-react";

import PersonalInfoForm from "../components/PersonalInfoForm.jsx";
import ResumePreview from "../components/ResumePreview.jsx";
import TemplateSelector from "../components/TemplateSelector.jsx";
import ColorPicker from "../components/ColorPicker.jsx";
import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm.jsx";
import ExperienceForm from "../components/ExperienceForm.jsx";
import EducationForm from "../components/EducationForm.jsx";
import ProjectForm from "../components/ProjectForm.jsx";
import SkillsForm from "../components/SkillsForm.jsx";

function ResumeBuilder() {
  const { resumeId } = useParams();

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    projects: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: "personal_info", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkle },
  ];

  const activeSection = sections[activeSectionIndex];

  useEffect(() => {
    const resume = dummyResumeData.find((r) => r._id === resumeId);
    if (resume) {
      setResumeData(resume);
      document.title = resume.title;
    }
  }, [resumeId]);

  const changeResumeVisibility = () => {
    setResumeData((prev) => ({ ...prev, public: !prev.public }));
  };

  const handleShare = async () => {
    const resumeUrl = `${window.location.origin}/view/${resumeId}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "My Resume",
          text: "Check out my resume",
          url: resumeUrl,
        });
      } else {
        await navigator.clipboard.writeText(resumeUrl);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  // ✅ FULL FIXED DOWNLOAD
  const downloadResume = () => {
    const element = document.getElementById("resume-preview");
    if (!element) return;

    const nodes = element.querySelectorAll("*");

    const originalStyles = [];

    nodes.forEach((node, index) => {
      const style = window.getComputedStyle(node);

      originalStyles[index] = {
        el: node,
        color: node.style.color,
        backgroundColor: node.style.backgroundColor,
        borderColor: node.style.borderColor,
      };

      if (style.color.includes("oklch")) {
        node.style.color = "#000";
      }

      if (style.backgroundColor.includes("oklch")) {
        node.style.backgroundColor = "#fff";
      }

      if (style.borderColor.includes("oklch")) {
        node.style.borderColor = "#000";
      }
    });

    const opt = {
      margin: 0.5,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
      },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .catch((err) => console.error("PDF error:", err))
      .finally(() => {
        // restore styles
        originalStyles.forEach(({ el, color, backgroundColor, borderColor }) => {
          el.style.color = color;
          el.style.backgroundColor = backgroundColor;
          el.style.borderColor = borderColor;
        });
      });
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to={"/app"}
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all"
        >
          <ArrowLeftIcon className="size-4" /> Back to Dashboard
        </Link>
      </div>

      <div className="max-w-7x1 max-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">

          <div className="realtive lg:col-span-5 rounded-lg overflow-hidden">
            <div className="bg-white rounded -lg shadow-sm border border-gray-200 p-6 pt-1">

              <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
              <hr
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-2000"
                style={{
                  width: `${
                    (activeSectionIndex / (sections.length - 1)) * 100
                  }%`,
                }}
              />

              <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">

                <div className="flex items-center gap-2">
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) =>
                      setResumeData((prev) => ({ ...prev, template }))
                    }
                  />
                  <ColorPicker
                    selectedColor={resumeData.accent_color}
                    onChange={(accent_color) =>
                      setResumeData((prev) => ({
                        ...prev,
                        accent_color,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center">
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() =>
                        setActiveSectionIndex((prev) =>
                          Math.max(prev - 1, 0)
                        )
                      }
                      className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                    >
                      <ChevronLeft className="size-4" />
                      Previous
                    </button>
                  )}

                  <button
                    onClick={() =>
                      setActiveSectionIndex((prev) =>
                        Math.min(prev + 1, sections.length - 1)
                      )
                    }
                    className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${
                      activeSectionIndex === sections.length - 1 &&
                      "opacity-50"
                    }`}
                    disabled={activeSectionIndex === sections.length - 1}
                  >
                    Next
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {activeSection.id === "personal_info" && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        personal_info: data,
                      }))
                    }
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}

                {activeSection.id === "summary" && (
                  <ProfessionalSummaryForm
                    data={resumeData.professional_summary}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        professional_summary: data,
                      }))
                    }
                  />
                )}

                {activeSection.id === "experience" && (
                  <ExperienceForm
                    data={resumeData.experience}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        experience: data,
                      }))
                    }
                  />
                )}

                {activeSection.id === "education" && (
                  <EducationForm
                    data={resumeData.education}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        education: data,
                      }))
                    }
                  />
                )}

                {activeSection.id === "projects" && (
                  <ProjectForm
                    data={resumeData.projects}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        projects: data,
                      }))
                    }
                  />
                )}

                {activeSection.id === "skills" && (
                  <SkillsForm
                    data={resumeData.skills}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        skills: data,
                      }))
                    }
                  />
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 max-lg:mt-6">
            <div className="relative w-full">
              <div className="absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2">

                {resumeData.public && (
                  <button onClick={handleShare} className="flex item-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg">
                    <Share2Icon className="size-4" />Share
                  </button>
                )}

                <button onClick={changeResumeVisibility} className="flex item-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-pink-100 to-pink-200 text-pink-600 rounded-lg">
                  {resumeData.public ? <EyeIcon className="size-4" /> : <EyeOffIcon className="size-4" />}
                  {resumeData.public ? "Public" : "Private"}
                </button>

                <button onClick={downloadResume} className="flex item-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-lg">
                  <DownloadIcon className="size-4" />
                  Download
                </button>

              </div>
            </div>

            <div id="resume-preview">
              <ResumePreview
                data={resumeData}
                template={resumeData.template}
                accentColor={resumeData.accent_color}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeBuilder;