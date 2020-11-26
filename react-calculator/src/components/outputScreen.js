import React from 'react';
import OutputScreenRow from "./outputScreenRow";


function OutputScreen({question, answer}) {
    return (
        <div>
            <OutputScreenRow value={question} />
            <OutputScreenRow value={answer} />
        </div>

)

}

export default OutputScreen;