
const Button=props=>{
    return  <button type={props.type || "button"} onClick={props.onClick}>{props.label}</button>
}

export default Button