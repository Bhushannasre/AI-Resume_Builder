import { use } from "react";

function SkillsForm({ data, onChange }) {
    const [newSkill, setNewSkill]= useState("");
    const addSkill = ()=>{
        if(newSkill.trim() && !data.includes(newSkill.trim())){
            onChange([...data, newSkill.trim()]);
            setNewSkill("");
        }
    }
    const removeSkill = (indexToRemove)=>{
        onChange(data.filter((_, index) => index !== indexToRemove));
    }
    const handleKeyPress = (e)=>{
        if(e.key === "Enter"){
            e.preventDefault();
            addSkill();
        }
    return (
        <div className="space-y-6">
            <div>
                <h3 className="flex item-center gap-2 text-lg font-semibold text-gray-900 ">Skills</h3>
                <p className="text-sm text-gray-500">Add your technical and soft skills to showcase your expertise.</p>
            </div>

        </div>
    )
}
export default SkillsForm;