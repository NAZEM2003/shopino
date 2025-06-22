"use client"
import React from 'react';
import Swal from 'sweetalert2';

const ViewCommentBtn = ({message}) => {
    const showMessage = ()=>{
        Swal.fire({
            title:"Your Comment",
            text:message,
            confirmButtonColor:"#2264a8"
        })
    }
    return (
        <button className='my-4 p-2 border border-custom-dark-blue rounded-md font-semibold text-lg text-custom-dark-blue hover:text-slate-200 hover:bg-custom-dark-blue transition-all duration-200'
        onClick={showMessage}
        >
            View Comment
        </button>
    );
}

export default ViewCommentBtn;
