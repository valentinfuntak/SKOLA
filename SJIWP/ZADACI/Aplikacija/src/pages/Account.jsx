import { createSignal, createEffect } from "solid-js";
import { useAuth } from "../backend/AuthProvider.jsx";

export default function Account() {
    const session = useAuth();

    const user = session() ? session().user : null;

    console.log(session().user);

    if (!user) {
        return (
            <div class="account-container bg-red-400">
                <h1 class="text-2xl font-semibold">Niste prijavljeni</h1>
                <p class="mt-2">Morate biti prijavljeni kako biste pristupili svom računu.</p>
            </div>
        );
    }

    return (
        <div class="max-w-4xl mt-11 mx-auto p-6 bg-base-200 rounded-lg shadow-lg">
            <h1 class="text-3xl font-bold text-indigo-500 uppercase mb-4">Vaš račun</h1>

            <div class="bg-base-300 p-6 rounded-lg">
                <ul class="space-y-3">
                    <li class="flex items-center">
                        <span class="text-lg font-medium w-50">Uloga:</span>
                        <span class="text-lg text-base-content">{user.role}</span>
                    </li>
                    <li class="flex items-center">
                        <span class="text-lg font-medium w-50">Email:</span>
                        <span class="text-lg text-base-content">{user.email}</span>
                    </li>
                    <li class="flex items-center">
                        <span class="text-lg font-medium w-50">ID korisnika:</span>
                        <span class="text-lg text-base-content">{user.id}</span>
                    </li>
                    <li class="flex items-center">
                        <span class="text-lg font-medium w-50">Vrijeme izrade računa:</span>
                        <span class="text-lg text-base-content">{user.created_at}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
