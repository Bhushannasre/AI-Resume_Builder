import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import api from "../configs/api";

function ProfessionalSummaryForm({ data, onChange }) {
    const { token } = useSelector((state) => state.auth);
    const [isGenerating, setIsGenerating] = useState(false);

    const generateSummary = async () => {
        try {
            setIsGenerating(true);
            const { data: result } = await api.post(
                "/api/ai/enhance-pro-sum",
                { userContent: data },           // ✅ backend expects "userContent", not "prompt"
                { headers: { Authorization: `Bearer ${token}` } }
            );
            onChange(result.enhancedSummary);    // ✅ use onChange prop, not setResumeData; key is "enhancedSummary"
        } catch (error) {
            toast.error("Error generating summary: " + error.message);
        } finally {
            setIsGenerating(false);
        }
    };                                           // ✅ closing brace for generateSummary was missing

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900"> {/* ✅ item-center → items-center */}
                        Professional Summary
                    </h3>
                    <p className="text-sm text-gray-500">Add summary for your resume here</p>
                </div>
                <button
                    onClick={generateSummary}
                    disabled={isGenerating}
                    className="flex items-center gap-2 px-4 py-2 bg-violet-100 text-violet-600 hover:bg-violet-200 focus:ring focus:ring-violet-500 focus:outline-none rounded-lg transition-colors"
                >
                    {isGenerating                          // ✅ removed duplicate <Sparkles> and duplicate label
                        ? <Loader2 className="size-4 animate-spin" />
                        : <Sparkles className="size-4" />
                    }
                    {isGenerating ? "Enhancing..." : "AI Enhance"}
                </button>
            </div>
            <div className="mt-6">
                <textarea
                    value={data || ""}
                    onChange={(e) => onChange(e.target.value)}
                    rows={7}
                    className="w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-blue-500 {/* ✅ focus-ring → focus:ring */}
                    focus:border-blue-500 outline-none transition-colors resize-none"  // ✅ resize-one → resize-none
                    placeholder="Write a compelling professional summary that highlights your strengths and value proposition"
                />
                <p className="text-xs text-gray-500 mt-2">
                    Tip: Keep it concise and highlight your most relevant achievements.
                </p>
            </div>
        </div>
    );                                     
}

export default ProfessionalSummaryForm;