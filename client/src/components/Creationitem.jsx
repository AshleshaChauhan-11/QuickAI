import { useState } from "react"
import Markdown from "react-markdown"

const CreationItem = ({ item }) => {

    const [expanded, setExpanded] = useState(false)

    return (

        <div
            onClick={() => setExpanded(!expanded)}
            className="p-5 border-b border-slate-700 hover:bg-slate-800/50 transition cursor-pointer"
        >

            <div className="flex justify-between items-center gap-4">

                <div>

                    <h2 className="text-white font-medium">
                        {item.prompt}
                    </h2>

                    <p className="text-sm text-slate-400">

                        {item.type} •{" "}

                        {item.createdAt
                            ? new Date(item.createdAt).toLocaleDateString()
                            : "Today"}

                    </p>

                </div>

                <button
                    className="bg-slate-800 border border-slate-600 text-slate-300 px-4 py-1 rounded-full capitalize text-xs"
                >
                    {item.type}
                </button>

            </div>

            {expanded && (

                <div className="mt-4">

                    {item.type === "image" ? (

                        <img
                            src={item.content}
                            alt="Generated"
                            className="rounded-lg max-w-md border border-slate-700"
                        />

                    ) : (

                        <div className="bg-[#0B1120] border border-slate-700 rounded-lg p-4">

                            <p className="text-slate-300 whitespace-pre-wrap leading-7">
                                
                                <div className="reset-tw">
                                    <Markdown>{item.content}</Markdown>
                                </div>
                                

                            </p>

                        </div>

                    )}

                </div>

            )}

        </div>

    )

}

export default CreationItem