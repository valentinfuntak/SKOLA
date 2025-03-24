import { onMount } from "solid-js";
import { pb } from "../services/pocketbase";

export default function Signout() {

    onMount(async () => {
        pb.authStore.clear();
    });

    return (
        <div class="m-2 p-4 bg-emerald-700 w-md rounded">
            Uspješno ste se odjavili.
        </div>
    );
}