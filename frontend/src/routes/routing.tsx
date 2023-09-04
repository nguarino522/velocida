import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";

export default function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/test" element={<>test</>} />
            </Routes>
        </BrowserRouter>
    )
}

