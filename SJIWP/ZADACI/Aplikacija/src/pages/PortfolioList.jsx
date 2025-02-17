import { format, parse, parseISO } from "date-fns";
import { createEffect, createSignal, Show, For } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { useAuth } from "../backend/AuthProvider.jsx";
import { supabase } from "../backend/Supabase";
import brisi from "../assets/delete.png";

export default function PortfolioList() {
    const navigate = useNavigate();
    const session = useAuth();

    const [portfolio, setPortfolio] = createSignal([]);
    const [errorMessage, setErrorMessage] = createSignal("");
    const [isOwner, setIsOwner] = createSignal([]);

    createEffect(async () => {
        await loadPortfolio();
    });

    //const formatedDate = format(parse(item.created_at, 'dd.MM.yyyy HH:mm:ss', new Date()));

    const formatedDate = (item) => {
        const parsedDate = parseISO(item.created_at);
        return format(parsedDate, "dd.MM.yyyy HH:mm:ss");
    };

    async function loadPortfolio() {
        const { data, error } = await supabase
            .from("portfolios")
            .select("*");
        if (error) {
            alert("Operacija nije uspjela.");
            console.log(error);
        } else {
            setPortfolio(data);
            if (session()) {
                const ownerStatus = data.map((item) => item.owner_id === session().user.id);
                setIsOwner(ownerStatus);
            } else {
                setIsOwner([]);
            }
        }
    }

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
                await loadPortfolio();
            }
        }
    }

    const handleClickPregled = (item) => {
        if (!session()) {
            setErrorMessage("Potrebna prijava!");
            setTimeout(() => {
                setErrorMessage("");
            }, 3000);
        } else {
            navigate(`/portfolio/${item.id}`);
        }
    };

    return (
        <div class="bg-base-300 w-full mb-5 h-full p-5 mt-5 rounded-2xl">
            <h1 class="text-3xl">Pregled portfolia</h1>
            <Show when={portfolio()}>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <For each={portfolio()} fallback={<div>Nema portfolia.</div>}>
                        {(item, index) => {
                            let technologies = item.technologies;

                            //Parsiranje JSON-a
                            if (typeof technologies === "string") {
                                try {
                                    technologies = JSON.parse(technologies);
                                } catch (error) {
                                    console.error("Greška pri parsiranju tehnologija:", error);
                                    technologies = {};
                                }
                            }

                            return (
                                <div class="mt-5 flex flex-col gap-4 bg-gray-800 text-white p-6 rounded-lg shadow-lg">

                                    {/*NASLOV*/}
                                    <h2 class="text-2xl font-bold text-indigo-300">{item.title}</h2>

                                    {/*AUTOR*/}
                                    <div class="flex items-center gap-2">
                                        <span class="text-lg font-semibold text-gray-300">Autor:</span>
                                        <p class="text-l text-gray-100">{item.owner}</p>
                                    </div>

                                    {/*OPIS*/}
                                    <div>
                                        <h3 class="text-lg font-semibold text-indigo-300">📖 O meni:</h3>
                                        <p class="text-gray-300  bg-gray-700 p-2 rounded">{item.about || "Nema opisa"}</p>
                                    </div>

                                    {/*OBRAZOVANJE*/}
                                    <div>
                                        <h3 class="text-lg font-semibold text-indigo-300">🎓 Obrazovanje:</h3>
                                        <p class="text-gray-300 bg-gray-700 p-2 rounded">{item.education || "Nema podataka"}</p>
                                    </div>

                                    {/*CERTIFIKATI*/}
                                    <div>
                                        <h3 class="text-lg font-semibold text-indigo-300">📜 Certifikati:</h3>
                                        <p class="text-gray-300 bg-gray-700 p-2 rounded">{item.certificates || "Nema podataka"}</p>
                                    </div>

                                    {/*TEHNLOGIJE*/}
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

                                    {/*ISKUSTVO*/}
                                    <div>
                                        <h3 class="text-lg font-semibold text-indigo-300">🛠️ Iskustvo:</h3>
                                        <p class="text-gray-300 bg-gray-700 p-2 rounded">{item.experience || "Nema iskustva"}</p>
                                    </div>

                                    {/*PROJEKTI*/}
                                    <div>
                                        <h3 class="text-lg font-semibold text-indigo-300">📂 Projekti:</h3>
                                        <p class="text-gray-300 bg-gray-700 p-2 rounded">{item.projects || "Nema projekata"}</p>
                                    </div>

                                    {/*KONTAKT*/}
                                    <div>
                                        <h3 class="text-lg font-semibold text-indigo-300">📞 Kontakt:</h3>
                                        <p class="text-gray-300 bg-gray-700 p-2 rounded">
                                            {item.contact || "Nema kontakta"}
                                            {item.email ? <><br />{item.email}</> : ""}
                                        </p>

                                    </div>

                                    {/*DATUM*/}
                                    <div>
                                        <h3 class="text-lg font-semibold text-indigo-300">📅 Datum kreiranja:</h3>
                                        <p class="text-gray-300 bg-gray-700 p-2 rounded">{formatedDate(item)}</p>
                                    </div>

                                    {/*GUMBI*/}
                                    <div class="w-full flex justify-between items-center mt-3">
                                        <Show when={item.count != 0}>
                                            <button
                                                onClick={() => handleClickPregled(item)}
                                                class="bg-indigo-600 hover:bg-indigo-500 text-white p-2 text-center rounded-lg text-xl transition"
                                            >
                                                🔍 Pregled
                                            </button>
                                        </Show>
                                        <Show when={item.count != 0 && isOwner()[index()]}>
                                            <button class="bg-red-500 hover:bg-red-400 text-white p-2 rounded-lg flex justify-center items-center transition" onClick={() => deletePortfolio(item.id)}>
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
                            );
                        }}
                    </For>
                </div>
            </Show>
        </div>
    );
}
