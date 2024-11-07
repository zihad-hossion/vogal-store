import React, { useCallback, useState, } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import supabase from "../../services/supabase";
import { CiAt, CiLock } from "react-icons/ci";
import FormRow from "../../ui/FormRow";
import Loader from "../../ui/Loader";
import useLogin from "./useLogin";
import { BiShow, BiHide } from "react-icons/bi";

export default function LoginForm() {
    const { login, isLoading } = useLogin();
    const { register, formState: { errors, isSubmitting }, getValues, handleSubmit, reset, watch } = useForm();
    const [isResetActive, setIsResetActive] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const passwordValue = watch("password", ""); // Adding a default empty string

    const handleLogin = useCallback((data) => {
        login(data, { onSettled: () => reset() });
    }, [login, reset])

    if (isLoading) return <Loader />;

    return (
        <section className="w-full flex items-center justify-center py-20">
            <div className="relative">
                {isResetActive ? <ResetPassword onIsResetActive={setIsResetActive} /> :
                    <>
                        <h1 className="text-xl font-medium text-center mb-3">Log In</h1>
                        <form onSubmit={handleSubmit(handleLogin)} className="w-96 border border-[#ddd] p-10">
                            <FormRow customStyle={"block mb-4"} error={errors?.email?.message}>
                                <CiAt className="h-10 text-[#6e5e28] absolute top-0.5 left-5 transition" />
                                <input type="email" id="email" placeholder="Enter Your E-mail" className="formInput pl-10"
                                    {...register("email", {
                                        required: "This field is required",
                                        pattern: {
                                            value: /\S+@\S+\.\S+/,
                                            message: "Please provide a valid email address"
                                        }
                                    })}
                                />
                            </FormRow>
                            <FormRow customStyle={"block mb-4"} error={errors?.password?.message}>
                                <CiLock className="h-10 text-[#6e5e28] absolute top-0 left-5 transition" />
                                <input type={isPasswordVisible ? "text" : "password"} id="password" placeholder="Enter Your Password" className="formInput pl-10"
                                    {...register("password", {
                                        required: "This field is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password needs a minimum of 8 characters"
                                        }
                                    })}
                                />
                                <span className="h-10 text-[#6e5e28] absolute top-0 right-3 transition" onClick={() => setIsPasswordVisible(prev => !prev)}
                                    style={{ display: passwordValue.length > 0 ? "block" : "none" }}>
                                    {isPasswordVisible ? <BiHide className="h-10" /> : <BiShow className="h-10" />}
                                </span>
                            </FormRow>
                            <div className="flex items-center justify-between mt-3">
                                <button type="button" className="text-sm hover:bg-slate-50 p-3 rounded-full" onClick={() => setIsResetActive((prev) => !prev)}>Forgot password?</button>
                                <button type="submit" className="bg-slate-300 hover:text-white hover:bg-black text-base px-7 py-2 uppercase transition">Login</button>
                            </div>
                            <div className="text-sm flex justify-center mt-5">
                                <p>Don't have an account yet</p>
                                <span className="mx-1">?</span>
                                <Link to={"/signup"}>
                                    <span className="hover:text-red-500 transition">Registration</span>
                                </Link>
                            </div>
                        </form>
                    </>
                }
            </div>
        </section>
    )
};

function ResetPassword({ onIsResetActive }) {
    const { register, formState: { errors, isSubmitting }, handleSubmit, reset } = useForm();

    const handleForgotPassword = async ({ email }) => {
        try {

            // Query the users table to check if the email exists
            const { data: user, error: userError } = await supabase
                .from('users')
                .select('email')
                .eq('email', email)
                .single();

            if (userError || !user) {
                toast.error("This email is not associated with any account.");
                return;
            }

            if (user) {
                console.log(user);

                const { error: resetError } = await supabase.auth.resetPasswordForEmail(email);
                reset();
                if (resetError) {
                    toast.error("Failed to send reset link.");
                    return;
                }
                toast.success("A password reset link has been sent to your email.")
            }
        }
        catch (error) {
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <>
            <h1 className="text-xl font-medium text-center mb-3">Reset your password</h1>
            <form onSubmit={handleSubmit(handleForgotPassword)} className="w-96 border border-[#ddd] p-10">
                <FormRow customStyle={"block mb-4"} error={errors?.email?.message}>
                    <CiAt className="h-10 text-[#6e5e28] absolute top-0.5 left-5 transition" />
                    <input type="email" id="email" placeholder="Enter Your E-mail" className="formInput pl-10"
                        {...register("email", {
                            required: "This field is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Please provide a valid email address"
                            }
                        })}
                    />
                </FormRow>
                <div className="flex items-center justify-between mt-3">
                    <button type="button" className="text-sm hover:bg-slate-50 p-2 rounded-xl" onClick={() => onIsResetActive((prev) => !prev)}>Cancel</button>
                    <button type="submit" className="bg-slate-300 hover:text-white hover:bg-black text-base px-7 py-2 uppercase transition">Submit</button>
                </div>
            </form>
        </>
    )
}