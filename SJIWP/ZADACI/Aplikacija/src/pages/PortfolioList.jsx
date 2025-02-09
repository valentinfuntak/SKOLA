import { createEffect, createSignal, Show, For } from "solid-js";
import { A } from "@solidjs/router";
import { useAuth } from "../backend/AuthProvider.jsx";
import { supabase } from "../backend/Supabase";

import brisi from "../assets/delete.png";

export default function PortfolioList() {

    const session = useAuth();

    const [portfolios, setPortfolios] = createSignal(null);

    createEffect(async () => {
        await loadPortfolio();
    });

    async function loadPortfolio() {
        const { data, error } = await supabase
            .from("portfolios")
            .select("*");
        if (error) {
            alert("Operacija nije uspjela.");
            console.log(error);
        } else {
            setPortfolios(data);
        }
        //const technologies = data[0].technologies; // Pretpostavljamo da dohvaćaš jednog korisnika
        //console.log("Backend tehnologije:", technologies.backend);
        //console.log("Baza podataka:", technologies.database);
        //console.log("Frontend tehnologije:", technologies.frontend);
        //console.log("Mobilni razvoj:", technologies.mobiledev);
        //console.log("Automatizacija:", technologies.automation);
    }

    async function deletePortfolio(id) {
        const { error } = await supabase
            .from("portfolios")
            .delete()
            .eq("id", id);
        if (error) {
            alert("Operacija nije uspjela.");
            console.log(error);
        } else {
            await loadPortfolio();
        }
    }

    return (
        <div class="bg-base-300 w-full mb-5 h-full p-5 mt-5 rounded-2xl">
            <h1 class="text-3xl">Pregled portfolia</h1>
            <Show when={session() || !session() && portfolios()}>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <For each={portfolios()} fallback={<div>Nema portfolia.</div>}>
                    {(item) => {
                        let technologies = item.technologies;

                        // Ako je spremljeno kao string, parsiraj ga
                        if (typeof technologies === "string") {
                            try {
                                technologies = JSON.parse(technologies);
                            } catch (error) {
                                console.error("Greška pri parsiranju technologies:", error);
                                technologies = {};
                            }
                        }
                        console.log(technologies);
                        return (
                            <div class="mt-5 flex flex-col gap-4 bg-gray-800 text-white p-6 rounded-lg shadow-lg">
                                {/* Naslov portfolia */}
                                <h2 class="text-2xl font-bold text-indigo-300">{item.title}</h2>

                                {/* Autor */}
                                <div class="flex items-center gap-2">
                                    <span class="font-semibold text-gray-300">Autor:</span>
                                    <p class="text-lg text-gray-100">{item.owner}</p>
                                </div>

                                {/* Opis */}
                                <div>
                                    <h3 class="text-lg font-semibold text-indigo-300">📖 O meni:</h3>
                                    <p class="text-gray-300 bg-gray-700 p-2 rounded">{item.about || "Nema opisa"}</p>
                                </div>

                                {/* Obrazovanje */}
                                <div>
                                    <h3 class="text-lg font-semibold text-indigo-300">🎓 Obrazovanje:</h3>
                                    <p class="text-gray-300 bg-gray-700 p-2 rounded">{item.education || "Nema podataka"}</p>
                                </div>

                                {/* Tehnologije */}
                                <div>
                                    <h3 class="text-lg font-semibold text-indigo-300">💻 Tehnologije:</h3>
                                    <ul class="list-none list-inside text-gray-300 space-y-1 bg-gray-700 p-2 rounded">
                                        <li><strong>Frontend:</strong> {technologies.frontend?.join(", ") || "Nema podataka"}</li>
                                        <li><strong>Backend:</strong> {technologies.backend?.join(", ") || "Nema podataka"}</li>
                                        <li><strong>Baze podataka:</strong> {technologies.database?.join(", ") || "Nema podataka"}</li>
                                        <li><strong>Mobilni razvoj:</strong> {technologies.mobiledev?.join(", ") || "Nema podataka"}</li>
                                        <li><strong>Izrada igara:</strong> {technologies.gamedev?.join(", ") || "Nema podataka"}</li>
                                        <li><strong>Automatizacija:</strong> {technologies.automation?.join(", ") || "Nema podataka"}</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-indigo-300">📂 Projekti:</h3>
                                    <p class="text-gray-300 bg-gray-700 p-2 rounded">{item.projects || "Nema projekata"}</p>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-indigo-300">📞 Kontakt:</h3>
                                    <p class="text-gray-300 bg-gray-700 p-2 rounded">{item.contact || "Nema kontakta"}</p>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-indigo-300">📅 Datum kreiranja:</h3>
                                    <p class="text-gray-300 bg-gray-700 p-2 rounded">{item.created_at}</p>
                                </div>
                                <div class="w-full flex justify-between items-center mt-3">
                                    <A href={`/portfolios/${item.id}`} class="bg-indigo-600 hover:bg-indigo-500 text-white p-2 text-center rounded-lg text-xl transition">
                                        🔍 Prikaži
                                    </A>
                                    <Show when={item.count != 0}>
                                        <button class="bg-red-500 hover:bg-red-400 text-white p-2 rounded-lg flex justify-center items-center transition" onClick={() => deletePortfolio(item.id)}>
                                            <img src={brisi} alt="Brisanje" class="w-6 h-6" />
                                        </button>
                                    </Show>
                                </div>
                            </div>
                        );
                    }}
                </For>
                </div>
            </Show>
        </div>
    );

}