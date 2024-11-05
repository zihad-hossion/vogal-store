import { useNavigate } from "react-router-dom";
import { useGetCurrentUserQuery, useLogoutMutation } from "../../services/apiAuth";
import { useDispatch } from "react-redux";
import { clearUser } from "../../slices/authSlice";
import { fetchCartItems } from "../../slices/cartSlice";


export default function useUser() {
    const navigate = useNavigate();
    const { data, isLoading, isError, refetch } = useGetCurrentUserQuery();
    const [logout] = useLogoutMutation();
    const dispatch = useDispatch()

    const isAuthenticated = data?.role === "authenticated";

    const handleLogout = async () => {
        try {
            await logout();
            // await refetch();
            navigate('/login', { replace: true });
            dispatch(clearUser());
            dispatch(fetchCartItems());
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return { isLoading, data, isAuthenticated, isError, handleLogout, refetch };
};

