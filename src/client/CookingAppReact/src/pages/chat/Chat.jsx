import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import logo from "/public/icon2.png";
import ChatInput from "../../components/chatInput/ChatInput";
import { useDispatch, useSelector } from "react-redux";

export default function Chat() {
  const isOpenRecipes = useSelector(state => state.ui.recipesOpen);
  const isOpenSideBar = useSelector(state => state.ui.sidebarOpen);

  return (
      <section className="flex w-screen flex-col overflow-hidden shrink rounded-none md:rounded-2xl bg-white border-none md:border m-0 md:m-1 h-screen md:h-[calc(100vh-1vh)]">
          <Navbar />
      <section className="flex flex-col content-between overflow-hidden flex-grow pt-5">
        {/* <img src={logo} alt="" /> */}
        <section className="w-full overflow-y-auto grow flex justify-center">
          <ul 
          className={`flex flex-col gap-14 pb-10  justify-start  items-center
            ${isOpenRecipes || isOpenSideBar ? "w-5/5 md:w-5/5 xl:w-4/5" : "w-5/5 md:w-4/5 xl:w-3/5"} `}
          >
            <li className="w-4/5 flex  justify-end ">
              <p className="bg-gray-100 rounded-2xl px-5 text-lg font-normal">
                Hi there
              </p>
            </li>
            <li className="w-4/5">
              <div className="flex  justify-start items-start gap-6">
                <img
                  src={logo}
                  alt=""
                  width={35}
                  className="bg-gray-200 rounded-2xl p-1"
                />
                <p>
                  Hey there! How can I help you today? Hey there! How can I help
                  you today? Hey there! How can I help you today? Hey there! How
                  can I help you today? Hey there! How can I help you today? Hey
                  there! How can I help you today?
                </p>
              </div>
            </li>
            <li className="w-4/5 flex  justify-end ">
              <p className="bg-gray-100 rounded-2xl px-5 text-lg font-normal">
                Hi there
              </p>
            </li>
            <li className="w-4/5">
              <div className="flex  justify-start items-start gap-6">
                <img
                  src={logo}
                  alt=""
                  width={35}
                  className="bg-gray-200 rounded-2xl p-1"
                />
                <p>
                  Hey there! How can I help you today? Hey there! How can I help
                  you today? Hey there! How can I help you today? Hey there! How
                  can I help you today? Hey there! How can I help you today? Hey
                  there! How can I help you today?
                </p>
              </div>
            </li>
            <li className="w-4/5 flex  justify-end ">
              <p className="bg-gray-100 rounded-2xl px-5 text-lg font-normal">
                Hi there
              </p>
            </li>
            <li className="w-4/5">
              <div className="flex  justify-start items-start gap-6">
                <img
                  src={logo}
                  alt=""
                  width={35}
                  className="bg-gray-200 rounded-2xl p-1"
                />
                <p>
                  Hey there! How can I help you today? Hey there! How can I help
                  you today? Hey there! How can I help you today? Hey there! How
                  can I help you today? Hey there! How can I help you today? Hey
                  there! How can I help you today?
                </p>
              </div>
            </li>
            <li className="w-4/5 flex  justify-end ">
              <p className="bg-gray-100 rounded-2xl px-5 text-lg font-normal">
                Hi there
              </p>
            </li>
            <li className="w-4/5">
              <div className="flex  justify-start items-start gap-6">
                <img
                  src={logo}
                  alt=""
                  width={35}
                  className="bg-gray-200 rounded-2xl p-1"
                />
                <p>
                  Hey there! How can I help you today? Hey there! How can I help
                  you today? Hey there! How can I help you today? Hey there! How
                  can I help you today? Hey there! How can I help you today? Hey
                  there! How can I help you today?
                </p>
              </div>
            </li>
            <li className="w-4/5 flex  justify-end ">
              <p className="bg-gray-100 rounded-2xl px-5 text-lg font-normal">
                Hi there
              </p>
            </li>
            <li className="w-4/5">
              <div className="flex  justify-start items-start gap-6">
                <img
                  src={logo}
                  alt=""
                  width={35}
                  className="bg-gray-200 rounded-2xl p-1"
                />
                <p>
                  Hey there! How can I help you today? Hey there! How can I help
                  you today? Hey there! How can I help you today? Hey there! How
                  can I help you today? Hey there! How can I help you today? Hey
                  there! How can I help you today?
                </p>
              </div>
            </li>
          </ul>
        </section>
        <ChatInput />
      </section>
    </section>
  );
}
