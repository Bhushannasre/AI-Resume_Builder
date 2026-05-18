import { Briefcase, Plus, Sparkles, Trash2, Loader2 } from "lucide-react"; // ✅ toast is not from lucide-react
import { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";                                        // ✅ correct toast import
import api from "../configs/api";

function ExperienceForm({ data, onChange }) {
    const { token } = useSelector((state) => state.auth);                  // ✅ moved inside component
    const [isGenerating, setIsGenerating] = useState(-1);                  // ✅ moved inside component

    const addExperience = () => {
        const newExperience = {
            company: "", position: "", start_date: "",
            end_date: "", description: "", is_current: false,
        };
        onChange([...data, newExperience]);
    };

    const removeExperience = (index) => {
        onChange(data.filter((_, i) => i !== index));
    };

    const updateExperience = (index, updatedExperience) => {
        const newData = [...data];
        newData[index] = updatedExperience;
        onChange(newData);
    };

    const generateDescription = async (index) => {
        setIsGenerating(index);
        const experience = data[index];
        try {
            const { data: result } = await api.post(
                "/api/ai/enhance-job-desc",
                { userContent: experience.description },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            updateExperience(index, {
                ...experience,
                description: result.enhancedSummary,  // ✅ controller returns "enhancedSummary" not "enhancedDescription"
            });
        } catch (error) {
            toast.error("Error generating description: " + error.message);
        } finally {
            setIsGenerating(-1);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                        Professional Experience
                    </h3>
                    <p className="text-sm text-gray-500">Add your work experience details here</p>
                </div>
                <button
                    onClick={addExperience}
                    className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-600 hover:bg-green-200 focus:ring focus:ring-green-500 focus:outline-none rounded-lg transition-colors"
                >
                    <Plus className="size-4" /> Add Experience
                </button>
            </div>

            {data.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p>No experience added yet. Click "Add Experience" to get started.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {data.map((experience, index) => (
                        <div key={index} className="p-4 border border-gray-300 rounded-lg space-y-3">
                            <div className="flex justify-between items-start">
                                <h4 className="font-medium text-gray-700">Experience #{index + 1}</h4>
                                <button
                                    onClick={() => removeExperience(index)}
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                >
                                    <Trash2 className="size-4" />
                                </button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    value={experience.company || ""}
                                    onChange={(e) => updateExperience(index, { ...experience, company: e.target.value })}
                                    placeholder="Company Name"
                                    className="border border-gray-300 rounded-lg p-2 focus:ring focus:ring-violet-500 focus:outline-none"
                                />
                                <input
                                    type="text"
                                    value={experience.position || ""}
                                    onChange={(e) => updateExperience(index, { ...experience, position: e.target.value })}
                                    placeholder="Position"
                                    className="border border-gray-300 rounded-lg p-2 focus:ring focus:ring-violet-500 focus:outline-none"
                                />
                                <input
                                    type="month"
                                    value={experience.start_date || ""}
                                    onChange={(e) => updateExperience(index, { ...experience, start_date: e.target.value })}
                                    className="border border-gray-300 rounded-lg p-2 focus:ring focus:ring-violet-500 focus:outline-none"
                                />
                                <input
                                    type="month"
                                    value={experience.end_date || ""}
                                    onChange={(e) => updateExperience(index, { ...experience, end_date: e.target.value })}
                                    disabled={experience.is_current}
                                    className="border border-gray-300 rounded-lg p-2 focus:ring focus:ring-violet-500 focus:outline-none disabled:opacity-50"
                                />

                                <label className="flex items-center gap-2 md:col-span-2">
                                    <input
                                        type="checkbox"
                                        checked={experience.is_current || false}
                                        onChange={(e) => updateExperience(index, {
                                            ...experience,
                                            is_current: e.target.checked,
                                            end_date: e.target.checked ? "" : experience.end_date,
                                        })}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">I currently work here</span>
                                </label>

                                <div className="space-y-2 md:col-span-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-medium text-gray-700">Job Description</label>
                                        <button
                                            onClick={() => generateDescription(index)}  // ✅ was missing onClick entirely
                                            disabled={isGenerating === index}
                                            className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-600 hover:bg-purple-200 rounded transition-colors disabled:opacity-50"
                                        >
                                            {isGenerating === index
                                                ? <Loader2 className="w-3 h-3 animate-spin" />
                                                : <Sparkles className="w-3 h-3" />
                                            }
                                            {isGenerating === index ? "Enhancing..." : "Enhance with AI"}
                                        </button>
                                    </div>
                                    <textarea
                                        value={experience.description || ""}
                                        rows={4}
                                        onChange={(e) => updateExperience(index, { ...experience, description: e.target.value })}
                                        placeholder="Describe your responsibilities and achievements..."
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-violet-500 focus:outline-none resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ExperienceForm;