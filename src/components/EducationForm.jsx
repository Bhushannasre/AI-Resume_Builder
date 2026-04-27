import { Briefcase, Plus, Sparkles, Trash2, User,GraduationCap, FolderIcon } from "lucide-react";
function EducationForm({ data, onChange }) {
    
   const addEducation = () => {
    const newEducation = {
       institution: "",
       degree: "",
       field:"",
       graduation_date: "",
       gpa: "",
    }
    onChange([...data, newEducation]);
   };
  const removeEducation = (index) => {
    const updatedEducation = data.filter((_, i) => i !== index);
    onChange(updatedEducation); // ✅ fixed variable name
  };

  const updateEducation = (index, field, value) => {
    const newData = [...data];  
    newData[index] = { ...newData[index], [field]: value };
    onChange(newData);
  }; 
    
    return (
       <div className="space-y-6">
      <div className="flex  items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900"> {/* ✅ items-center */}
            Education
          </h3>
          <p className="text-sm text-gray-500">Add your educational details here</p>
        </div>
        <button onClick={addEducation} className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-600 hover:bg-green-200 focus:ring focus:ring-green-500 focus:outline-none rounded-lg transition-colors">
          <Plus className="size-4" />
          Add Education
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-400" /> {/* ✅ mx-auto */}
          <p>No education added yet. Click "Add Education" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((education, index) => (
            <div key={index} className="p-4 border border-gray-300 rounded-lg space-y-3">
              <div className="flex justify-between items-start"> {/* ✅ items-start */}
                <h4>Education #{index + 1}</h4>
                <button onClick={() => removeEducation(index)} className="text-red-500 hover:text-red-700 transition-colors">
                  <Trash2 className="size-4" /> {/* ✅ imported */}
                </button>
              </div>

              <div className="flex flex-col gap-3">
                <input type="text"  value={education.institution || ""} onChange={(e) => updateEducation(index, "institution", e.target.value)} placeholder="Institution Name" className="border border-gray-300 rounded-lg p-2 focus:ring focus:ring-violet-500 focus:outline-none  " />
                <input type="text"  value={education.degree || ""} onChange={(e) => updateEducation(index, "degree", e.target.value)} placeholder="Degree" className="border border-gray-300 rounded-lg p-2 focus:ring focus:ring-violet-500 focus:outline-none" />
                <input type="text"  value={education.field || ""} onChange={(e) => updateEducation(index, "field", e.target.value)} placeholder="Field of Study" className="border border-gray-300 rounded-lg p-2 focus:ring focus:ring-violet-500 focus:outline-none" />
                <input type="month" value={education.graduation_date || ""} onChange={(e) => updateEducation(index, "graduation_date", e.target.value)} className="border border-gray-300 rounded-lg p-2 focus:ring focus:ring-violet-500 focus:outline-none" />
                <input type="text" value={education.gpa || ""} onChange={(e) => updateEducation(index, "gpa", e.target.value)} placeholder="GPA (optional)" className="border border-gray-300 rounded-lg p-2 focus:ring focus:ring-violet-500 focus:outline-none" />

                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={education.is_current || false}
                    onChange={(e) => updateEducation(index, "is_current", e.target.checked)}   
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-gray-700">I currently study here</span>
                </label>

                
              </div>
            </div> 
          ))}     
        </div>
      )}
    </div>

    )
}
export default EducationForm;