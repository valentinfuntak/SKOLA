import { createSignal } from "solid-js";
import { useAuth } from "../backend/AuthProvider.jsx";

export default function PortfolioForm() {
    const session = useAuth();
    const [success, setSuccess] = createSignal(false);

    async function formSumbit(event) {
        // Dodaj logiku za spremanje podataka
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
                            <label class="text-lg font-semibold text-gray-300">
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
                            <label class="text-lg font-semibold text-gray-300">O meni</label>
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
                            <label class="text-lg font-semibold text-gray-300" for="education">Obrazovanje</label>
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
                            <label class="text-lg font-semibold text-gray-300">
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

                        {/* Tehnologije */}
                        <div class="flex flex-col gap-6">
                            <label class="text-lg font-semibold text-gray-300">
                                Tehnologije
                            </label>
                        </div>

                        {/* Iskustvo */}
                        <div class="flex flex-col gap-2">
                            <label class="text-lg font-semibold text-gray-300">
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
                            <label class="text-lg font-semibold text-gray-300">
                                Projekti
                            </label>
                            <input
                                type="text"
                                name="projects"
                                required
                                class="bg-gray-700 text-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Kontakt */}
                        <div class="flex flex-col gap-2">
                            <label class="text-lg font-semibold text-gray-300">Kontakt</label>
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
