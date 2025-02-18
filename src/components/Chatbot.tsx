import { useState } from "react";
import axios from "axios";

const Chatbot: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const result = await axios.post("http://localhost:5000/chat", {
        text,
      });
      console.log("result:", result);
      setResponse(result.data.response);
      setLoading(false);
    } catch (error) {
      console.error("API request failed:", error);
      setResponse("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      const result = await axios.get("http://localhost:5000/test");
      setMessage(result.data.message);
      setLoading(false);
    } catch (error) {
      console.error("API request failed:", error);
      setMessage("Test request failed.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          🤖 Chat with AI
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={text}
            onChange={event => setText(event.target.value)}
            placeholder="Type your message..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={4}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            disabled={loading}
          >
            {loading ? "Loading..." : "Send"}
          </button>
        </form>

        {/* Chatbot response */}
        {response && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700">{response}</p>
          </div>
        )}

        {/* Test button */}
        <button
          onClick={handleClick}
          className="w-full mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
          disabled={loading}
        >
          {loading ? "Loading..." : "Test"}
        </button>

        {message && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700">Test: {message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
