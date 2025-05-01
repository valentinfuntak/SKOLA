import { useAuth } from "../components/AuthProvider";
import { useNavigate } from "@solidjs/router";
import Projects from "./Projects.jsx";

export default function Account() {
    const user = useAuth();
    const navigate = useNavigate();  // Koristimo useNavigate za preusmjeravanje

    if (!user()) {
        return (
            <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-blue-500 p-8 rounded-lg shadow-lg m-4">
                <h1 class="text-3xl font-semibold text-white">Niste prijavljeni</h1>
                <p class="mt-4 text-lg text-white opacity-80">Morate biti prijavljeni kako biste pristupili svom računu.</p>
                <div class="mt-6">
                    <button 
                        onClick={() => navigate("/signin")}  // Preusmjerava korisnika na stranicu za prijavu
                        class="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg shadow hover:bg-blue-100 transition duration-300">
                        Prijavite se
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div class="max-w-4xl mt-11 mb-10 mx-auto p-8 bg-base-200 rounded-lg shadow-lg">
            <h1 class="text-3xl font-bold text-blue-600 uppercase mb-6">Vaš račun</h1>

            <div class="bg-base-300 p-6 rounded-lg shadow-md">
                <ul class="space-y-4">
                    <li class="flex items-center">
                        <span class="text-xl font-medium w-50">Ime:</span>
                        <span class="text-xl text-base-content">{user().name}</span>
                    </li>
                    <li class="flex items-center">
                        <span class="text-xl font-medium w-50">Email:</span>
                        <span class="text-xl text-base-content">{user().email}</span>
                    </li>
                    <li class="flex items-center">
                        <span class="text-xl font-medium w-50">ID korisnika:</span>
                        <span class="text-xl text-base-content">{user().id}</span>
                    </li>
                    <li class="flex items-center">
                        <span class="text-xl font-medium w-50">Vrijeme izrade računa:</span>
                        <span class="text-xl text-base-content">{new Date(user().created).toLocaleString()}</span>
                    </li>
                </ul>
            </div>

            <Projects />
        </div>
    );
}
