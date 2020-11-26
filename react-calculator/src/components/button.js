import React from 'react';

function Button({label,handleClick}){
    return(
        <button onClick={handleClick}>{label}</button>
        // <input type="button" onClick={handleClick} value={label} />
    )
}

export default Button;