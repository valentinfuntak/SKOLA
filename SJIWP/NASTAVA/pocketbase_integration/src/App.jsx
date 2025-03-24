import { A, Navigate, Route, Router } from "@solidjs/router";
import { AuthProvider, useAuth } from "./components/AuthProvider";
import { Show } from "solid-js";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Signout from "./pages/Signout";
import Error from "./pages/Error";

export default function App() {
  return (
    <AuthProvider>
      <Router root={Layout}>
        <Route path="/" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/signout" component={Signout} />
        <Route path="/error" component={Error} />
        <Route path="*" component={() => <Navigate href="/error" />} />
      </Router>
    </AuthProvider>
  );
}

function Layout(props) {

  const appName = import.meta.env.VITE_APP_NAME;

  const user = useAuth();

  return (
    <div class="min-h-screen flex flex-col">
      <header class="flex flex-row gap-2 items-center p-2 flex-none">
        <div class="flex-none">
          <A class="text-4xl font-bold font-sans uppercase text-cyan-600" href="/">{appName}</A>
        </div>

        <nav class="flex-1 flex gap-2 justify-end">
          <Show when={user()}>
            <A class="p-2 bg-red-500 text-gray-50 font-bold rounded hover:brightness-90" href="/signout">Odjava</A>
          </Show>
          <Show when={!user()}>
            <A class="p-2 bg-amber-500 text-gray-50 font-bold rounded hover:brightness-90" href="/signin">Prijava</A>
            <A class="p-2 bg-blue-500 text-gray-50 font-bold rounded hover:brightness-90" href="/signup">Registracija</A>
          </Show>
        </nav>
      </header>

      <main class="flex-1">{props.children}</main>

      <footer class="flex-none py-6 px-2 border-cyan-800 text-white text-sm text-center">Copryght {appName}</footer>
    </div>
  );
}