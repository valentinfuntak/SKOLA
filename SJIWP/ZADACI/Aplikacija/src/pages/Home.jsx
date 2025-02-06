export default function Home() {
  return (
    <div class="hero min-h-screen bg-base-100">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Dobrodošli na Portfolio Kreator</h1>
          <p class="py-6">Kreirajte svoj portfolio i pokažite svoje projekte i vještine.</p>
          <a href="/portfolioform">
            <button className="bg-indigo-600 p-2 rounded hover:bg-indigo-500 text-l mr-5">Stvori portfolio</button>
          </a>
          <a href="/portfoliolist">
            <button className="bg-indigo-600 p-2 rounded hover:bg-indigo-500 text-l mr-5">Pregled portfolia</button>
          </a>
        </div>
      </div>
    </div>
  );
}