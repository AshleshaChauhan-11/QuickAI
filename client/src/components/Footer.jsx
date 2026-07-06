import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <>
            <style>
                {`
                    @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
                    *{
                        font-family: "Poppins", sans-serif;
                    }`
                }
            </style>

            <footer className="bg-black text-white py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-20">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-6 gap-8 md:gap-16">
                    
                    <div className="lg:col-span-3 space-y-6">
                        <Link to="/" className="block">
    <img
        src={assets.logo}
        alt="Quick.ai"
        className="w-40"
    />
</Link>
                        <p className="text-sm md:text-base">Join our newsletter for regular updates.</p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <input type="email" placeholder="example@email.com" className="bg-[#14171A] text-white/70 border border-white/10 px-3 py-3 rounded-md w-full sm:flex-1 sm:max-w-xs placeholder:text-sm placeholder:font-light focus:outline-none focus:ring-1 focus:ring-gray-600"/>
                            <button className="bg-[#14171A] text-white px-5 py-3 rounded-md border border-white/10 text-sm hover:bg-gray-800 transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 lg:gap-28 items-start">
                        {/* Products */}
                        <div>
                            <h3 className="font-medium text-sm mb-4 md:mb-6">Products</h3>
                            <ul className="space-y-3 md:space-y-4 text-sm text-white/70">
                                <li><a href="#" className="hover:text-white">Components</a></li>
                                <li><a href="#" className="hover:text-white">Templates</a></li>
                                <li><a href="#" className="hover:text-white">Icons</a></li>
                            </ul>
                        </div>

                        {/* Resources */}
                        <div>
                            <h3 className="font-medium text-sm mb-4 md:mb-6">Resources</h3>
                            <ul className="space-y-3 md:space-y-4 text-sm text-white/70">
                                <li><a href="#" className="hover:text-white">Quick.ai</a></li>
                                <li><a href="#" className="hover:text-white">Templates</a></li>
                                <li><a href="#" className="hover:text-white">Components</a></li>
                                <li><a href="#" className="hover:text-white">Blogs</a></li>
                                <li><a href="#" className="hover:text-white">Store</a></li>
                            </ul>
                        </div>

                        {/* Company */}
                        <div className="col-span-2 md:col-span-1">
                            <h3 className="font-medium text-sm mb-4 md:mb-6">Company</h3>
                            <ul className="space-y-3 md:space-y-4 text-sm text-white/70">
                                <li><a href="#" className="hover:text-white">About</a></li>
                                <li><a href="#" className="hover:text-white">Vision</a></li>
                                <li className="flex items-center gap-2">
                                    <a href="#" className="hover:text-white">Careers</a>
                                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-green-950 border border-green-300 text-green-300">HIRING</span>
                                </li>
                                <li><a href="#" className="hover:text-white">Privacy policy</a></li>
                                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-12 md:mt-16 pt-6 border-t border-neutral-700 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-white/70 text-xs sm:text-sm order-2 md:order-1">© 2026 Quick.ai</p>
                    <div className="flex gap-5 md:gap-6 order-1 md:order-2">
                        {/* X (Twitter) */}
                        <a href="https://x.com/ftrudra7" className="text-white hover:text-gray-300">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                            </svg>
                        </a>
                        {/* Github */}
                        <a href="https://github.com/ftrudra7" className="text-white hover:text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>
                            </svg>
                        </a>
                        {/* Linkedin */}
                        <a href="https://www.linkedin.com/in/rudra-jha-b55b372a7?utm_source=share_via&utm_content=profile&utm_medium=member_android" className="text-white hover:text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
                            </svg>
                        </a>
                        {/* Youtube 
                        <a href="#" className="text-white hover:text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>
                            </svg>
                        </a>
                            */}
                        {/* Instagram */}
                        <a href="https://www.instagram.com/nofilterrudra?igsh=c3B2d3B0ZW40bnFm" className="text-white hover:text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                        </a>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
