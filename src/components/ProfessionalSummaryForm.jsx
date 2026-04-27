import { Sparkles } from "lucide-react";

function ProfessionalSummaryForm({ data, onChange }) {
  return (
    <div className="space-y-4">
        <div className="flex items-center justify-between">
            <div>
                <h3 className="flex item-center gap-2 text-lg font-semibold text-gray-900">Professional Summary</h3>
                <p className="text-sm text-gray-500">Add summary for your resume here</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-violet-100 text-violet-600 hover:bg-violet-200 focus:ring focus:ring-violet-500 focus:outline-none rounded-lg transition-colors">
                <Sparkles className="size-4"/>
                AI Enhance
            </button>
            </div>
            <div className="mt-6">
            <textarea value={data || ""} onChange={(e)=>onChange(e.target.value)} rows={7} className="w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus-ring-blue-500
            focus:border-blue-500 outline-none transition-colors resize-one " placeholder="Write a compelling professional summary that highlight your strengths and value proposition"/>
            <p className="text-xs text-gray-500 mt-2">Tip: Keep it concise and highlight your most relevant achievements.</p>
            </div>
        </div>
        )
    }
export default ProfessionalSummaryForm;