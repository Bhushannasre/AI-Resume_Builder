import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { dummyResumeData } from "../assets/assets";
import Loader from "../components/Loader";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import ResumePreview from "../components/ResumePreview";
import { Link } from "react-router-dom";
function Preview(){
    const {resumeId} = useParams();
    const [resumeData, setResumeData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const loadResumeData= async()=>{
    
        setResumeData(dummyResumeData.find((resume)=>resume._id === resumeId) || null);
        setIsLoading(false);
    }
    useEffect(()=>{
        loadResumeData();
    }, [resumeId])
    return resumeData ? (
        <div className="bg-slate-100">
            <div className="max-w-3xl mx-auto py-10">
                <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} classes="py-4 bg-white" />
            </div>
        </div>
    ) : (
        <div>
            {isLoading ? <Loader/> : (
                <div className="flex flex-col items-center justify-center h-screen">
             <p className="text-center text-gray-500 text-lg">Resume not found.</p>
             <Link to="/" className="mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-6
             h-9 m-1 ring-offset-1 ring-1 ring-green-400 flex item-center transition-colors"><ArrowLeftIcon className="mr-2 size-4"/>Go to Home Page</Link>
             </div>
            )}
        </div>
        
    )

}
export default Preview;