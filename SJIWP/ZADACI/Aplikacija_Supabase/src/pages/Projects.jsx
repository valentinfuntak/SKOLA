export default function Projects() {
    return (
        <div className="mt-5 bg-base-300 rounded-lg">
            <div className="flex justify-between items-start p-5">
                <h1 className="text-3xl font-bold">Vaši projekti</h1>
                <a href="/projectsadd">
                    <button className="bg-indigo-600 p-2 rounded hover:bg-indigo-500 text-xl">Dodaj projekt</button>
                </a>
            </div>
        </div>
    );
}