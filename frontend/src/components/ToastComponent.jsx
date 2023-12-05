import React, { useState, useEffect } from "react"
import { Toast, ToastContainer, ProgressBar } from 'react-bootstrap'
import successImg from "../assets/success.jpg"
import errorImg from "../assets/error.jpg"
import img from "../assets/runner.png"

const ToastComponent = ({ toasts, handleToastClose }) => {

    const getIconAndBgColor = (type) => {
        switch (type) {
            case 'success':
                return { icon: successImg, bgColor: "#86CD82" };
            case 'error':
                return { icon: errorImg, bgColor: "#FF6868" };
            default:
                return { icon: img, bgColor: "#86CD82" };
        }
    };

    return (
        <ToastContainer className="p-3 fading-in" position="bottom-end" style={{ zIndex: 1 }}>
            {toasts.map((toast) => {
                const { icon, bgColor } = getIconAndBgColor(toast.type);
                return (
                    <Toast key={toast.id} onClose={() => handleToastClose(toast.id)} delay={5000} autohide>
                        <Toast.Header>
                            <img src={icon} className="rounded me-2" alt="" style={{ width: "8%", backgroundColor: bgColor }} />
                            <strong className="me-auto">{toast.type === 'success' ? 'Success' : 'Error'}</strong>
                            <small><ProgressBar animated now={100} />Closing in 5 seconds...</small>
                        </Toast.Header>
                        <Toast.Body>{toast.message}</Toast.Body>
                    </Toast>
                );
            })}
        </ToastContainer>
    )

    // return (
    //     <ToastContainer className="p-3 fading-in" position="bottom-end" style={{ zIndex: 1 }}>
    //         {toasts.map((toast) => (
    //             <Toast key={toast.id} onClose={() => handleToastClose(toast.id)} delay={5000} autohide>
    //                 <Toast.Header>
    //                     <img src={img} className="rounded me-2" alt="" style={{ width: "8%", backgroundColor: "#86CD82" }} />
    //                     <strong className="me-auto">Velocida</strong>
    //                     <small><ProgressBar animated now={100} />Closing in 5 seconds...</small>
    //                 </Toast.Header>
    //                 <Toast.Body>{toast.message}</Toast.Body>
    //             </Toast>
    //         ))}
    //     </ToastContainer>
    // )
}

export default ToastComponent;