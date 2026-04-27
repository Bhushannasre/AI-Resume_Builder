import { Briefcase, Plus, Trash2 } from "lucide-react";

function ProjectForm({ data = [], onChange }) {  
    const addProject = () => {
        const newProject = {
            name: "",
            description: "",
            technologies: "",
            link: "",
        }
        onChange([...data, newProject]);
    };

    const removeProject = (index) => {
        const updatedProjects = data.filter((_, i) => i !== index);
        onChange(updatedProjects);
    };

    const updateProject = (index, field, value) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [field]: value };
        onChange(newData);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                        Projects
                    </h3>
                    <p className="text-sm text-gray-500">Add your project details here</p>
                </div>
                <button onClick={addProject} className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-600 hover:bg-green-200 focus:ring focus:ring-green-500 focus:outline-none rounded-lg transition-colors">
                    <Plus className="size-4" />
                    Add Project
                </button>
            </div>

            {data.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p>No projects added yet. Click "Add Project" to get started.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {data.map((project, index) => (
                        <div key={index} className="p-4 border border-gray-300 rounded-lg space-y-3">
                            <div className="flex justify-between items-start">
                                <h4>Project #{index + 1}</h4>
                                <button onClick={() => removeProject(index)} className="text-red-500 hover:text-red-700 transition-colors">
                                    <Trash2 className="size-4" />
                                </button>
                            </div>
                            <div className="flex flex-col gap-3">
                                <input
                                    type="text"
                                    value={project.name || ""}
                                    onChange={(e) => updateProject(index, "name", e.target.value)}
                                    placeholder="Project Name"
                                    className="border border-gray-300 rounded-lg p-2 focus:ring focus:ring-violet-500 focus:outline-none"
                                />
                                <textarea
                                    value={project.description || ""}
                                    onChange={(e) => updateProject(index, "description", e.target.value)}
                                    placeholder="Project Description"
                                    rows={3}
                                    className="border border-gray-300 rounded-lg p-2 focus:ring focus:ring-violet-500 focus:outline-none"
                                />
                                <input
                                    type="text"
                                    value={project.technologies || ""}
                                    onChange={(e) => updateProject(index, "technologies", e.target.value)}
                                    placeholder="Technologies Used (comma separated)"
                                    className="border border-gray-300 rounded-lg p-2 focus:ring focus:ring-violet-500 focus:outline-none"
                                />
                                {project.technologies && (
                                    <div className="flex flex-wrap gap-1 -mt-1">
                                        {project.technologies.split(",").map((tech, i) => tech.trim() && (
                                            <span key={i} className="px-2 py-0.5 text-xs bg-violet-100 text-violet-700 rounded-full">
                                                {tech.trim()}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <input
                                    type="url"
                                    value={project.link || ""}
                                    onChange={(e) => updateProject(index, "link", e.target.value)}
                                    placeholder="Project Link (optional)"
                                    className="border border-gray-300 rounded-lg p-2 focus:ring focus:ring-violet-500 focus:outline-none"
                                />
                                {project.link && !/^https?:\/\//.test(project.link) && (
                                    <p className="text-xs text-red-500 -mt-2">Link should start with http:// or https://</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProjectForm;