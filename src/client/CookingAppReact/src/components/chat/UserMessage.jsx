export default function UserMessage({ message }) {
  return (
    <li className="w-4/5 flex  justify-end ">
      {message.type === "Text" && (
        <p className="bg-gray-100 rounded-2xl px-5 text-lg font-normal">
          {message.content}
        </p>
      )}
      {message.type === "Image" && (
        <img src={message.content} alt="" width={200} className="rounded-2xl" />
      )}
    </li>
  );
}
