import { useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export default function useSignup() {
    const navigate = useNavigate();
    const [signup, { isLoading }] = useSignupMutation();

    const handleSignup = async ({ fullName, email, password }) => {
        try {
            const { data, error } = await signup({ fullName, email, password });

            if (error) {
                throw new Error(error);
            }

            toast.success("Succefully signup")
            navigate('/login', { replace: true });

        } catch (err) {
            console.error('Signup failed:', err.message);
        }
    }

    return { signup: handleSignup, isLoading };
}
