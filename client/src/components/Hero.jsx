import { useNavigate } from "react-router-dom"
import { assets } from "../assets/assets"

const Hero = () => {

    const navigate = useNavigate()

    return (
        <div className="px-4 sm:px-20 xl:px-32 relative flex flex-col justify-center items-center min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-[#0b1120] to-slate-900">

            <div className="absolute -top-40 -left-32 w-96 h-96 rounded-full bg-violet-700/20 blur-[140px]"></div>

            <div className="absolute top-40 -right-32 w-[450px] h-[450px] rounded-full bg-blue-600/20 blur-[160px]"></div>

            <div className="text-center mb-8 z-10">

                <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold leading-tight text-white">
                    Create Amazing Content
                    <br />
                    <span className="bg-gradient-to-r from-violet-400 to-purple-600 bg-clip-text text-transparent">
                        With AI Tools
                    </span>
                </h1>

                <p className="mt-6 max-w-2xl mx-auto text-slate-400 text-base sm:text-lg">
                    Transform your ideas into powerful content. Generate articles, create AI images and boost your productivity with one modern platform.
                </p>

            </div>

            <div className="flex flex-wrap justify-center gap-5 z-10">

                <button
                    onClick={() => navigate('/ai')}
                    className="bg-gradient-to-r from-violet-600 to-purple-500 text-white px-10 py-3 rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(139,92,246,.45)] transition-all duration-300"
                >
                    Start Creating
                </button>

                <button
                    className="bg-slate-900 border border-slate-700 text-white px-10 py-3 rounded-full hover:border-violet-500 hover:bg-slate-800 transition-all duration-300"
                >
                    Watch Demo
                </button>

            </div>

            <div className="flex items-center gap-4 mt-12 text-slate-400 z-10">

                <img src={assets.user_group} alt="" className="h-9" />

                Trusted by 10k+ creators worldwide

            </div>

        </div>
    )
}

export default Hero