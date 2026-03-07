import { Link, Navigate } from "react-router-dom";

// Redirect old /education route to the merged page
export default function Education() {
    return <Navigate to="/experience-education" replace />;
}
