import { createSignal } from "solid-js";
import { useAuth } from "../backend/AuthProvider.jsx";
import html from "../assets/Ikone/Frontend/html.png";
import css from "../assets/Ikone/Frontend/css-3.png";
import js from "../assets/Ikone/Frontend/js.png";
import nodejs from "../assets/Ikone/Backend/470-4704009_nodejs-rust-logo-node-js.png";
import java from "../assets/Ikone/Mobile/icons8-java-48.png";



export default function PortfolioForm() {
    const session = useAuth();
    const [success, setSuccess] = createSignal(false);

    async function formSumbit(event) {
        
    }

    return (
        <>
            <form onSubmit={formSumbit()}>
                <div class="w-full bg-gray-900 rounded-2xl p-7 mt-8 mb-5 shadow-xl">
                    <div class="mx-auto p-5 bg-gray-800 rounded-lg shadow-lg text-3xl text-center text-indigo-400 uppercase font-semibold tracking-wider">
                        Portfolio
                    </div>

                    <div class="mt-4 p-4 flex flex-col gap-4 bg-gray-800 rounded-lg shadow-md">
                        {/* Vlasnik portfolia */}
                        <div class="flex flex-col gap-2">
                            <label class="text-xl font-semibold text-gray-300">
                                Vlasnik portfolia:
                            </label>
                            <input
                                type="text"
                                name="author"
                                required
                                placeholder="Unesite ime i prezime"
                                class="bg-gray-700 text-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* O meni */}
                        <div class="flex flex-col gap-2">
                            <label class="text-xl font-semibold text-gray-300">O meni</label>
                            <textarea
                                class="w-full h-40 resize-none bg-gray-700 text-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                maxLength={2000}
                                name="about"
                                required
                                placeholder="Napišite nešto o sebi"
                            />
                        </div>

                        {/* Obrazovanje */}
                        <div class="flex flex-col gap-2">
                            <label class="text-xl font-semibold text-gray-300" for="education">Obrazovanje</label>
                            <select name="education" id="education" required class="bg-gray-700 text-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <option class="bg-white text-black" value="">
                                    Odaberite obrazovni program
                                </option>
                                <option class="bg-white text-black" value="srednja">
                                    Srednja škola - Računarstvo
                                </option>
                                <option class="bg-white text-black" value="vss">
                                    Sveučilišni prvostupnik/prvostupnica informatike
                                </option>
                            </select>
                        </div>

                        {/* Certifikati */}
                        <div class="flex flex-col gap-2">
                            <label class="text-xl font-semibold text-gray-300">
                                Certifikati
                            </label>
                            <input
                                type="text"
                                name="certificate"
                                required
                                placeholder="Unesite naziv certifikata"
                                class="bg-gray-700 text-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* */}
                        <div class="flex flex-col gap-6 items-start">
                            <label class="text-xl font-semibold text-gray-300">Tehnologije</label>

                            {/* Frontend */}
                            <div class="flex flex-col items-start gap-4">
                                <h2 class="text-xl font-semibold">Frontend</h2>
                                <div class="flex gap-6">
                                    {/* HTML */}
                                    <div class="flex flex-col items-center gap-2">
                                        <h1 class="text-lg">HTML</h1>
                                        <img class="w-15" src={html} alt="HTML" />
                                        <input type="checkbox" defaultChecked className="checkbox checkbox-primary" />
                                    </div>
                                    {/* CSS */}
                                    <div class="flex flex-col items-center gap-2">
                                        <h1 class="text-lg">CSS</h1>
                                        <img class="w-15" src={css} alt="CSS" />
                                        <input type="checkbox" defaultChecked className="checkbox checkbox-primary" />
                                    </div>
                                    {/* JavaScript */}
                                    <div class="flex flex-col items-center gap-2">
                                        <h1 class="text-lg">JavaScript</h1>
                                        <img class="w-15" src={js} alt="JavaScript" />
                                        <input type="checkbox" defaultChecked className="checkbox checkbox-primary" />
                                    </div>
                                </div>
                            </div>

                            {/* Backend */}
                            <div class="flex flex-col items-start gap-4">
                                <h2 class="text-xl font-semibold">Backend</h2>
                                <div class="flex gap-6">
                                    {/* Node.js */}
                                    <div class="flex flex-col items-center gap-2">
                                        <h1 class="text-lg">Node.js</h1>
                                        <img class="w-15" src={nodejs} alt="Node.js" />
                                        <input type="checkbox" defaultChecked className="checkbox checkbox-primary" />
                                    </div>
                                </div>
                            </div>

                            {/* Ostali jezici */}
                            <div class="flex flex-col items-start gap-4">
                                <h2 class="text-xl font-semibold">Ostali jezici</h2>
                                <div class="flex gap-6">
                                    {/* Java */}
                                    <div class="flex flex-col items-center gap-2">
                                        <h1 class="text-lg">Java</h1>
                                        <img class="w-15" src={java} alt="Java" />
                                        <input type="checkbox" defaultChecked className="checkbox checkbox-primary" />
                                    </div>
                                </div>
                            </div>
                        </div>



                        {/* Iskustvo */}
                        <div class="flex flex-col gap-2">
                            <label class="text-xl font-semibold text-gray-300">
                                Iskustvo
                            </label>
                            <input
                                type="text"
                                name="experience"
                                required
                                placeholder="Unesite iskustvo"
                                class="bg-gray-700 text-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Projekti */}
                        <div class="flex flex-col gap-2">
                            <label class="text-xl font-semibold text-gray-300">
                                Projekti
                            </label>
                            <input
                                type="text"
                                name="projects"
                                placeholder="Navedite projekte"
                                required
                                placeholder=" Navedite projekte"
                                class="bg-gray-700 text-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Kontakt */}
                        <div class="flex flex-col gap-2">
                            <label class="text-xl font-semibold text-gray-300">Kontakt</label>
                            <input
                                type="tel"
                                name="contact"
                                required
                                placeholder="Unesite kontakt broj"
                                class="bg-gray-700 text-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Submit */}
                        <div class="mt-4">
                            <button
                                type="submit"
                                class="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                Kreirajte portfolio
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}
