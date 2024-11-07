import React, { useState, useRef, useContext, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setUser } from "../slices/authSlice";
import supabase from "../services/supabase";
import { useUpdateUserMutation } from "../services/apiAuth";
import SectionContainer from "../ui/SectionContainer";
import useUser from "../features/authentication/useUser";
import Logout from "../features/authentication/Logout";
import Loader from "../ui/Loader";
import FormRow from "../ui/FormRow";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import useWindowSize from "../hooks/useWindowSize";
import useClickOutside from "../hooks/useClickOutside";
import { DrawerContext } from "../context/DrawerContext";
import { IoCloseOutline } from "react-icons/io5";


export default function Account() {
    const { isDrawerOpen, setDrawerOpen, activeSection, setActiveSection, } = useContext(DrawerContext);
    const windowWidth = useWindowSize();
    const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated);
    const isLoading = useSelector((state) => state?.auth?.isLoading);
    const userData = useSelector((state) => state?.auth?.user);

    useEffect(() => {
        if (isDrawerOpen) {
            setActiveSection("profile");
        }
    }, [isDrawerOpen, setActiveSection])

    if (!isAuthenticated) return <Loader />;

    const closeDrawer = () => setDrawerOpen(false);

    return (
        <SectionContainer title={"My Account"}>
            {isLoading ? (
                <Loader />
            ) : (
                windowWidth > 992 ? (
                    <DesktopAccount data={userData} activeSection={activeSection} onSectionChange={setActiveSection} />
                ) : (
                    <MobAccount
                        data={userData}
                        activeSection={activeSection}
                        onSectionChange={setActiveSection}
                        isDrawerOpen={isDrawerOpen}
                        closeDrawer={closeDrawer}
                    />
                )
            )}
        </SectionContainer>
    );
}

function DesktopAccount({ data, activeSection, onSectionChange }) {

    return (
        <article className="w-full grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-10">
            <>
                <Info user={data} activeSection={activeSection} onSectionChange={onSectionChange} />
            </>
            <div className="min-h-96">
                {activeSection === 'profile' && <Profile user={data} />}
                {activeSection === 'orders' && <MyOrder />}
                {activeSection === 'address' && <MyAddress />}
            </div>
        </article>
    );
}

function MobAccount({ data, activeSection, onSectionChange, isDrawerOpen, closeDrawer }) {
    const drawerRef = useRef(null);
    useClickOutside(drawerRef, closeDrawer);

    const handleSectionClick = (section) => {
        onSectionChange(section);
        closeDrawer();
    };

    return (
        <>
            <AnimatePresence>
                {isDrawerOpen && (
                    <section
                        aria-hidden={!isDrawerOpen}
                        className="w-full min-h-screen fixed top-0 right-0 z-50 bg-[rgba(0,0,0,0.5)] flex justify-end transition"
                        role="dialog"
                        aria-label="Account navigation"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: "0%", transition: { duration: .3, ease: "easeIn" } }}
                            exit={{ opacity: 0, x: "100%", transition: { duration: .2, ease: "easeOut" } }}
                            ref={drawerRef}
                            className="w-[60%] relative bg-white p-[10px_15px] shadow-lg"                        >
                            <div className="mb-10">
                                <button onClick={closeDrawer}>
                                    <IoCloseOutline className="w-7 h-7" />
                                </button>
                            </div>
                            <Info user={data} activeSection={activeSection} onSectionChange={handleSectionClick} isDrawerOpen={isDrawerOpen} />
                        </motion.div>
                    </section>
                )}
            </AnimatePresence>

            {!isDrawerOpen && (
                <div className="p-4">
                    {activeSection === 'profile' && <Profile user={data} />}
                    {activeSection === 'orders' && <MyOrder />}
                    {activeSection === 'address' && <MyAddress />}
                </div>
            )}
        </>
    );
}

