export default function UserMessage({ message }) {
  return (
    <li className="w-4/5 flex  justify-end ">
      <p className="bg-gray-100 rounded-2xl px-5 text-lg font-normal">
        {message.content}
      </p>
    </li>
  );
}
