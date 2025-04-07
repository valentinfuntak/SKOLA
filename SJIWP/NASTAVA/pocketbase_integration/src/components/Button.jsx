import { createSignal, onMount, Show } from "solid-js";

export default function Button(props){
    const defaultColor = createSignal("bg-blue-400");

    onMount(()=>{
        if (props.color){
            setColor(props.color)
        }
    });

    return(
        <>
        <Show when={props.href}>
            <A class="p-2 $(color()} text-gray-50 font-bold rounded hover:brightness-90" href={props.href}></A>
        </Show>
        <Show when={!props.href}>
            <button class="p-2 bg-amber-500 text-gray-50 font-bold rounded hover:brightness-90">{props.href}</button>
        </Show>
        </>
    );
}