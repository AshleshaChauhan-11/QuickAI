import { useUser } from "@clerk/react"
import { AiToolsData } from "../assets/assets"
import { useNavigate } from "react-router-dom"

const AiTools = () => {

    const navigate = useNavigate()
    const { user } = useUser()

    return (
        <div className="px-4 sm:px-20 xl:px-32 py-28 bg-[#0b1120]">

            <div className="text-center">

                <h2 className="text-white text-4xl sm:text-5xl font-bold">
                    Explore Our AI Toolkit
                </h2>

                <p className="text-slate-400 max-w-2xl mx-auto mt-5">
                    Powerful AI tools designed to help you create faster, work smarter and unlock your creativity.
                </p>

            </div>

            <div className="flex flex-wrap justify-center gap-8 mt-16">

                {AiToolsData.map((tool, index) => (

                    <div
                        key={index}
                        onClick={() => user && navigate(tool.path)}
                        className="group w-80 rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-8 cursor-pointer hover:-translate-y-3 hover:border-violet-500 transition-all duration-300 hover:shadow-[0_0_35px_rgba(139,92,246,.18)]"
                    >

                        <tool.Icon
                            className="w-14 h-14 p-3 rounded-2xl text-white"
                            style={{
                                background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`,
                            }}
                        />

                        <h3 className="text-white text-2xl font-semibold mt-7">
                            {tool.title}
                        </h3>

                        <p className="text-slate-400 mt-4 leading-7">
                            {tool.description}
                        </p>

                        <button className="mt-8 text-violet-400 font-medium group-hover:text-violet-300 transition-all">
                            Explore →
                        </button>

                    </div>

                ))}

            </div>

        </div>
    )
}

export default AiTools