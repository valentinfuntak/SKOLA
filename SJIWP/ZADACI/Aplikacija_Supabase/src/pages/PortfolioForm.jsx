import { createSignal, Show } from "solid-js";
import { useAuth } from "../backend/AuthProvider.jsx";
import { supabase } from "../backend/Supabase.js";

import html from "../assets/Ikone/Frontend/html.png";
import css from "../assets/Ikone/Frontend/css-3.png";
import js from "../assets/Ikone/Frontend/js.png";
import solid from "../assets/Ikone/Frontend/solid.png";
import angular from "../assets/Ikone/Frontend/angular.png";
import react from "../assets/Ikone/Frontend/react.png";
import vue from "../assets/Ikone/Frontend/vue.png";
import typescript from "../assets/Ikone/Frontend/typescript.png";

import nodejs from "../assets/Ikone/Backend/node.png";
import python from "../assets/Ikone/Backend/python.png";
import ruby from "../assets/Ikone/Backend/ruby.png";

import mongodb from "../assets/Ikone/DB/mongodb.png";
import sql from "../assets/Ikone/DB/sql.png";
import supa from "../assets/Ikone/DB/supabase.png";

import flutter from "../assets/Ikone/Mobile/flutter.png";
import java from "../assets/Ikone/Mobile/java.png";
import swift from "../assets/Ikone/Mobile/swift.png";

import gdscript from "../assets/Ikone/GameDev/gds.webp";
import csharp from "../assets/Ikone/GameDev/cs.png";
import cpp from "../assets/Ikone/GameDev/cp.png";

import puppeteer from "../assets/Ikone/Automatization/pupe.png";

