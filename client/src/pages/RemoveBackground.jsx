import { Eraser, Sparkles } from "lucide-react"
import { useState } from "react"

const RemoveBackground = () => {

  const [setInput] = useState(null)

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

            <Sparkles className="w-6 h-6 text-[#FF4938]" />

            <h1 className="text-3xl font-bold text-white">
              Background Removal
            </h1>

          </div>

          <div>

            <p className="text-sm text-slate-300 mb-2">
              Upload Image
            </p>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setInput(e.target.files[0])}
              className="w-full rounded-xl bg-[#0B1120] border border-slate-700 px-4 py-3 text-slate-300 file:bg-[#FF4938] file:text-white file:border-0 file:px-4 file:py-2 file:rounded-lg file:cursor-pointer"
              required
            />

            <p className="text-xs text-slate-500 mt-3">
              Supports JPG, PNG and other image formats.
            </p>

          </div>

          <button
            type="submit"
            className="w-full mt-8 rounded-xl bg-gradient-to-r from-[#F6AB41] to-[#FF4938] py-3 flex items-center justify-center gap-2 text-white font-medium hover:opacity-90 transition"
          >

            <Eraser className="w-5 h-5" />

            Remove Background

          </button>

        </form>

        {/* Right Column */}

        <div className="bg-[#111827] border border-slate-700 rounded-2xl p-8 flex flex-col min-h-[650px]">

          <div className="flex items-center gap-3">

            <Eraser className="w-6 h-6 text-[#FF4938]" />

            <h1 className="text-2xl font-bold text-white">
              Processed Image
            </h1>

          </div>

          <div className="flex-1 flex items-center justify-center">

            <div className="text-center text-slate-400">

              <Eraser className="mx-auto w-16 h-16 mb-5" />

              <p>
                Upload an image and click
                <br />
                "Remove Background" to get started
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  )

}

export default RemoveBackground