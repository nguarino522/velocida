import React, { useState, useEffect } from "react"
import { Toast, Button, ToastContainer, ProgressBar } from 'react-bootstrap'
import img from "../assets/runner.png"

const ToastComponent = ({ toasts, handleToastClose }) => {

    return (
        <ToastContainer className="p-3 fading-in" position="bottom-end" style={{ zIndex: 1 }}>
            {toasts.map((toast) => (
                <Toast key={toast.id} onClose={() => handleToastClose(toast.id)} delay={5000} autohide>
                    <Toast.Header>
                        <img src={img} className="rounded me-2" alt="" style={{ width: "8%", backgroundColor: "#86CD82" }} />
                        <strong className="me-auto">Velocida</strong>
                        <small><ProgressBar animated now={100} />Closing in 5 seconds...</small>
                    </Toast.Header>
                    <Toast.Body>{toast.message}</Toast.Body>
                </Toast>
            ))}
        </ToastContainer>
    )
}

export default ToastComponent;