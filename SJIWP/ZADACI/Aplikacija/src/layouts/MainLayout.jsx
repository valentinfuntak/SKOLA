import { Router, Route, A } from "@solidjs/router";
import { AuthProvider, useAuth } from "../backend/AuthProvider.jsx";
import { Show } from "solid-js";

export default function MainLayout(props) {
    const appName = import.meta.env.VITE_APP_NAME;
    const session = useAuth();
  
    return (
      <div class="p-4 flex flex-col gap-4">
  
        <div class="flex flex-wrap align-top items-start gap-2">
          <div class="  flex-1 text-3xl text-neutral-700 uppercase">
            {appName}
          </div>
          <div class="flex-none flex flex-wrap gap-2">
          <Show when={!session()}>
            <A href="/signin" class="bg-indigo-600 p-2 rounded hover:bg-red-300">Prijava</A>
          </Show>
          <Show when={session()}>
            <A href="/signout" class="bg-indigo-600 p-2 rounded hover:bg-red-300">Odjava</A>
          </Show>  
        </div>
        </div>
  
        <div class="min-h-[75vh] w-10/12 mx-auto">
          {props.children}
        </div>
  
        <div class="text-center text-xs text-neutral-500">
          Sva prava pridržana {new Date().getFullYear()}. Valentin Funtak
        </div>
      </div>
    );
  }