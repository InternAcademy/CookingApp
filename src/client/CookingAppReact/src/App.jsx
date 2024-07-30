import "./index.css";
function App() {
  return (
    <>
      <h1 className="text-customOrange">Cooking App Web</h1>
      <p>
        Your ip from the .env file: {import.meta.env.VITE_PUBLIC_PERSONAL_IP}
      </p>
    </>
  );
}

export default App;
