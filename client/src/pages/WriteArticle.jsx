import { Edit, Sparkles } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/react";
import ReactMarkdown from "react-markdown";

const WriteArticle = () => {
  const { getToken } = useAuth();

  const articleLength = [
    { length: 800, text: "Short (500-800 words)" },
    { length: 1200, text: "Medium (800-1200 words)" },
    { length: 1600, text: "Long (1200+ words)" },
  ];

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = await getToken();

      const { data } = await axios.post(
        "http://localhost:3000/api/ai/generate-article",
        {
          prompt: input,
          length: selectedLength.length,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setArticle(data.content);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      {/* LEFT PANEL */}
      <form
        onSubmit={onSubmitHandler}
        className="flex-1 bg-[#111827] border border-slate-700 rounded-2xl p-6"
      >
        <div className="flex items-center gap-3 mb-8">
          <Sparkles className="w-6 h-6 text-[#4A7AFF]" />
          <h1 className="text-2xl font-bold text-white">
            Article Configuration
          </h1>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-slate-300 mb-2">
            Article Topic
          </label>

          <input
            type="text"
            required
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="The future of Artificial Intelligence..."
            className="w-full bg-[#0B1120] border border-slate-700 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-300 mb-3">
            Article Length
          </label>

          <div className="flex flex-wrap gap-3">
            {articleLength.map((item, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedLength(item)}
                className={`px-4 py-2 rounded-full border transition ${
                  selectedLength.text === item.text
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "border-slate-600 text-slate-300 hover:border-blue-500"
                }`}
              >
                {item.text}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-10 flex items-center justify-center gap-3 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] py-3 rounded-xl text-white font-medium hover:opacity-90 transition disabled:opacity-60"
        >
          <Edit className="w-5 h-5" />
          {loading ? "Generating..." : "Generate Article"}
        </button>
      </form>

      {/* RIGHT PANEL */}
      <div className="flex-1 bg-[#111827] border border-slate-700 rounded-2xl p-6 min-h-[550px]">
        <div className="flex items-center gap-3 mb-6">
          <Edit className="w-6 h-6 text-[#4A7AFF]" />
          <h1 className="text-2xl font-bold text-white">
            Generated Article
          </h1>
        </div>

        {article ? (
          <ReactMarkdown
            className="prose prose-invert max-w-none text-slate-300"
          >
            {article}
          </ReactMarkdown>
        ) : (
          <div className="flex justify-center items-center h-[420px] text-slate-400">
            Enter a topic and generate an article.
          </div>
        )}
      </div>
    </div>
  );
};

export default WriteArticle;