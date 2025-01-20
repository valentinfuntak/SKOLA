import { createSignal, Show } from "solid-js";
import { useAuth } from "../components/AuthProvider";
import { supabase } from "../services/supabase";

export default function Projects(props) {
  const session = useAuth();
  const [seccuess, setSeccuess] = createSignal(false);

  async function formSubmit(event) {
    setSeccuess(false);
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const description = formData.get("description");
    const { user } = session();
    const author_id = user.id;

    const { error } = await supabase
      .from("projects")
      .insert({
        name: name,
        ...(description !== "" ? { description: description } : {}),
        author_id: author_id
      });

    if (error) {
      alert("Dogodila se greška prilikom kreiranja projekta.");
    } else {
      setSeccuess(true);
    }
  }

  return (<>
    <form onSubmit={formSubmit}>
      <div class="p-2 flex flex-col gap-1">
        <label>Naziv:</label>
        <input type="text" name="name" required="true" />
      </div>

      <div class="p-2 flex flex-col gap-1">
        <label>Opis:</label>
        <textarea name="description" class="min-h-60"></textarea>
      </div>

      <div class="p-2 flex flex-col gap-1">
        <input type="submit" value="Pošalji" class="bg-slate-600 text-white p-2 rounded" />
      </div>
    </form>
    <Show when={seccuess()}>
      <div class="bg-green-400 text-white p-4 rounded mb-5">
        Projekt uspješno spremljen!
      </div>
    </Show>
  </>
  );
}