import React from "react";
import { useForm } from "react-hook-form";
import { useUpdateUserMutation } from "../../services/apiAuth";
import FormRow from "../../ui/FormRow";


export default function UpdatePasswordForm() {
    const [updateUser, { isLoading, data }] = useUpdateUserMutation();
    const { register, handleSubmit, formState, getValues, reset } = useForm();
    const { errors } = formState;

    function handleForm({ password }) {
        updateUser({ password }, { onSuccess: reset });
    }

    return (
        <article>
            <h1 className="text-base mb-5">Update Password</h1>
            <form action="" onSubmit={handleSubmit(handleForm)} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <FormRow label={"Password"} customStyle={"grid grid-cols-[150px_1fr] items-center mb-5"} error={errors?.password?.message}>
                    <input type="password" id="password" autoComplete="current-password" className="formInput focus:border-blue-700 p-2"
                        {...register("password", {
                            required: "This field is required",
                            minLength: {
                                value: 8,
                                message: "Password needs a minimum of 8 characters",
                            },
                        })}
                    />
                </FormRow>
                <FormRow label={"Confirm Password"} customStyle={"grid grid-cols-[150px_1fr] items-center mb-5"}>
                    <input type="password" id="passwordConfirm" autoComplete="new-password"
                        className="formInput focus:border-blue-700 p-2"
                        {...register("passwordConfirm", {
                            required: "This field is required",
                            validate: (value) =>
                                getValues().password === value || "Passwords need to match",
                        })}
                    />
                </FormRow>
                <div></div>
                <div className="flex justify-end">
                    <button className="text-white bg-red-500 hover:bg-red-800 rounded transition p-3">Update Password</button>
                </div>
            </form>
        </article>
    )
};