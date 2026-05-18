import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { ArrowLeftIcon } from "lucide-react";
import ResumePreview from "../components/ResumePreview";
import api from "../configs/api";

function Preview() {
    const { resumeId } = useParams();
    const [resumeData, setResumeData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const loadResumeData = useCallback(async () => {
        try {
            const { data } = await api.get(`/api/resumes/public/${resumeId}`);
            if (data.resume) {
                setResumeData(data.resume);
            }
        } catch (error) {
            console.error("Error loading resume data:", error);
        } finally {
            setIsLoading(false);
        }
    }, [resumeId]);

    useEffect(() => {
        loadResumeData();
    }, [loadResumeData]);   // ✅ depend on the memoized function — ESLint satisfied

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!resumeData) {
        return (
            <div className="flex flex-col items-center justify-center h-screen gap-4">
                <p className="text-center text-gray-500 text-lg">Resume not found.</p>
                <Link
                    to="/"
                    className="mt-2 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-9
                    ring-offset-1 ring-1 ring-green-400 flex items-center transition-colors"
                >
                    <ArrowLeftIcon className="mr-2 size-4" /> Go to Home Page
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-slate-100 min-h-screen">
            <div className="max-w-3xl mx-auto py-10">
                <ResumePreview
                    data={resumeData}
                    template={resumeData.template}
                    accentColor={resumeData.accent_color}
                    classes="py-4 bg-white"
                />
            </div>
        </div>
    );
}

export default Preview;