function Info({ user, onSectionChange, activeSection, isDrawerOpen }) {
    const { user_metadata: { fullName } } = user;

    return (
        <article className="text-left rounded">
            <h2
                className={`text-base p-3 mb-1 ${activeSection === 'profile' ? 'bg-blue-100' : ''}`}
                role="button"
                tabIndex="0"
                onClick={() => onSectionChange('profile')}
            >
                {isDrawerOpen ? <span className="text-base font-medium cursor-pointer tracking-wider">Profile</span> : <>  Welcome, <span className="font-medium tracking-wide uppercase ml-1">{fullName}</span></>}
            </h2>
            <p
                className={`text-base font-medium p-3 mb-1 cursor-pointer ${activeSection === 'orders' ? 'bg-blue-100' : ''}`}
                role="button"
                tabIndex="0"
                onClick={() => onSectionChange('orders')}
            >
                My Orders
            </p>
            <p
                className={`text-base font-medium p-3 cursor-pointer ${activeSection === 'address' ? 'bg-blue-100' : ''}`}
                role="button"
                tabIndex="0"
                onClick={() => onSectionChange('address')}
            >
                My Address
            </p>
            <Logout />
        </article>
    );
}

function Profile({ user }) {
    const { user_metadata: { fullName: currentName, email }, new_phone: currentPhone } = user;
    const [fullName, setFullName] = useState(currentName || "");
    const [phone, setPhone] = useState(currentPhone || "");
    const [updateUser, { isLoading }] = useUpdateUserMutation();
    const dispatch = useDispatch();

    async function handleUserForm(e) {
        e.preventDefault();
        const formattedPhone = phone.startsWith('+88') ? phone : `+88${phone}`;

        try {
            const { data, error } = await supabase.auth.updateUser({ fullName, phone: formattedPhone });
            if (data) {
                dispatch(setUser(data?.user));
                toast.success("Profile updated successfully!");
            }
        } catch (error) {
            console.error("Update failed", error);
        }
    }

    return (
        <article className="font-medium">
            <div>
                <h1 className="text-base mb-3">Account Details</h1>
                <form onSubmit={handleUserForm} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-20">
                    <FormRow label={"Name"}>
                        <input type="text" id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="formInput focus:border-blue-700 p-2" required />
                    </FormRow>
                    {/* <FormRow label={"Mobile Number"} customStyle={"grid grid-cols-[100px_1fr] sm:grid-cols-[150px_1fr] items-center"}> */}
                    <FormRow label={"Mobile Number"}>
                        <input type="text" id="number" value={phone} onChange={(e) => setPhone(e.target.value)} className="focus:border-blue-700 p-2 formInput" required />
                    </FormRow>
                    <FormRow label={"Email Address"}>
                        {/* <FormRow label={"Email Address"} customStyle={"grid grid-cols-[100px_1fr] sm:grid-cols-[150px_1fr] items-center"}> */}
                        <input type="email" id="email" disabled value={email} className="text-gray-500 bg-gray-200 p-2 formInput" aria-disabled="true" />
                    </FormRow>
                    {/* <div className="flex justify-end"> */}
                    <div className="text-right">
                        <button className="w-40 text-white bg-blue-600 hover:bg-blue-900 rounded transition p-3" aria-busy={isLoading}>
                            {isLoading ? 'Updating...' : 'Update Profile'}
                        </button>
                    </div>
                </form>
            </div>
            <UpdatePasswordForm />
        </article>
    );
}

function MyOrder() {
    return (
        <article>
            <h2 className="text-base font-medium mb-3">Order history</h2>
            <div>
                <p>You haven't placed any orders yet</p>
                <button>Make your first order</button>
            </div>
        </article>
    );
}

function MyAddress() {
    return (
        <article>
            <h2 className="text-base font-medium mb-3">Your Address</h2>
            <form>
                <FormRow label={"District"} customStyle={"grid grid-cols-[150px_1fr] items-center mb-3"}>
                    <input type="text" id="district" className="formInput focus:border-blue-700 p-2" />
                </FormRow>
                <FormRow label={"Upazila"} customStyle={"grid grid-cols-[150px_1fr] items-center mb-3"}>
                    <input type="text" id="upazila" className="formInput focus:border-blue-700 p-2" />
                </FormRow>
                <FormRow label={"Union"} customStyle={"grid grid-cols-[150px_1fr] items-center"}>
                    <input type="text" id="union" className="formInput focus:border-blue-700 p-2" />
                </FormRow>
            </form>
            <div className="w-full text-center mt-5">
                <button className="w-40 text-white bg-blue-600 hover:bg-blue-900 rounded transition p-3 mt-5">Add new address</button>
            </div>
        </article>
    );
}
