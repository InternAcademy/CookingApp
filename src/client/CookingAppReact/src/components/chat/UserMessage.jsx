export default function UserMessage({ message }) {
  return (
    <li className="w-4/5 flex justify-end">
      {message.type === "Text" && (
        <p className="bg-active text-primaryText rounded-full px-6 py-3 text-lg font-normal">
          {message.content}
        </p>
      )}
      {message.type === "Image" && (
        <img src={message.content} alt="" width={200} className="rounded-2xl" />
      )}
    </li>
  );
}
