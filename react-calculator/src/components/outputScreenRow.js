import React from 'react';

function OutputScreenRow({value}){
    return(
        <div>
            <input type="text" value={value} readOnly/>
        </div>

    )
}
export default OutputScreenRow;