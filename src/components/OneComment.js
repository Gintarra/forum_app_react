import React from 'react';
 import { validLink} from './Regex'

const OneComment = ({x}) => {
 function validate (){
    if (validLink.test(x.text)) {
        console.log('radau!')
     } else {
         console.log("neee :/")
     }
 }
    return (
        <div>
            {x.text}
            {/* <button onClick={validate}>Validate fdd</button> */}
        </div>
    );
};

export default OneComment;