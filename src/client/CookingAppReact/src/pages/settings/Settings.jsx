import Preferences from "@/components/settings/Preferences";
import { UserIcon } from "@heroicons/react/24/outline";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { getLoggedInUser } from "@/msal/userHelper";
import { getToken } from "@/msal/msal";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import usePfp from "@/hooks/usePfp";

export default function Settings() {
  const isOpenRecipes = useSelector((state) => state.ui.recipesOpen);
  const isOpenSideBar = useSelector((state) => state.ui.sidebarOpen);
  const personal = useSelector((state) => state.user.personal);
  const pfp = useSelector((state) => state.user.profilePicture);

  const fileAttacher = useRef();

  const { mutate } = usePfp();

  const handleCopy = async () => {
    const token = await getToken();
    const decoded = jwtDecode(token);
    await navigator.clipboard.writeText(decoded.sub);
    toast.success("Success! Your ID has been copied to the clipboard.");
  };

  function handleImageAttachment(event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const token = await getToken();
        console.log(reader.result);
        mutate({ token: token, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }
  function uploadImage() {
    fileAttacher.current.click();
  }
  return (
    <div
      className={`flex flex-col w-full py-10 overflow-y-auto
        ${
          isOpenRecipes && isOpenSideBar
            ? "px-10"
            : !isOpenRecipes && !isOpenSideBar
            ? "px-5 sm:px-10 md:px-20 lg:px-40 xl:px-60 2xl:px-80"
            : "px-5 sm:px-10 md:px-10 lg:px-20 xl:px-40 2xl:px-60"
        }`}
    >
      <h1 className="font-semibold text-lg mb-4">Profile</h1>
      <div className="flex flex-row justify-between rounded-2xl border py-5 px-5 items-center shadow-sm bg-gray-50">
        <div className="flex flex-row items-center rounded-full gap-2">
          {pfp !== null ? (
            <img src={pfp} className="rounded-full object-cover w-14 h-14" />
          ) : (
            <UserIcon className="size-10 mr-1" />
          )}
          <div>
            <h1 className="font-semibold text-lg text-gray-800">
              {personal.name}
            </h1>
            <h2 className="text-gray-500 font-semibold text-sm flex flex-row items-center text-center">
              <button
                onClick={handleCopy}
                className="flex flex-row items-center text-center"
              >
                Copy User Id <ClipboardDocumentIcon className="ml-1 size-5" />
              </button>
            </h2>
          </div>
        </div>
        <div className="">
          <input
            type="file"
            hidden
            accept="image/*"
            ref={fileAttacher}
            onChange={(event) => handleImageAttachment(event)}
          />
          <button
            className="bg-gray-200 font-semibold border rounded-full py-2 px-5"
            onClick={uploadImage}
          >
            Upload
          </button>
        </div>
      </div>
      <Preferences />
    </div>
  );
}
