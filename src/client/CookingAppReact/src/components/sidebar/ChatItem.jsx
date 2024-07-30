export default function ChatItem({ title }) {
  return (
    <h5 className="hover:bg-gray-300 rounded-lg px-5 py-1 hover:cursor-pointer">
      {title}
    </h5>
  );
}
