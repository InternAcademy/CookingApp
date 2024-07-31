export default function ChatItem({ title }) {
  return (
    <h5 className="hover:bg-gray-300 rounded-lg m-3 px-5 py-2 hover:cursor-pointer">
      {title}
    </h5>
  );
}
