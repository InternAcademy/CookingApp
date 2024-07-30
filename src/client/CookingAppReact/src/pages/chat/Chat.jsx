import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import logo from "/public/icon2.png";
import ChatInput from "../../components/chatInput/ChatInput";
export default function Chat() {
  return (
    <section className="flex w-screen flex-col overflow-hidden h-screen shrink">
      <Navbar />
      <section className="flex flex-col content-between overflow-hidden flex-grow pt-5 shad  box-border">
        {/* <img src={logo} alt="" /> */}
        <section className="w-full overflow-y-auto mb-20 grow flex justify-center">
          <ul className=" flex flex-col w-2/4 gap-14 pb-10  justify-start  items-center">
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
