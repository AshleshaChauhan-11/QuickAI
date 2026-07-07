import { Hash, Sparkles } from "lucide-react"
import { useState } from "react"

const BlogTitles = () => {

  const blogCAtegories = [
    "General",
    "Technology",
    "Business",
    "Health",
    "Lifestyle",
    "Education",
    "Travel",
    "Food"
  ]

  const [selectedCategory, setSelectedCategory] = useState("General")
  const [input, setInput] = useState("")

  const onSubmitHandler = async (e) => {
    e.preventDefault()
  }

  return (

    <div className="flex flex-col lg:flex-row gap-6 p-6">

      {/* Left Column */}

      <form
        onSubmit={onSubmitHandler}
        className="flex-1 bg-[#111827] border border-slate-700 rounded-2xl p-6"
      >

        <div className="flex items-center gap-3 mb-8">

          <Sparkles className="w-6 h-6 text-[#8E37EB]" />

          <h1 className="text-2xl font-bold text-white">
            AI Title Generator
          </h1>

        </div>

        <div className="mb-6">

          <p className="text-sm text-slate-300 mb-2">
            Keyword
          </p>

          <input
            type="text"
            required
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="The future of artificial intelligence is..."
            className="w-full bg-[#0B1120] border border-slate-700 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-[#8E37EB]"
          />

        </div>

        <div>

          <p className="text-sm text-slate-300 mb-3">
            Category
          </p>

          <div className="flex flex-wrap gap-3">

            {
              blogCAtegories.map((item) => (

                <button
                  key={item}
                  type="button"
                  onClick={() => setSelectedCategory(item)}
                  className={`px-4 py-2 rounded-full border text-sm transition ${
                    selectedCategory === item
                      ? "bg-[#8E37EB] border-[#8E37EB] text-white"
                      : "border-slate-600 text-slate-400 hover:border-[#8E37EB] hover:text-white"
                  }`}
                >
                  {item}
                </button>

              ))
            }

          </div>

        </div>

        <button
          type="submit"
          className="w-full mt-10 flex justify-center items-center gap-2 bg-gradient-to-r from-[#C341F6] to-[#8E37EB] text-white py-3 rounded-xl font-medium cursor-pointer"
        >

          <Hash className="w-5 h-5" />

          Generate Title

        </button>

      </form>

      {/* Right Column */}

      <div className="flex-1 bg-[#111827] border border-slate-700 rounded-2xl p-6 min-h-[550px] flex flex-col">

        <div className="flex items-center gap-3 mb-6">

          <Hash className="w-6 h-6 text-[#8E37EB]" />

          <h1 className="text-2xl font-bold text-white">
            Generated Titles
          </h1>

        </div>

        <div className="flex-1 flex justify-center items-center">

          <div className="flex flex-col items-center gap-5 text-slate-400">

            <Hash className="w-10 h-10" />

            <p className="text-center">
              Enter a topic and click
              <br />
              <span className="text-[#C341F6]">
                Generate Title
              </span>{" "}
              to get started
            </p>

          </div>

        </div>

      </div>

    </div>

  )
}

export default BlogTitles