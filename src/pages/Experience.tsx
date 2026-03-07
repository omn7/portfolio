import { Link, Navigate } from "react-router-dom";

// Redirect old /experience route to the merged page
export default function Experience() {
    return <Navigate to="/experience-education" replace />;
}
