import { User, Mail, Phone, MapPin, BriefcaseBusiness, Linkedin } from "lucide-react";
function PersonalInfoForm({data, onChange, removeBackground,setRemoveBackground}) {
    const handleChange = (field, value)=>{
      onChange({...data, [field]: value});
    }
    const fields = [
        {key: 'full_name', label: 'Full Name', icon: User, type: 'text', required: true},
        {key: 'email', label: 'Email',  icon: Mail, type: 'email', required: true},
        {key: 'phone', label: 'Phone Number', icon: Phone, type: 'tel', required: false},
        {key: 'location', label: 'Location', icon: MapPin, type: 'text', required: false},
        {key: 'profession', label: 'Profession', icon: BriefcaseBusiness , type: 'text', required: false},
        {key: 'linkedin', label: 'LinkedIn', icon: Linkedin , type: 'url', required: false},
        {key: 'website', label: 'Website', icon: BriefcaseBusiness , type: 'url', required: false}
        
        
    ];
    return (
      <div>
          <h3 className="text-lg font-semibold text-gray-900 ">Personal Information</h3>
          <p className="text-sm text-gray-600 ">Get Started with the personal information</p>
          <div className="flex items-center gap-2">
            <label>{data.image ?( <img src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)} alt="User image" className="w-16 h-16 rounded-full object-cover mt-5 ring ring-slate-300
             hover:opacity-80"></img>) :(
              <div className="inline-flex items-center gap-2 mt-5 text-slate-600 hover:text-slate-700 cursor-pointer">
                <User className="size-10 p-2.5 border rounded-full"/>
                upload user image
              </div >
             ) }
             <input  id="profile_image"
             name="profile_image"type="file" accept="image/jpeg, image/png"
             className="hidden" onChange={(e)=>handleChange("image", e.target.files[0])} />
             </label>
             {typeof data.image === 'object' && (
              <div className="flex flex-col gap-1 pl-4 text-sm">
                <p>Remove Background</p>
                <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                  <input type="checkbox" className="sr-only peer" checked={removeBackground} onChange={()=>setRemoveBackground(prev => !prev)} />
                <div className="w-9 h-5 bg-slate-300 rounded-full peer peer-checked:bg-green-600 transition-colors duration-200 ">
                </div>
                <span className="dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200
                ease-in-out peer-checked:translate-x-4  "></span>
                </label>
                </div>
             )
             }
          </div>
          {fields.map((field) => {
            const Icon = field.icon;
            return(
              <div key={field.key} className="mt-4">
                <label htmlFor={field.key} className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                  {field.required && <span className="text-red-500">*</span>}
                </label>
                <div className="relative">
                  <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                  <input
                   id={field.key}
                   name={field.key}
                    type={field.type}
                    value={data[field.key] || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)} 
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 "
                     placeholder={`Enter Your ${field.label.toLowerCase()}`} 
                    required={field.required}
                  />
                </div>
              </div>
            )
          })}
      </div>
    )
}
export default PersonalInfoForm;