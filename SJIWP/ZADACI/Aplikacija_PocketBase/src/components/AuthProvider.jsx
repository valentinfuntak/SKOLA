import { createContext, createSignal, useContext, Show, onMount } from "solid-js";
import { pb } from "../services/pocketbase";

// context
const AuthContext = createContext();

// helper
export function useAuth() {
    return useContext(AuthContext);
}

// component
export function AuthProvider(props) {
    const [user, setUser] = createSignal(null);
    const [loading, setLoading] = createSignal(true);

    onMount(async () => {
        // Provjera ima li spremljene sesije
        if (pb.authStore.isValid) {
            try {
                const result = await pb.collection("users").authRefresh();
                setUser(result.record);
            } catch (error) {
                console.warn("Neuspješan authRefresh:", error.message);
                pb.authStore.clear(); // očisti pokvarenu sesiju
                setUser(null);
            }
        } else {
            setUser(null); // korisnik nije prijavljen
        }
        setLoading(false);
    });

    pb.authStore.onChange((token, model) => {
        setUser(model);
    });

    return (
        <Show when={!loading()}>
            <AuthContext.Provider value={user}>
                {props.children}
            </AuthContext.Provider>
        </Show>
    );
}
