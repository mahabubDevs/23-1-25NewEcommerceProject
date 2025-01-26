//src/routes/PrivateRoute.jsx
import { useLocation, Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({ children, allowdRoles }) => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
    const location = useLocation();
    
    if (!token) {
        return <
            Navigate to="/login"
            state={{ from: location }}
            replace
        />;
    }

    if(user && allowdRoles && !allowdRoles.includes(user.role)){
        return <
            Navigate to="/unauthorized"
            state={{ from: location }}
            replace
        />;
    }

//redirect the user to a specific page if the user is already logged in
    
    if (location.pathname === "/dashbord") {
        {
            if (user.role === "admin") {
                return <
                    Navigate to={`/admin/dashbord/${user.id}`}
                    state={{ from: location }}
                    replace
                />;
            } else if (user.role === "seller") {
                return <
                    Navigate to={`/seller/dashbord/${user.id}`}
                    state={{ from: location }}
                    replace
                />;
            } else {
                return <
                    Navigate to={`/user/dashbord/${user.id}`}
                    state={{ from: location }}
                    replace
                />;
            }
       }
    }
    return children;
};


PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
    allowdRoles: PropTypes.arrayOf(PropTypes.string),
};

export default PrivateRoute;