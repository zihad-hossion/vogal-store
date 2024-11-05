import { cloneElement, createContext, useContext, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import useClickOutside from "../hooks/useClickOutside";
import { AnimatePresence, motion } from "framer-motion";

export const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  const modalRef = useRef(null);
  useClickOutside(modalRef, close);
  if (name !== openName) return null;

  return createPortal(
    <section
      className="fixed top-0 left-0 w-full h-screen bg-[rgba(10,10,10,0.5)] z-40 transition-all">
      <motion.div
        initial={{ opacity: 0, scale: .9, left: "50%", top: "50%", translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: 1, scale: 1, transition: { duration: .2, ease: "easeInOut" } }}
        className=" w-[90%] lg:w-auto bg-white absolute p-5 shadow-[0_2.4rem_3.2rem_rgba(0, 0, 0, 0.12)]" ref={modalRef}>
        <button onClick={close} className="w-full text-right mb-3">
          <HiXMark style={{ width: "25px", height: "25px" }} />
        </button>
        <>{cloneElement(children, { onCloseModal: close })}</>
      </motion.div>
    </section>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
