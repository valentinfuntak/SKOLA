import { Show, createEffect, createSignal } from "solid-js";
import { A } from "@solidjs/router";
import { useAuth } from "../components/AuthProvider";
import { supabase } from "../services/supabase";

export default function Home(props) {
    const session = useAuth();

    const [projects, setProjects] = createSignal(null);

    createEffect(async () => {
        if (session()) {
            const { data, error } = await supabase
                .from("projects")
                .select()
            if (!error) {
                setProjects(data);
            }
        }
    });

    return (
        <>
            <Show when={!session()}>
                <div class="bg-yellow-400 text-black text-3xl p-10 rounded">
                    Morate se prijaviti da biste vidjeli projekte!
                </div>
            </Show>
            <Show when={session() && projects()}>
                <For each={projects()} fallback={<div class="bg-gray-300 text-black text-3xl p-10 rounded">Nema projekata!</div>}>
                    {(item) => (
                        <div class="bg-teal-500 text-black text-3xl p-10 mb-5 rounded flex flex-col justify-between h-48">
                            <div class="text-left">{item.name}</div>
                            <div class="text-right">
                                <A
                                    href={`/tasks/${item.id}`}
                                    class="bg-indigo-600 text-white text-xl px-6 py-2 rounded shadow-lg hover:bg-indigo-700"
                                >
                                    Prikaži
                                </A>
                            </div>
                        </div>
                    )}
                </For>
            </Show>
        </>
    );

}