export default function ProjectForm() {

    async function formSubmit(event) {
        console.log("Uspjeh!");
    }

    return (
        <>
            <form onSubmit={formSubmit}>
                <div class="w-full bg-gray-900 rounded-2xl p-7 mt-8 mb-5 shadow-xl">
                    <div class="mx-auto p-5 bg-gray-800 rounded-lg shadow-lg text-3xl text-center text-indigo-400 uppercase font-semibold tracking-wider">
                        Stvaranje projekta
                    </div>

                    <div class="mt-4 p-4 flex flex-col gap-4 bg-gray-800 rounded-lg shadow-md">

                        {/* Naziv projekta */}
                        <div class="flex flex-col gap-2">
                            <label class="text-xl font-semibold text-gray-300">
                                Naziv projekta:
                            </label>
                            <input
                                type="text"
                                name="title"
                                required="true"
                                placeholder="Unesite naziv projekta"
                                class="bg-gray-700 text-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Naziv projekta */}
                        <div class="flex flex-col gap-2">
                            <label class="text-xl font-semibold text-gray-300">
                                Opis projekta:
                            </label>
                            <textarea
                                class="w-full h-40 resize-none bg-gray-700 text-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                maxLength={2000}
                                name="about"
                                placeholder="Napišite opis projekta"
                            />
                        </div>

                        {/* Dodavanje datoteka*/}
                        <div>
                            <label class="block text-sm font-medium text-gray-300">Dodaj datoteke</label>
                            <input type="file" multiple class="mt-1 block w-full text-lg text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-2xl file:border-0 file:outline-none file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"  />
                        </div>

                        {/* Submit */}
                        <div class="mt-4">
                            <button
                                type="submit"
                                class="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                Dodaj projekt
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}