export default function PortfolioForm() {
    const session = useAuth();
    const [success, setSuccess] = createSignal(false);
    const [error, setError] = createSignal(false);

    async function formSubmit(event) {
        setSuccess(false);
        setError(false);

        event.preventDefault();
        const formData = new FormData(event.target);

        const sessionData = session();
        if (!sessionData || !sessionData.user) {
            setError(true);
            return;
        }

        const owner_id = session().user.id;
        const email = session().user.email;
        
        const title = formData.get("title");
        const owner = formData.get("author");

        const categories = [
            "frontendTechnologies",
            "backendTechnologies",
            "databaseTechnologies",
            "mobileDevTechnologies",
            "gameDevTechnologies",
            "automationTechnologies"
        ];

        const technologies = {};

        categories.forEach(category => {
            const selectedTechs = formData.getAll(category);
            if (selectedTechs.length > 0) {
                technologies[category.replace("Technologies", "").toLowerCase()] = selectedTechs;
            }
        });

        const about = formData.get("about");
        const education = formData.get("education");
        const experience = formData.get("experience");
        const projects = formData.get("projects");
        const contact = formData.get("contact");
        const certificates = formData.get("certificate");

        const { error } = await supabase
            .from("portfolios")
            .insert({
                owner_id: owner_id,
                email: email,
                title: title,
                owner: owner,
                about: about,
                education: education,
                technologies: technologies,
                experience: experience,
                projects: projects,
                contact: contact,
                certificates: certificates
            });
        if (error) {
            console.error("Error during insert:", error);
            setError(true);
            alert("Spremanje nije uspjelo.");
        } else {
            setSuccess(true);
            event.target.reset();
        }
    }


    return (
        <>
            <form onSubmit={formSubmit}>
                <div class="w-full bg-gray-900 rounded-2xl p-7 mt-8 mb-5 shadow-xl">
                    <div class="mx-auto p-5 bg-gray-800 rounded-lg shadow-lg text-3xl text-center text-indigo-400 uppercase font-semibold tracking-wider">
                        Portfolio
                    </div>

                    <div class="mt-4 p-4 flex flex-col gap-4 bg-gray-800 rounded-lg shadow-md">

                        {/* Naslov portfolia */}
                        <div class="flex flex-col gap-2">
                            <label class="text-xl font-semibold text-gray-300">
                                Naslov portfolia:
                            </label>
                            <input
                                type="text"
                                name="title"
                                required="true"
                                placeholder="Unesite naslov portfolia"
                                class="bg-gray-700 text-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Vlasnik portfolia */}
                        <div class="flex flex-col gap-2">
                            <label class="text-xl font-semibold text-gray-300">
                                Vlasnik portfolia:
                            </label>
                            <input
                                type="text"
                                name="author"
                                required="true"
                                placeholder="Unesite ime i prezime"
                                class="bg-gray-700 text-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* O meni */}
                        <div class="flex flex-col gap-2">
                            <label class="text-xl font-semibold text-gray-300">O meni</label>
                            <textarea
                                class="w-full h-40 resize-none bg-gray-700 text-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                maxLength={2000}
                                name="about"
                                placeholder="Napišite nešto o sebi"
                            />
                        </div>

                        {/* Obrazovanje */}
                        <div class="flex flex-col gap-2">
                            <label class="text-xl font-semibold text-gray-300" for="education">Obrazovanje</label>
                            <select name="education" id="education" class="bg-gray-700 text-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <option class="bg-white text-black" value="">
                                    Odaberite obrazovni program
                                </option>
                                <option class="bg-white text-black" value="Srednja škola - Računarstvo">
                                    Srednja škola - Računarstvo
                                </option>
                                <option class="bg-white text-black" value="Sveučilišni prvostupnik/prvostupnica informatike">
                                    Sveučilišni prvostupnik/prvostupnica informatike
                                </option>
                            </select>
                        </div>

                        {/* Certifikati */}
                        <div class="flex flex-col gap-2">
                            <label class="text-xl font-semibold text-gray-300">
                                Certifikati
                            </label>
                            <input
                                type="text"
                                name="certificate"
                                placeholder="Unesite naziv certifikata"
                                class="bg-gray-700 text-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Tehnologije */}
                        <div class="flex flex-col gap-6 items-start">
                            <label class="text-xl font-semibold text-gray-300">Tehnologije</label>

                            {/* Frontend */}
                            <div className="flex flex-col items-start gap-4">
                                <h2 className="text-xl font-semibold">Frontend</h2>
                                <div className="flex gap-6 flex-wrap responsive-grid">
                                    {/* HTML */}
                                    <div className="flex flex-col items-center gap-2">
                                        <h1 className="text-lg">HTML</h1>
                                        <img className="w-15" src={html} alt="HTML" />
                                        <input type="checkbox" name="frontendTechnologies" value="HTML" className="checkbox checkbox-primary" />
                                    </div>
                                    {/* CSS */}
                                    <div className="flex flex-col items-center gap-2">
                                        <h1 className="text-lg">CSS</h1>
                                        <img className="w-15" src={css} alt="CSS" />
                                        <input type="checkbox" name="frontendTechnologies" value="CSS" className="checkbox checkbox-primary" />
                                    </div>
                                    {/* JavaScript */}
                                    <div className="flex flex-col items-center gap-2">
                                        <h1 className="text-lg">JavaScript</h1>
                                        <img className="w-15" src={js} alt="JavaScript" />
                                        <input type="checkbox" name="frontendTechnologies" value="JavaScript" className="checkbox checkbox-primary" />
                                    </div>
                                    {/* TypeScript */}
                                    <div className="flex flex-col items-center gap-2">
                                        <h1 className="text-lg">TypeScript</h1>
                                        <img className="w-15" src={typescript} alt="TypeScript" />
                                        <input type="checkbox" name="frontendTechnologies" value="TypeScript" className="checkbox checkbox-primary" />
                                    </div>
                                    {/* Solid */}
                                    <div className="flex flex-col items-center gap-2">
                                        <h1 className="text-lg">Solid</h1>
                                        <img className="w-15" src={solid} alt="solid" />
                                        <input type="checkbox" name="frontendTechnologies" value="Solid" className="checkbox checkbox-primary" />
                                    </div>
                                    {/* React */}
                                    <div className="flex flex-col items-center gap-2">
                                        <h1 className="text-lg">React</h1>
                                        <img className="w-15" src={react} alt="react" />
                                        <input type="checkbox" name="frontendTechnologies" value="React" className="checkbox checkbox-primary" />
                                    </div>
                                    {/* Vue */}
                                    <div className="flex flex-col items-center gap-2">
                                        <h1 className="text-lg">Vue</h1>
                                        <img className="w-15" src={vue} alt="vue" />
                                        <input type="checkbox" name="frontendTechnologies" value="Vue" className="checkbox checkbox-primary" />
                                    </div>
                                    {/* Angular */}
                                    <div className="flex flex-col items-center gap-2">
                                        <h1 className="text-lg">Angular</h1>
                                        <img className="w-15" src={angular} alt="angular" />
                                        <input type="checkbox" name="frontendTechnologies" value="Angular" className="checkbox checkbox-primary" />
                                    </div>
                                </div>
                            </div>

                            {/* Backend */}
                            <div class="flex flex-col items-start gap-4">
                                <h2 class="text-xl font-semibold">Backend</h2>
                                <div class="flex gap-6">
                                    {/* Node.js */}
                                    <div class="flex flex-col items-center gap-2">
                                        <h1 class="text-lg">Node.js</h1>
                                        <img class="w-15" src={nodejs} alt="Node.js" />
                                        <input type="checkbox" name="backendTechnologies" value="Node.js" className="checkbox checkbox-primary" />
                                    </div>
                                    {/* Python */}
                                    <div class="flex flex-col items-center gap-2">
                                        <h1 class="text-lg">Python</h1>
                                        <img class="w-15" src={python} alt="python" />
                                        <input type="checkbox" name="backendTechnologies" value="Python" className="checkbox checkbox-primary" />
                                    </div>
                                    {/* Ruby */}
                                    <div class="flex flex-col items-center gap-2">
                                        <h1 class="text-lg">Ruby</h1>
                                        <img class="w-15" src={ruby} alt="ruby" />
                                        <input type="checkbox" name="backendTechnologies" value="Ruby" className="checkbox checkbox-primary" />
                                    </div>
                                </div>
                            </div>

                            {/* Database */}
                            <div class="flex flex-col items-start gap-4">
                                <h2 class="text-xl font-semibold">Baze podataka</h2>
                                <div class="flex gap-6">
                                    {/* Sql */}
                                    <div class="flex flex-col items-center gap-2">
                                        <h1 class="text-lg">SQL</h1>
                                        <img class="w-15" src={sql} alt="sql" />
                                        <input type="checkbox" name="databaseTechnologies" value="SQL" className="checkbox checkbox-primary" />
                                    </div>
                                    {/* MongoDB */}
                                    <div class="flex flex-col items-center gap-2">
                                        <h1 class="text-lg">MongoDB</h1>
                                        <img class="w-15" src={mongodb} alt="mongodb" />
                                        <input type="checkbox" name="databaseTechnologies" value="MongoDB" className="checkbox checkbox-primary" />
                                    </div>
                                    {/* Sql */}
                                    <div class="flex flex-col items-center gap-2">
                                        <h1 class="text-lg">Supabase</h1>
                                        <img class="w-15" src={supa} alt="supabase" />
                                        <input type="checkbox" name="databaseTechnologies" value="Supabase" className="checkbox checkbox-primary" />
                                    </div>
                                </div>
                            </div>

                            {/*Mobile development*/}
                            <div class="flex flex-col items-start gap-4">
                                <h2 class="text-xl font-semibold">Mobilni razvoj</h2>
                                <div class="flex gap-6">
                                    {/* Flutter */}
                                    <div class="flex flex-col items-center gap-2">
                                        <h1 class="text-lg">Flutter</h1>
                                        <img class="w-15" src={flutter} alt="flutter" />
                                        <input type="checkbox" name="mobileDevTechnologies" value="Flutter" className="checkbox checkbox-primary" />
                                    </div>
                                    {/* Java */}
                                    <div class="flex flex-col items-center gap-2">
                                        <h1 class="text-lg">Java</h1>
                                        <img class="w-15" src={java} alt="Java" />
                                        <input type="checkbox" name="mobileDevTechnologies" value="Java" className="checkbox checkbox-primary" />
                                    </div>
                                    {/* Swift */}
                                    <div class="flex flex-col items-center gap-2">
                                        <h1 class="text-lg">Swift</h1>
                                        <img class="w-15" src={swift} alt="swift" />
                                        <input type="checkbox" name="mobileDevTechnologies" value="Swift" className="checkbox checkbox-primary" />
                                    </div>
                                </div>
                            </div>

                            {/* Game development */}
                            <div class="flex flex-col items-start gap-4">
                                <h2 class="text-xl font-semibold">Izrada računalnih igara</h2>
                                <div class="flex gap-6">
                                    {/* Godot */}
                                    <div class="flex flex-col items-center gap-2">
                                        <h1 class="text-lg">GDScript</h1>
                                        <img class="w-15" src={gdscript} alt="gdscript" />
                                        <input type="checkbox" name="gameDevTechnologies" value="GDScript" className="checkbox checkbox-primary" />
                                    </div>
                                    {/* Python */}
                                    <div class="flex flex-col items-center gap-2">
                                        <h1 class="text-lg">C++</h1>
                                        <img class="w-15" src={cpp} alt="cpp" />
                                        <input type="checkbox" name="gameDevTechnologies" value="C++" className="checkbox checkbox-primary" />
                                    </div>
                                    {/* C*/}
                                    <div class="flex flex-col items-center gap-2">
                                        <h1 class="text-lg">C#</h1>
                                        <img class="w-15" src={csharp} alt="csharp" />
                                        <input type="checkbox" name="gameDevTechnologies" value="C#" className="checkbox checkbox-primary" />
                                    </div>
                                </div>
                            </div>

                            {/* Automatization */}
                            <div class="flex flex-col items-start gap-4">
                                <h2 class="text-xl font-semibold">Automatizacija</h2>
                                <div class="flex gap-6">
                                    {/* Puppeteer */}
                                    <div class="flex flex-col items-center gap-2">
                                        <h1 class="text-lg">Puppeteer</h1>
                                        <img class="w-15" src={puppeteer} alt="puppeteer" />
                                        <input type="checkbox" name="automationTechnologies" value="Puppeteer" className="checkbox checkbox-primary" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Iskustvo */}
                        <div class="flex flex-col gap-2">
                            <label class="text-xl font-semibold text-gray-300">
                                Iskustvo
                            </label>
                            <input
                                type="text"
                                name="experience"
                                placeholder="Unesite iskustvo"
                                class="bg-gray-700 text-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Projekti */}
                        <div class="flex flex-col gap-2">
                            <label class="text-xl font-semibold text-gray-300">
                                Projekti
                            </label>
                            <input
                                type="text"
                                name="projects"
                                placeholder="Navedite projekte"
                                class="bg-gray-700 text-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Kontakt */}
                        <div class="flex flex-col gap-2">
                            <label class="text-xl font-semibold text-gray-300">Kontakt</label>
                            <input
                                type="tel"
                                name="contact"
                                placeholder="Unesite kontakt broj"
                                class="bg-gray-700 text-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Submit */}
                        <div class="mt-4">
                            <button
                                type="submit"
                                class="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                Kreirajte portfolio
                            </button>
                        </div>

                        <div class="mt-4">
                            <a href="/portfoliolist">
                                <button
                                    type="submit"
                                    class="w-full bg-orange-600 text-white p-3 rounded-lg hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                >
                                    Pregled portfolia
                                </button>
                            </a>
                        </div>
                        <Show when={success()}>
                            <div class="bg-green-400 text-white p-4 rounded my-5">
                                Portfolio uspješno generiran!
                            </div>
                        </Show>
                        <Show when={error()}>
                        <div class="bg-red-400 text-white p-4 rounded my-5">
                                Potrebna je prijava!
                            </div>
                        </Show>
                    </div>
                </div>
            </form>
        </>
    );
}
