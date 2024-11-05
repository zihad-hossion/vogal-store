import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CiAt, CiLock } from "react-icons/ci";
import { FaUser } from "react-icons/fa6";
import { BiShow, BiHide } from "react-icons/bi";
import useSignup from "./useSignup";
import FormRow from "../../ui/FormRow";

export default function SignupForm() {
    const { signup, isLoading } = useSignup();
    const { register, formState: { errors, isSubmitting }, getValues, handleSubmit, reset, watch } = useForm();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const passwordValue = watch("password", ""); // Adding a default empty string

    const handleSignup = useCallback((data) => {
        signup(data, { onSettled: () => reset() });
    }, [signup, reset]);

    return (
        <section className="w-full flex items-center justify-center p-[30px_0]">
            <div>
                <h1 className="text-xl font-medium text-center mb-3">Sign Up</h1>
                <form className="w-[350px] border border-[#ddd] p-10" onSubmit={handleSubmit(handleSignup)}>
                    <FormRow customStyle="block mb-4" error={errors?.fullName?.message}>
                        <FaUser className="h-10 text-[#6e5e28] absolute top-0 left-5 transition" />
                        <input type="text" id="fullName" placeholder="Enter Full Name" className="formInput pl-12"
                            {...register("fullName", { required: "This field is required" })} />
                    </FormRow>

                    <FormRow customStyle="block mb-4" error={errors?.email?.message}>
                        <CiAt className="h-10 text-[#6e5e28] absolute top-0 left-5 transition" />
                        <input type="email" id="email" placeholder="Enter Your E-mail" className="formInput pl-12"
                            {...register("email", {
                                required: "This field is required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Please provide a valid email address"
                                }
                            })} />
                    </FormRow>

                    <FormRow customStyle="block mb-4" error={errors?.password?.message}>
                        <CiLock className="h-10 text-[#6e5e28] absolute top-0 left-5 transition" />
                        <input type={isPasswordVisible ? "text" : "password"} id="password" placeholder="Enter Password" className="formInput pl-12"
                            {...register("password", {
                                required: "This field is required",
                                minLength: {
                                    value: 8,
                                    message: "Password needs a minimum of 8 characters"
                                }
                            })} />
                        <span className="h-10 text-[#6e5e28] absolute top-0 right-3 transition" onClick={() => setIsPasswordVisible(prev => !prev)}
                            style={{ display: passwordValue.length > 0 ? "block" : "none" }}>
                            {isPasswordVisible ? <BiHide className="h-10" /> : <BiShow className="h-10" />}
                        </span>
                    </FormRow>

                    <button type="submit" className="w-full h-12 text-base bg-slate-200 hover:text-white hover:bg-stone-500 uppercase mt-3 rounded transition" disabled={isSubmitting || isLoading}>
                        {isLoading ? "Signing Up..." : "Sign Up"}
                    </button>

                    <div className="text-sm flex justify-center mt-5">
                        <p className="text-stone-500">Have an account</p>
                        <span className="mx-1">?</span>
                        <Link to="/login" className="hover:text-red-500 transition">Log In</Link>
                    </div>
                </form>
            </div>
        </section>
    );
};