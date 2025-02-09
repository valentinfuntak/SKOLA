import { createEffect, createSignal, Show } from "solid-js";
import { useParams } from "@solidjs/router";
import { useAuth } from "../backend/AuthProvider.jsx";
import { supabase } from "../backend/Supabase";
import brisi from "../assets/delete.png";

export default function Portfolio() {
    const id = useParams().id;
    const session = useAuth();

    const [portfolio, setPortfolio] = createSignal(null);
    const [errorMessage, setErrorMessage] = createSignal("");
    const [isOwner, setIsOwner] = createSignal(false);

    createEffect(async () => {
        await loadPortfolio();
    });

    async function loadPortfolio() {
        const { data, error } = await supabase
            .from("portfolios")
            .select("*")
            .eq("id", id)  // Filtriranje po ID-u
            .single(); // Očekujemo samo jedan rezultat
        if (error) {
            alert("Operacija nije uspjela.");
            console.log(error);
        } else {
            setPortfolio(data);
            // Provjerite vlasništvo portfolia
            if (session()) {
                setIsOwner(data.owner_id === session().user.id);
            }
        }
    }

    // Funkcija za brisanje portfolia
    async function deletePortfolio(id) {
        if (!session()) {
            setErrorMessage("Potrebna prijava!");
            setTimeout(() => {
                setErrorMessage("");
            }, 3000);
        } else {
            const { error } = await supabase
                .from("portfolios")
                .delete()
                .eq("id", id);
            if (error) {
                alert("Operacija nije uspjela.");
                console.log(error);
            } else {
                // Nakon brisanja, možete preusmjeriti ili obrisati podatke
                navigate("/portfolio-list");  // Ili vratiti na listu portfolia
            }
        }
    }

    return (
        <div class="bg-base-300 w-full mb-5 h-full p-5 mt-5 rounded-2xl">
            <Show when={portfolio()}>
                <div class="flex flex-col gap-4 bg-gray-800 text-white p-6 rounded-lg shadow-lg">
                    {/* Naslov portfolia */}
                    <h2 class="text-2xl font-bold text-indigo-300">{portfolio().title}</h2>

                    {/* Autor */}
                    <div class="flex items-center gap-2">
                        <span class="text-lg font-semibold text-gray-300">Autor:</span>
                        <p class="text-l text-gray-100">{portfolio().owner}</p>
                    </div>

                    {/* Opis */}
                    <div>
                        <h3 class="text-lg font-semibold text-indigo-300">📖 O meni:</h3>
                        <p class="text-gray-300  bg-gray-700 p-2 rounded">{portfolio().about || "Nema opisa"}</p>
                    </div>

                    {/* Obrazovanje */}
                    <div>
                        <h3 class="text-lg font-semibold text-indigo-300">🎓 Obrazovanje:</h3>
                        <p class="text-gray-300 bg-gray-700 p-2 rounded">{portfolio().education || "Nema podataka"}</p>
                    </div>

                    {/* Tehnologije */}
                    <div>
                        <h3 class="text-lg font-semibold text-indigo-300">💻 Tehnologije:</h3>
                        <ul class="list-none list-inside text-gray-300 space-y-1 bg-gray-700 p-2 rounded">
                            <li><strong>Frontend:</strong> {portfolio().technologies.frontend?.join(", ") || "Nema podataka"}</li>
                            <li><strong>Backend:</strong> {portfolio().technologies.backend?.join(", ") || "Nema podataka"}</li>
                            <li><strong>Baze podataka:</strong> {portfolio().technologies.database?.join(", ") || "Nema podataka"}</li>
                            <li><strong>Mobilni razvoj:</strong> {portfolio().technologies.mobiledev?.join(", ") || "Nema podataka"}</li>
                            <li><strong>Izrada igara:</strong> {portfolio().technologies.gamedev?.join(", ") || "Nema podataka"}</li>
                            <li><strong>Automatizacija:</strong> {portfolio().technologies.automation?.join(", ") || "Nema podataka"}</li>
                        </ul>
                    </div>

                    {/* Projekti */}
                    <div>
                        <h3 class="text-lg font-semibold text-indigo-300">📂 Projekti:</h3>
                        <p class="text-gray-300 bg-gray-700 p-2 rounded">{portfolio().projects || "Nema projekata"}</p>
                    </div>

                    {/* Kontakt */}
                    <div>
                        <h3 class="text-lg font-semibold text-indigo-300">📞 Kontakt:</h3>
                        <p class="text-gray-300 bg-gray-700 p-2 rounded">{portfolio().contact || "Nema kontakta"}</p>
                    </div>

                    {/* Datum kreiranja */}
                    <div>
                        <h3 class="text-lg font-semibold text-indigo-300">📅 Datum kreiranja:</h3>
                        <p class="text-gray-300 bg-gray-700 p-2 rounded">{portfolio().created_at}</p>
                    </div>

                    {/* Dugme za brisanje */}
                    <div class="w-full flex justify-between items-center mt-3">
                        <Show when={isOwner()}>
                            <button class="bg-red-500 hover:bg-red-400 text-white p-2 rounded-lg flex justify-center items-center transition" onClick={() => deletePortfolio(portfolio().id)}>
                                <img src={brisi} alt="Brisanje" class="w-6 h-6" />
                            </button>
                        </Show>
                    </div>

                    <div class="justify-start">
                        <Show when={errorMessage()}>
                            <p class="text-red-500 text-center">{errorMessage()}</p>
                        </Show>
                    </div>
                </div>
            </Show>
        </div>
    );
}
