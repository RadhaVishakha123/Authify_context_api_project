import { forwardRef,useImperativeHandle, useRef } from "react";
import { useCallback } from "react";
const InputField=forwardRef(({value,onChange,type="text",name,placeholder,label,Error
},ref)=>{
    const inputRef=useRef()
    useImperativeHandle(ref,()=>({
        focus: () => {
      inputRef.current.focus();
    },
    clear: () => {
      inputRef.current.value = "";
    },
    getValue: () => {
      return inputRef.current.value;
    }

    }))
    return(<>
    <div className="w-full my-2 ">
        <label>{label}</label>
        <input ref={inputRef}
         type={type} 
        placeholder={placeholder} 
        value={value} 
        onChange={onChange} 
        name={name}
        className=" w-full p-2 border-2 rounded-xl border-gray-400 hover:border-blue-700 hover:ring-2 hover:ring-blue-600 outline-none"></input>
        {Error &&(<p className=" text-red-400 text-sm text-center mt-1">{Error}</p>)}
    </div>
    </>) 

})
export default InputField;
