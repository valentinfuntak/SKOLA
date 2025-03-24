import { createSignal } from "solid-js";
import { pb } from "../services/pocketbase";

export default function Signup() {

    const [error, setError] = createSignal(false);
    const [seccuess, setSeccuess] = createSignal(false);

    async function formSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");
        const confirmpassword = formData.get("confirmpassword");
        //console.log(`Data: ${email},${password}`);

        if (password !== confirmpassword) {
            console.log("Error", error)
            setError(true);
            return;
        }

        try {
            await pb.collection("users").create({
                name, email, password, confirmpassword
            })
            //BREVO await pb.collection("users").requestVerification(email);
            setSeccuess(true);
        } catch (error) {
            console.log("Error:", error);
            setError(true);
        }
    }

    return (
        <>
            <div class="text-3xl font-mono font-bold p-2">Registracija korisnika</div>
            <Show when={seccuess}>
                <form onSubmit={formSubmit} class="w-md">
                    <div class="p-2 flex flex-col gap-1">
                        <label>Ime</label>
                        <input class="border rounded p-2" type="text" name="name" required="true" />
                    </div>
                    <div class="p-2 flex flex-col gap-1">
                        <label>E-mail</label>
                        <input class="border rounded p-2" type="email" name="email" required="true" />
                    </div>

                    <div class="p-2 flex flex-col gap-1">
                        <label>Zaporka</label>
                        <input class="border rounded p-2" type="password" name="password" required="true" min="6" />
                    </div>

                    <div class="p-2 flex flex-col gap-1">
                        <label>Potvrda zaporke</label>
                        <input class="border rounded p-2" type="password" name="confirmpassword" required="true" min="6" />
                    </div>

                    <div class="p-2 flex flex-col gap-1">
                        <input type="submit" value="Pošalji" class="bg-slate-600 text-white p-2 rounded" />
                    </div>
                </form>
            </Show>

            <Show when={seccuess()}>
            <div class="m-2 p-4 w-md rounded bg-green-700">
                    USpješno ste se registrirali na aplikaciju.
                </div>
            </Show>

            <Show when={error()}>
                <div class="m-2 p-4 w-md rounded bg-red-600">
                    Dogodila se greška prilikom stvaranja korisničkog računa, provjerite svoje podatke.
                </div>
            </Show>

        </>
    );
}