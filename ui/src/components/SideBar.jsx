import { useState, useEffect, useContext } from "react";
import {
	MdClose,
	MdMenu,
	MdOutlineCoffee,
	MdOutlineVpnKey,
	MdDelete,
} from "react-icons/md";
import { AiOutlineGithub } from "react-icons/ai";
import { ChatContext } from "../context/chatContext";
import bot from "../assets/logo.svg";
import ToggleTheme from "./ToggleTheme";
import Modal from "./Modal";
import Setting from "./Setting";

/**
 * A sidebar component that displays a list of nav items and a toggle
 * for switching between light and dark modes.
 *
 * @param {Object} props - The properties for the component.
 */

const SideBar = () => {
    const [open, setOpen] = useState(true);
    const [chats, setChats] = useState([{ name: '3/13/2024 Chat', messages: [] }]);
    const [activeChatIndex, setActiveChatIndex] = useState(0);
    const [, , clearChat, newChat] = useContext(ChatContext);

    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        handleResize();
    }, []);

    function handleResize() {
        window.innerWidth <= 720 ? setOpen(false) : setOpen(true);
    }

    function clear() {
        clearChat();
    }

    function startNewChat() {
        const newChatName = `${new Date().toLocaleDateString()} Chat`;
        const newChat = { name: newChatName, messages: [] };

        setChats((prevChats) => [...prevChats, newChat]);
        setActiveChatIndex(chats.length); // Set the active chat to the newly created one
        newChat(); // Initiate the new chat

        setModalOpen(false); // Close the modal if open
    }

    function switchChat(index) {
        setActiveChatIndex(index);
        clearChat(); // Clear current chat to load messages from the selected chat
    }

    return (
        <section
            className={`${
                open ? "w-72" : "w-16"
            } bg-neutral flex flex-col items-center gap-y-4 h-screen pt-4 relative duration-100 shadow-md`}
        >
            <div className="flex items-center justify-between w-full px-2 mx-auto">
                <div
                    className={` ${
                        !open && "scale-0 hidden"
                    } flex flex-row items-center gap-2 mx-auto w-full`}
                >
                    <img src={bot} alt="logo" className="w-6 h-6" />
                    <h1 className={` ${!open && "scale-0 hidden"}`}>Code Assistant</h1>
                </div>
                <div
                    className="mx-auto btn btn-square btn-ghost"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <MdClose size={15} /> : <MdMenu size={15} />}
                </div>
            </div>

            <ul className="w-full menu rounded-box">
                <li>
                    <a className="border border-slate-500" onClick={clear}>
                        <MdDelete size={15} />
                        <p className={`${!open && "hidden"}`}>Clear chat</p>
                    </a>
                </li>
            </ul>
            <ul className="w-full menu rounded-box">
                <li>
                    <a className="border border-slate-500" onClick={startNewChat}>
                        {/* <MdDelete size={15} /> */}
                        <p className={`${!open && "hidden"}`}>New Chat</p>
                    </a>
                </li>
            </ul>
            {/* Conditionally render chat based on activeChatIndex */}
            {chats.map((chat, index) => (
                <ul key={index} className={`w-full menu rounded-box ${index === activeChatIndex ? '' : 'hidden'}`}>
                    <li>
                        <a className="border border-slate-500" onClick={() => switchChat(index)}>
                            {/* Add an icon or indicator to show the active chat */}
                            <p className={`${!open && "hidden"} ${index === activeChatIndex && "font-bold"}`}>{chat.name}</p>
                        </a>
                    </li>
                </ul>
            ))}
            <ul className="absolute bottom-0 w-full gap-1 menu rounded-box">
                <li>
                    <ToggleTheme open={open} />
                </li>
                <li>
                    <a onClick={() => setModalOpen(true)}>
                        <MdOutlineVpnKey size={15} />
                        <p className={`${!open && "hidden"}`}>OpenAI Key</p>
                    </a>
                </li>
            </ul>
            <Modal title="Setting" modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <Setting modalOpen={modalOpen} setModalOpen={setModalOpen} />
            </Modal>
        </section>
    );
};




export default SideBar;
