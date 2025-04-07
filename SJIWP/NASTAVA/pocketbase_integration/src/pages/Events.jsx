import { createSignal, Show, For, onMount, createEffect } from "solid-js";
import { pb } from "../services/pocketbase";
import { useAuth } from "../components/AuthProvider";
import AlertMessage from "../components/AlertMessage";
import Button from "../components/Button";

export default function Events(props) {
    const user = useAuth();
    const [success, setSuccess] = createSignal(false);
    const [error, setError] = createSignal(false);
    const [items, setItems] = createSignal([]);
    const [selected, setSelected] = createSignal(null);

    onMount(async () => {
        await load();
    })

    createEffect(() => {
       if (seccuess() === true){
        setTimeout(()=>{
            setSuccess(false);
        }, 3000);
       } 
    });

    async function load() {
        setError(false)
        try {
            const result = await pb.collection('events').getFullList({
                sort: '-created',
            });
            setItems(result)
        } catch (error) {
            console.log(error);
            setError(true);
        }
    }

    async function deleteItem(item) {
        console.log("test", item)
        try{
            await pb.collection("events").delete(item.id);
            await load();
        }catch(error){
            console.log(error);
        }
    }

    function updateItem (item){
        setSelected(null)
    }

    async function formSubmit(event) {
        event.preventDefault();

        setError(false);
        setSuccess(false);

        const formData = new FormData(event.target);

        const name = formData.get("name");
        const details = formData.get("details");
        const start = formData.get("start");
        const maxSeats = formData.get("maxSeats");

        try {
            const data = {
                name: name,
                details: details,
                start: new Date(start),
                maxSeats: maxSeats,
                author: user().id
            }
            
            if (selected()){
                await pb.collection("events").update(selected().id, data);
                setSelected(null);
            }else{
                await pb.collection("events").create(data);
            }

            await pb.collection('events').create(data);
            await load();
            setSuccess(true);
            event.target.reset();
        } catch (error) {
            setError(true);
        }
    }

    return (
        <>
            <div class="m-2">
                <div class="text-3xl font-bold text-cyan-600 mb-6 text-center">Događaji</div>
                <Show when={success()}>
                    <AlertMessage message="Operacija je uspješno izvršena" />
                </Show>
                <Show when={error()}>
                    <AlertMessage message="Dogodila se greška! Provjerite podatke." />
                </Show>

                <div class="flex flex-row flax-wrap-reverse gap 2">
                    <form onSubmit={formSubmit} class="space-y-4 w-md flex-none">
                        <div>
                            <label class="block text-gray-700 font-medium mb-1">Naziv događaja</label>
                            <input class="w-full border rounded-lg p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-400" type="text" name="name" minLength="3" maxLength="100" required />
                        </div>
                        <div>
                            <label class="block text-gray-700 font-medium mb-1">Opis</label>
                            <textarea class="border rounded p-2 h-40 w-full" name="details" required></textarea>
                        </div>
                        <div>
                            <label class="block text-gray-700 font-medium mb-1">Početak</label>
                            <input class="border rounded p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-400" type="datetime-local" name="start" required />
                        </div>
                        <div>
                            <label class="block text-gray-700 font-medium mb-1">Maksimalni broj mjesta</label>
                            <input class="w-full border rounded-lg p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-400" type="number" name="maxSeats" step="1" min="1" required />
                        </div>
                        <div>
                            <button class="mb-2 w-full bg-amber-500 text-white font-medium py-3 rounded-lg shadow-md hover:bg-amber-600 transition" type="submit">Pošalji</button>
                            <button class="w-full bg-slate-500 text-white font-medium py-3 rounded-lg shadow-md hover:bg-slate-600 transition" type="reset">Reset</button>
                        </div>
                    </form>

                    <div class="flex-1 p-2">
                        <For each={items()}>
                            {(item, index) => (
                                <div class="flex flex-row  items-center gap-2 p-4 rounded bg-amber-100">
                                    <div>
                                        <div class="text-2xl">{item.name}</div>
                                        <div class="line-clamp-3 text-xs">{item.details}</div>
                                    </div>
                                    <div class="flex flex-com">
                                        <div>{new Date(item.start).toLocaleDateString("hr")}</div>
                                        <div class="text-[0.5em]">Početak</div>
                                    </div>

                                    <div class="flex flex-com">
                                        <div>{item.usedSeats}/{item.maxSeats}</div>
                                        <div class="text-[0.5em]">Popunjenost</div>
                                    </div>


                                    <div class="flex flex-row gap-1">
                                        <span onClick={() => deleteItem(item)}><Button lable="Uredi"/> </span>
                                        <span onClick={() => deleteItem(item)}><Button lable="Obriši" color="bg-red-400"/> </span>
                                        
                                    </div>
                                </div>
                            )}
                        </For>
                    </div>

                </div>

            </div>
        </>
    );
}