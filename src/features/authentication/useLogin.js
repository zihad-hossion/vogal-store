import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../services/apiAuth';
import { fetchCartItems } from '../../slices/cartSlice';
import { setUser } from '../../slices/authSlice';
import toast from 'react-hot-toast';


export default function useLogin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login, { isLoading, }] = useLoginMutation();


    const handleLogin = async ({ email, password }) => {
        try {
            const { data, error } = await login({ email, password });

            if (error) {
                throw new Error(error);
            }

            if (data) {
                toast.success("Successfully Login!")
                navigate('/account');
                dispatch(setUser(data?.user));
                dispatch(fetchCartItems());
            }
        } catch (error) {
            console.error('Failed to log in:', error);
        }
    }
    return { login: handleLogin, isLoading };

}