import PortfolioList from "./PortfolioList"; 

export default function Home() {
  return (
    <>
      <div className="hero min-h-screen bg-base-100 flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-4xl sm:text-5xl font-bold">Dobrodošli na Portfolio Kreator</h1>
        <p className="py-4 text-lg max-w-md">Kreirajte svoj portfolio i pokažite svoje projekte i vještine.</p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a href="/portfolioform" className="w-full sm:w-auto">
            <button className="bg-indigo-600 p-3 w-full sm:w-auto rounded hover:bg-indigo-500 text-lg">Stvori portfolio</button>
          </a>
          <a href="/portfoliolist" className="w-full sm:w-auto">
            <button className="bg-indigo-600 p-3 w-full sm:w-auto rounded hover:bg-indigo-500 text-lg">Pregled portfolia</button>
          </a>
        </div>
      </div>
      <PortfolioList />
    </>
  );
}