import {
    FilePenIcon,
    PencilIcon,
    PlusIcon,
    TrashIcon,
    UploadCloudIcon,
    XIcon,
} from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { UploadCloud } from "lucide-react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import api from "../configs/api";

function Dashboard() {
    const { user, token } = useSelector((state) => state.auth);

    const colors = [
        "#34D399",
        "#60A5FA",
        "#F472B6",
        "#A78BFA",
        "#FBBF24",
        "#F87171",
    ];

    const [allResumes, setAllResumes] = useState([]);
    const [showCreateResume, setShowCreateResume] = useState(false);
    const [showUploadResume, setShowUploadResume] = useState(false);
    const [title, setTitle] = useState("");
    const [resume, setResume] = useState(null);
    const [editResumeId, setEditResumeId] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const authHeader = { headers: { Authorization: `Bearer ${token}` } };

    // ─── Load all resumes ────────────────────────────────────────────────────
    const loadAllResumes = useCallback(async () => {
        try {
            const { data } = await api.get("/api/resumes", authHeader);
            setAllResumes(data.resumes || []);
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        }
    }, [token]);

    // ─── Create blank resume ─────────────────────────────────────────────────
    const createResume = async (event) => {
        event.preventDefault();
        try {
            const { data } = await api.post("/api/resumes/create", { title }, authHeader);
            setAllResumes((prev) => [data.resume, ...prev]);
            setTitle("");
            setShowCreateResume(false);
            navigate(`/app/builder/${data.resume._id}`);
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        }
    };

    // ─── Upload & parse PDF resume ───────────────────────────────────────────
    const uploadResume = async (event) => {
        event.preventDefault();

        if (!resume) return toast.error("Please select a PDF file");

        setIsLoading(true);
        const toastId = toast.loading("Extracting text from PDF...");

        try {
            const formData = new FormData();
            formData.append("resume", resume);
            formData.append("title", title);

            toast.loading("Uploading to AI...", { id: toastId });

            const { data } = await api.post("/api/ai/upload-resume", formData, {
                headers: { Authorization: `Bearer ${token}` },
                // Do NOT set Content-Type — browser sets it with the correct boundary
            });

            toast.success("Resume uploaded!", { id: toastId });
            setTitle("");
            setResume(null);
            setShowUploadResume(false);
            navigate(`/app/builder/${data.resumeId}`);
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message, { id: toastId });
        } finally {
            setIsLoading(false);
        }
    };

    // ─── Edit resume title ───────────────────────────────────────────────────
    const editTitle = async (event) => {
        event.preventDefault();
        try {
            const { data } = await api.put(
                `/api/resumes/update-title/${editResumeId}`,
                { title },
                authHeader
            );
            setAllResumes((prev) =>
                prev.map((r) =>
                    r._id === editResumeId
                        ? { ...r, title: data.resume?.title || title }
                        : r
                )
            );
            toast.success("Title updated!");
            setEditResumeId("");
            setTitle("");
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        }
    };

    // ─── Delete resume ───────────────────────────────────────────────────────
    const deleteResume = async (resumeId) => {
        const confirmed = window.confirm("Are you sure you want to delete this resume?");
        if (!confirmed) return;

        try {
            await api.delete(`/api/resumes/delete/${resumeId}`, authHeader);
            setAllResumes((prev) => prev.filter((r) => r._id !== resumeId));
            toast.success("Resume deleted");
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        }
    };

    useEffect(() => {
        loadAllResumes();
    }, [loadAllResumes]);

    return (
        <div>
            <div className="p-4 max-w-7xl mx-auto py-8">
                <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
                    Welcome, {user?.name}
                </p>

                {/* ── Action Buttons ── */}
                <div className="flex gap-4">
                    <button
                        onClick={() => setShowCreateResume(true)}
                        className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center
                        rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500"
                    >
                        <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-blue-300 to-green-500 text-white rounded-full" />
                        <p className="text-sm group-hover:text-green-600 transition-all duration-300">
                            Create Resume
                        </p>
                    </button>

                    <button
                        onClick={() => setShowUploadResume(true)}
                        className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center
                        rounded-lg border-2 border-dashed border-gray-300 hover:border-purple-500"
                    >
                        <UploadCloudIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-pink-300 to-purple-500 text-white rounded-full" />
                        <p className="text-sm group-hover:text-purple-600 transition-all duration-300">
                            Upload Existing
                        </p>
                    </button>
                </div>

                <hr className="border-slate-300 my-6 sm:w-[350px]" />

                {/* ── Resume Cards ── */}
                <div className="grid grid-col-2 sm:flex flex-wrap gap-4">
                    {allResumes.map((resume, index) => {
                        const baseColor = colors[index % colors.length];
                        return (
                            <button
                                key={resume._id}
                                onClick={() => navigate(`/app/builder/${resume._id}`)}
                                className="relative w-full sm:w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2
                                border group hover:shadow-lg transition-all duration-300 cursor-pointer"
                                style={{
                                    background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                                    borderColor: baseColor + "40",
                                }}
                            >
                                <FilePenIcon
                                    className="size-7 group-hover:scale-105 transition-all"
                                    style={{ color: baseColor }}
                                />
                                <p
                                    className="text-sm group-hover:scale-105 transition-all px-2 text-center"
                                    style={{ color: baseColor }}
                                >
                                    {resume.title}
                                </p>
                                <p
                                    className="absolute bottom-1 text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center text-xs"
                                    style={{ color: baseColor + "90" }}
                                >
                                    Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                                </p>
                                <div
                                    onClick={(e) => e.stopPropagation()}
                                    className="absolute top-1 right-1 group-hover:flex items-center hidden"
                                >
                                    <TrashIcon
                                        onClick={() => deleteResume(resume._id)}
                                        className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"
                                    />
                                    <PencilIcon
                                        onClick={() => {
                                            setEditResumeId(resume._id);
                                            setTitle(resume.title);
                                        }}
                                        className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"
                                    />
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* ── Modals ── */}
                <div>
                    {/* Create Resume Modal */}
                    {showCreateResume && (
                        <form
                            onSubmit={createResume}
                            onClick={() => setShowCreateResume(false)}
                            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
                        >
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
                            >
                                <h2 className="text-xl font-bold mb-4">Create a Resume</h2>
                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    type="text"
                                    placeholder="Enter resume title"
                                    className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600"
                                    required
                                />
                                <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                                    Create Resume
                                </button>
                                <XIcon
                                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                                    onClick={() => { setShowCreateResume(false); setTitle(""); }}
                                />
                            </div>
                        </form>
                    )}

                    {/* Upload Resume Modal */}
                    {showUploadResume && (
                        <form
                            onSubmit={uploadResume}
                            onClick={() => setShowUploadResume(false)}
                            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
                        >
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
                            >
                                <h2 className="text-xl font-bold mb-4">Upload Resume</h2>
                                <input
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                    type="text"
                                    placeholder="Enter resume title"
                                    className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600"
                                    required
                                />
                                <div>
                                    <label htmlFor="resume-input" className="block text-sm text-slate-700">
                                        Select resume file
                                        <div className="flex flex-col items-center gap-2 border group text-slate-400 border-slate-400
                                            border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors">
                                            {resume ? (
                                                <p className="text-sm text-green-600 font-medium">{resume.name}</p>
                                            ) : (
                                                <>
                                                    <UploadCloud className="size-14 stroke-1" />
                                                    <p>Upload resume</p>
                                                </>
                                            )}
                                        </div>
                                    </label>
                                    <input
                                        type="file"
                                        id="resume-input"
                                        accept=".pdf"
                                        hidden
                                        onChange={(e) => setResume(e.target.files[0])}
                                    />
                                </div>
                                <button
                                    disabled={isLoading}
                                    className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60 transition-colors"
                                >
                                    {isLoading ? "Uploading..." : "Upload Resume"}
                                </button>
                                <XIcon
                                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                                    onClick={() => { setShowUploadResume(false); setTitle(""); setResume(null); }}
                                />
                            </div>
                        </form>
                    )}

                    {/* Edit Title Modal */}
                    {editResumeId && (
                        <form
                            onSubmit={editTitle}
                            onClick={() => setEditResumeId("")}
                            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
                        >
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
                            >
                                <h2 className="text-xl font-bold mb-4">Edit Resume Title</h2>
                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    type="text"
                                    placeholder="Enter resume title"
                                    className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600"
                                    required
                                />
                                <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                                    Update
                                </button>
                                <XIcon
                                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                                    onClick={() => { setEditResumeId(""); setTitle(""); }}
                                />
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;