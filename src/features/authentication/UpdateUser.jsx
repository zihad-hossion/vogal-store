import React from "react";
import { useUpdateUserMutation } from "../../services/apiAuth";

export default function UpdateUser() {
    const [updateUser, { isLoading, data }] = useUpdateUserMutation();

    console.log(data);

    return (
        <div>
            <h1>Update User Data</h1>
            <form action="" onSubmit={handleForm}>
                <div className="grid grid-cols-2 items-center mb-5">
                    <label htmlFor="name" className="block">Name</label>
                    <input type="text" id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="formInput focus:border-blue-700 p-2" required />
                </div>
                <div className="grid grid-cols-2 items-center mb-5">
                    <label htmlFor="email" className="block">Email Address</label>
                    <input type="email" id="email" disabled value={email} className="text-gray-500 bg-gray-200 focus:border-blue-700 p-2 formInput" />
                </div>
                <div className="grid grid-cols-2 items-center mb-5">
                    <label htmlFor="number" className="block">Mobile Number</label>
                    <input type="number" id="number" value={phone} onChange={(e) => setPhone(e.target.value)} min={8} max={11} className="p-2 formInput" required />
                </div>
                <div className="flex justify-end">
                    <button className="text-white bg-blue-600 hover:bg-blue-900 rounded transition p-3 mt-5">Update Profile</button>
                </div>
            </form>
        </div>
    )
};

