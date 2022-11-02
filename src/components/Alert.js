import React from 'react'

function Alert(props) {
    const capitalize = (word)=>{
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    
    return (
        <div className="h-[50px] transition  duration-500">
        {props.alert && <div className={`alert alert-${props.alert.type} py-4 px-2 bg-green-200 ${props.alert.type==="Error"? "bg-red-200":""} h-[50px] `}>
           <strong className={`text-green-900 ${props.alert.type==="Error"? "text-red-700":""}`}>{capitalize(props.alert.type)}</strong>:{props.alert.msg}
        </div>}
        </div>
    )
}

export default Alert