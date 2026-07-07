import { Scissors, Sparkles } from "lucide-react"
import { useState } from "react"

const RemoveObject = () => {

  const [setInput] = useState(null)
  const [object, setObject] = useState("")

  const onSubmitHandler = async (e) => {
    e.preventDefault()
  }

  return (

    <div className="p-8">

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Left Column */}

        <form
          onSubmit={onSubmitHandler}
          className="bg-[#111827] border border-slate-700 rounded-2xl p-8"
        >

          <div className="flex items-center gap-3 mb-8">

            <Sparkles className="w-6 h-6 text-[#4A7AFF]" />

            <h1 className="text-3xl font-bold text-white">
              Object Removal
            </h1>

          </div>

          <div>

            <p className="text-sm text-slate-300 mb-2">
              Upload Image
            </p>

            <input
              type="file"
              accept="image/*"
              onChange={(e)=>setInput(e.target.files[0])}
              className="w-full rounded-xl bg-[#0B1120] border border-slate-700 px-4 py-3 text-slate-300 file:bg-[#4A7AFF] file:text-white file:border-0 file:px-4 file:py-2 file:rounded-lg file:cursor-pointer"
              required
            />

          </div>

          <div className="mt-6">

            <p className="text-sm text-slate-300 mb-2">
              Describe Object to Remove
            </p>

            <textarea
              rows={5}
              value={object}
              onChange={(e)=>setObject(e.target.value)}
              placeholder="Describe what you want to remove from the image..."
              className="w-full rounded-xl bg-[#0B1120] border border-slate-700 px-4 py-3 text-white outline-none resize-none focus:border-[#4A7AFF]"
              required
            />

          </div>

          <button
            type="submit"
            className="w-full mt-8 rounded-xl bg-gradient-to-r from-[#417DF6] to-[#8E37EB] py-3 flex items-center justify-center gap-2 text-white font-medium hover:opacity-90 transition"
          >

            <Scissors className="w-5 h-5" />

            Remove Object

          </button>

        </form>

        {/* Right Column */}

        <div className="bg-[#111827] border border-slate-700 rounded-2xl p-8 flex flex-col min-h-[650px]">

          <div className="flex items-center gap-3">

            <Scissors className="w-6 h-6 text-[#4A7AFF]" />

            <h1 className="text-2xl font-bold text-white">
              Processed Image
            </h1>

          </div>

          <div className="flex-1 flex items-center justify-center">

            <div className="text-center text-slate-400">

              <Scissors className="mx-auto w-16 h-16 mb-5" />

              <p>
                Upload an image and click
                <br />
                "Remove Object" to get started
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  )

}

export default RemoveObject