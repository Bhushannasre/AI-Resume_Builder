import { useState } from "react";
import { Palette, Check } from "lucide-react";

function ColorPicker({selectedColor, onChange}) {
    const colors =[
        { name:"Blue", value: "#3B82F6" },
        { name:"Red", value: "#EF4444" },
        { name:"Green", value: "#10B981" },
        { name:"Purple", value: "#8B5CF6" },
        { name:"Orange", value: "#F59E0B" },
        { name:"Teal", value: "#14B8A6" },
        { name:"Pink", value: "#EC4899" },
        { name:"Yellow", value: "#EAB308" },
        { name:"Gray", value: "#6B7280" },
        { name:"Indigo", value: "#6366F1" },
        { name:"Cyan", value: "#06B6D4" },
        { name:"Lime", value: "#84CC16" },
        { name:"Rose", value: "#F43F5E" },
        { name:"Purple", value: "#A855F7" },
        { name:"Emerald", value: "#10B981" },
        { name:"Sky", value: "#0EA5E9" },
        {name:"Black", value: "#000000" },
        {name:"Maroon", value: "#800000" },
        {name:"Navy", value: "#000080" },
        {name:"Olive", value: "#808000" },


      
    ]
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="relative">
           <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-1 text-sm text-purple-600 bg-gradient-to-br 
            from-purple-50 to-purple-100 ring-purple-300 hover:ring transition-all px-3 py-2 rounded-lg">
            <Palette size={16}/> <span className="max-sm:hidden ">Accent</span>
            </button> 
              {isOpen && (
                <div className="absolute top-full w-60 p-3 mt-2  left-0 right-0 grid grid-cols-5 gap-3 z-10
                bg-white rounded-md border border-gray-200 shadow-sm">
                    {colors.map((color) => (
                        <div key={color.value}  
                        className="relative cursor-pointer group flex flex-col"
                        onClick={() => {
                            onChange(color.value);
                            setIsOpen(false);
                        }}><div className="w-8 h-8 rounded-full border border-gray-300 group-hover:ring-2 group-hover:ring-purple-400" style={{ backgroundColor: color.value }}></div>
                        {selectedColor === color.value && (
                            <div className="absolute top-0 left-0  right-0 bottom-4 flex items-center justify-center ">
                                <Check className="text-white size-5"/>
                            </div>
                        )}  
                        <p className="text-xs text-center mt-1 text-gray-600 ">{color.name}</p>
                        </div>
                    ))}
                </div>
              )}
        </div>
    );
}   
export default ColorPicker;