import { SignInButton } from "../../auth/SignInButton";
export default function Footer() {
  return (
  <footer className="relative bg-gray-800 text-white py-12 z-20">
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* Contact Form */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Contact Us</h3>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 border border-gray-700 rounded bg-gray-900 text-white"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-700 rounded bg-gray-900 text-white"
          />
          <textarea
            placeholder="Message"
            className="w-full px-4 py-2 border border-gray-700 rounded bg-gray-900 text-white"
            rows="4"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#fb923c] text-white rounded hover:bg-[#fb923c]/80"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Links */}
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
        <a to="/" className="text-gray-400 hover:text-white">Home</a>
        <a to="/terms" className="text-gray-400 hover:text-white">Terms & Conditions</a>
        <a to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">Facebook</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">Twitter</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">Instagram</a>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} MealMaster. All rights reserved.</p>
      </div>
    </div>
  </footer>
  );
}
