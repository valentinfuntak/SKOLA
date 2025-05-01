import { A, useNavigate } from "@solidjs/router";
import { useAuth } from "../components/AuthProvider";
import { Show } from "solid-js";
import { pb } from "../services/pocketbase";

import userLogo from "../assets/Ikone/user.jpg";

export default function MainLayout(props) {
  const appName = import.meta.env.VITE_APP_NAME;
  const session = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      pb.authStore.clear();
      navigate("/");
    } catch (error) {
      alert("Nažalost Vas ne možemo odjaviti: " + error.message);
    }
  };

  return (
    <>
      <div className="navbar bg-base-200">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              class="menu menu-sm dropdown-content bg-base-200 rounded-box z-10 mt-4 w-52 p-2 "
            >
              <li><a href="/" class=" text-xl">Početna</a></li>
              <li><a href="/portfoliolist" class=" text-xl">Pregled</a></li>
              <li><a href="/portfolioform" class=" text-xl">Izrada</a></li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-3xl">{appName}</a>
        </div>
        <div className="navbar-end">
          <Show when={!session()}>
            <A href="/signin" class="bg-indigo-600 p-2 rounded hover:bg-indigo-500 text-xl">Prijava</A>
          </Show>

          <Show when={session()}>
            <div className="ml-2 dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Korisnički avatar"
                    src={userLogo} />
                </div>
              </div>
              <ul tabIndex={0} class="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-4 w-52 p-2 shadow text-center">
                <li><a href="/account" className="justify-between text-xl">Račun</a></li>
                <li><a href="/settings" class="text-xl">Postavke</a></li>
                <button onClick={handleLogout} class="bg-indigo-600 p-2 rounded hover:bg-indigo-500 text-xl mt-1">Odjava</button>
              </ul>
            </div>
          </Show>
        </div>
      </div>

      <div class="min-h-[75vh] w-10/12 mx-auto">
        {props.children}
      </div>

      <footer className="footer sm:footer-horizontal bg-base-300 text-base-content p-10 flex flex-col md:flex-row justify-between items-center">
        <aside className="text-center md:text-left">
          <p>Copyright © {new Date().getFullYear()} - All rights reserved by Valentin Funtak</p>
        </aside>
        <nav className="flex justify-center md:justify-end">
          <a href="https://github.com/valentinfuntak">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40" viewBox="0 0 50 50" style={{ fill: "#FFFFFF" }}>
              <path d="M17.791,46.836C18.502,46.53,19,45.823,..."></path>
            </svg>
          </a>
        </nav>
      </footer>
    </>
  );
}
