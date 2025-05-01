import { createEffect, createSignal, Show } from "solid-js";
import { useParams, useNavigate } from "@solidjs/router";
import { useAuth } from "../components/AuthProvider";
import { pb } from "../services/pocketbase";
import brisi from "../assets/delete.png";

export default function Portfolio() {
    const id = useParams().id;
    const navigate = useNavigate();
    const session = useAuth();

    const [portfolio, setPortfolio] = createSignal(null);
    const [errorMessage, setErrorMessage] = createSignal("");
    const [isOwner, setIsOwner] = createSignal(false);

    createEffect(async () => {
        await loadPortfolio();
    });

    async function loadPortfolio() {
        try {
            const record = await pb.collection("portfolios").getOne(id);
            setPortfolio(record);

            if (session()) {
                setIsOwner(record.owner_id === session().user.id);
            }
        } catch (error) {
            alert("Operacija nije uspjela.");
            console.log(error);
        }
    }

    async function deletePortfolio(id) {
        if (!session()) {
            setErrorMessage("Potrebna prijava!");
            setTimeout(() => {
                setErrorMessage("");
            }, 3000);
        } else {
            try {
                await pb.collection("portfolios").delete(id);
                navigate("/portfolio-list");
            } catch (error) {
                alert("Operacija nije uspjela.");
                console.log(error);
            }
        }
    }

    return (
        <div class="bg-base-300 w-full mb-5 h-full p-5 mt-5 rounded-2xl">
            <Show when={portfolio()}>
                <div class="flex flex-col gap-4 bg-gray-800 text-white p-6 rounded-lg shadow-lg">
                    <h2 class="text-2xl font-bold text-indigo-300">{portfolio().title}</h2>

                    <div class="flex items-center gap-2">
                        <span class="text-lg font-semibold text-gray-300">Autor:</span>
                        <p class="text-l text-gray-100">{portfolio().owner}</p>
                    </div>

                    <div>
                        <h3 class="text-lg font-semibold text-indigo-300">📖 O meni:</h3>
                        <p class="text-gray-300 bg-gray-700 p-2 rounded">{portfolio().about || "Nema opisa"}</p>
                    </div>

                    <div>
                        <h3 class="text-lg font-semibold text-indigo-300">🎓 Obrazovanje:</h3>
                        <p class="text-gray-300 bg-gray-700 p-2 rounded">{portfolio().education || "Nema podataka"}</p>
                    </div>

                    <div>
                        <h3 class="text-lg font-semibold text-indigo-300">💻 Tehnologije:</h3>
                        <ul class="list-none list-inside text-gray-300 space-y-1 bg-gray-700 p-2 rounded">
                            <li><strong>Frontend:</strong> {portfolio().technologies?.frontend?.join(", ") || "Nema podataka"}</li>
                            <li><strong>Backend:</strong> {portfolio().technologies?.backend?.join(", ") || "Nema podataka"}</li>
                            <li><strong>Baze podataka:</strong> {portfolio().technologies?.database?.join(", ") || "Nema podataka"}</li>
                            <li><strong>Mobilni razvoj:</strong> {portfolio().technologies?.mobiledev?.join(", ") || "Nema podataka"}</li>
                            <li><strong>Izrada igara:</strong> {portfolio().technologies?.gamedev?.join(", ") || "Nema podataka"}</li>
                            <li><strong>Automatizacija:</strong> {portfolio().technologies?.automation?.join(", ") || "Nema podataka"}</li>
                        </ul>
                    </div>

                    <div>
                        <h3 class="text-lg font-semibold text-indigo-300">📂 Projekti:</h3>
                        <p class="text-gray-300 bg-gray-700 p-2 rounded">{portfolio().projects || "Nema projekata"}</p>
                    </div>

                    <div>
                        <h3 class="text-lg font-semibold text-indigo-300">📞 Kontakt:</h3>
                        <p class="text-gray-300 bg-gray-700 p-2 rounded">{portfolio().contact || "Nema kontakta"}</p>
                    </div>

                    <div>
                        <h3 class="text-lg font-semibold text-indigo-300">📅 Datum kreiranja:</h3>
                        <p class="text-gray-300 bg-gray-700 p-2 rounded">{new Date(portfolio().created).toLocaleString()}</p>
                    </div>

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
