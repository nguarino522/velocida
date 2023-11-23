import React, { useState, useEffect } from "react"
import { Toast, Button, ToastContainer, ProgressBar } from 'react-bootstrap'
import img from "../assets/runner.png"

const ToastComponent = ({ toasts, handleToastClose }) => {
    const [toastTimers, setToastTimers] = useState({});

    useEffect(() => {
        // Initialize timers for new toasts
        const newToastTimers = {};
        toasts.forEach((toast) => {
            // If the timer for the toast doesn't exist or if the toast is new, create a new timer
            if (!toastTimers[toast.id]) {
                newToastTimers[toast.id] = { timeRemaining: 5 };
            } else {
                // If the timer already exists, use the existing timer
                newToastTimers[toast.id] = toastTimers[toast.id];
            }
        });
        setToastTimers(newToastTimers);

        // Update timers every second
        const interval = setInterval(() => {
            setToastTimers((prevTimers) => {
                const newTimers = { ...prevTimers };
                Object.keys(newTimers).forEach((toastId) => {
                    newTimers[toastId].timeRemaining = Math.max(0, newTimers[toastId].timeRemaining - 1);
                });
                return newTimers;
            });
        }, 1000);

        return () => clearInterval(interval); // Cleanup the interval when the component is unmounted
    }, [toasts]); // Run the effect when toasts change

    return (
        <ToastContainer className="p-3 fading-in" position="bottom-end" style={{ zIndex: 1 }}>
            {toasts.map((toast) => (
                <Toast key={toast.id} onClose={() => handleToastClose(toast.id)} delay={5000} autohide>
                    <Toast.Header>
                        <img src={img} className="rounded me-2" alt="" style={{ width: "8%", backgroundColor: "#86CD82" }} />
                        <strong className="me-auto">Velocida</strong>
                        <small className="text-muted"><ProgressBar animated now={100} />Closing in {toastTimers[toast.id]?.timeRemaining} seconds...</small>
                    </Toast.Header>
                    <Toast.Body>{toast.message}</Toast.Body>
                </Toast>
            ))}
        </ToastContainer>
    )
}

export default ToastComponent;