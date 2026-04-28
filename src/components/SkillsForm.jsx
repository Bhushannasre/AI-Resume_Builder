import { Sparkle, X } from "lucide-react";
import { useState } from "react";

function SkillsForm({ data, onChange }) {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    const trimmed = newSkill.trim();

    if (trimmed && !data.includes(trimmed)) {
      onChange([...data, trimmed]);
      setNewSkill("");
    }
  };

  const removeSkill = (indexToRemove) => {
    onChange(data.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          Skills
        </h3>
        <p className="text-sm text-gray-500">
          Add your technical and soft skills to showcase your expertise.
        </p>
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter a skill (e.g., JavaScript, Project Management)"
          className="flex-1 px-3 py-2 text-sm border rounded-lg"
          onChange={(e) => setNewSkill(e.target.value)}
          value={newSkill}
          onKeyDown={handleKeyPress}
        />

        <button
          onClick={addSkill}
          disabled={!newSkill.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring focus:ring-blue-500 focus:outline-none transition-colors"
        >
          Add
        </button>
      </div>

      {/* Skills List */}
      {data.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {data.map((skill, index) => (
            <span
              key={index}
              className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {skill}
              <button
                className="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                onClick={() => removeSkill(index)}
              >
                <X className="w-4 h-4" />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <Sparkle className="size-6 mx-auto mb-2" />
          <p>No skills added yet.</p>
          <p className="text-sm">
            Add your technical and soft skills to showcase your expertise.
          </p>
        </div>
      )}

      {/* Footer */}
      <div>
        <p className="text-sm text-gray-600">
          <strong>Total Skills:</strong> Add 8–12 relevant skills. Include both
          technical (programming languages, tools) and soft skills (leadership,
          communication).
        </p>
      </div>
    </div>
  );
}

export default SkillsForm;