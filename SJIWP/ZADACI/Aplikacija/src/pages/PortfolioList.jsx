import { createEffect, createSignal, Show, For } from "solid-js";
import { A } from "@solidjs/router";
import { useAuth } from "../backend/AuthProvider.jsx";
import { supabase } from "../backend/Supabase";

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

                        return (
                            <div class="mt-5 flex flex-col gap-2 items-end bg-gray-400 text-white p-2 rounded mb-5">
                                <div class="place-self-start text-xl uppercase">{item.owner}</div>
                                <div class="place-self-start line-clamp-3">{item.about}</div>
                                <div class="place-self-start line-clamp-3">{item.education}</div>
                                <div class="place-self-start">
                                    <h3 class="text-lg font-bold">Tehnologije:</h3>
                                    <ul class="list-disc list-inside">
                                    <li><strong>Frontend:</strong> {technologies.frontend?.join(", ") || "Nema podataka"}</li>
                                        <li><strong>Backend:</strong> {technologies.backend?.join(", ") || "Nema podataka"}</li>
                                        <li><strong>Baze podataka:</strong> {technologies.database?.join(", ") || "Nema podataka"}</li>
                                        <li><strong>Mobilni razvoj:</strong> {technologies.mobiledev?.join(", ") || "Nema podataka"}</li>
                                        <li><strong>Izrada računalnih igara:</strong> {technologies.gamedev?.join(", ") || "Nema podataka"}</li>
                                        <li><strong>Automatizacija:</strong> {technologies.automation?.join(", ") || "Nema podataka"}</li>
                                    </ul>
                                </div>
                                <div class="place-self-start line-clamp-3">{item.projects}</div>
                                <div class="place-self-start line-clamp-3">{item.contact}</div>
                                <div class="place-self-start line-clamp-3">{item.created_at}</div>

                                <A href={`/portfolios/${item.id}`} class="bg-indigo-600 hover:bg-indigo-500 text-white p-2 w-full text-center rounded text-xl">
                                    Prikaži
                                </A>
                                <Show when={item.count != 0}>
                                    <button class="bg-indigo-600 hover:bg-indigo-500 text-white p-2 w-full rounded text-xl" onClick={() => deletePortfolio(item.id)}>
                                        Briši
                                    </button>
                                </Show>
                            </div>
                        );
                    }}
                </For>
            </Show>
        </div>
    );

}