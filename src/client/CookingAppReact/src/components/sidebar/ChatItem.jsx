import { TrashIcon } from "@heroicons/react/24/outline";

export default function ChatItem({ title }) {
  return (
    <div className="rounded-lg h-10 my-5 hover:bg-gray-300 hover:cursor-pointer flex flex-row justify-between items-center text-center group">
      <h5 className="px-5 py-2 whitespace-nowrap hover:text-ellipsis overflow-hidden">
        {title} 
      </h5>
      <TrashIcon className="ml-1 mr-5 size-6 text-gray-600 hidden group-hover:inline-block"/>
    </div>
  );
}
