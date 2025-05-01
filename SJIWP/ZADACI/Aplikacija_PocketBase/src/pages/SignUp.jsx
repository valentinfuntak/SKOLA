import { useNavigate, A } from "@solidjs/router";
import { createSignal } from 'solid-js';
import { pb } from "../services/pocketbase";

function SignUp(props) {
  const navigate = useNavigate();

  const [result, setResult] = createSignal({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',  // Dodano polje za ime
    error: '',
    loading: false,
    success: false
  });

  const handleRegistration = async (e) => {
    e.preventDefault();
    setResult({ ...result(), loading: true, error: '', success: false });

    if (result().password !== result().confirmPassword) {
      setResult({ ...result(), error: 'Lozinke se ne poklapaju!', loading: false });
      return;
    }

    if (!result().name) {
      setResult({ ...result(), error: 'Ime je obavezno!', loading: false });
      return;
    }

    try {
      const userData = {
        email: result().email,
        password: result().password,
        passwordConfirm: result().confirmPassword,
        name: result().name,  // Dodano ime korisnika
      };

      await pb.collection('users').create(userData);

      setResult({ ...result(), success: true, loading: false });
      console.log('Korisnik uspješno registriran');

      navigate('/signin');
    } catch (err) {
      const message = err?.response?.message || err?.message || 'Došlo je do pogreške pri registraciji.';
      setResult({ ...result(), error: message, loading: false });
    }
  };

  return (
    <section className="bg-base-200">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
              Registracija
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleRegistration}>
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">
                  Ime
                </label>
                <input
                  type="text"
                  id="name"
                  className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Vaše ime"
                  value={result().name}
                  onInput={(e) => setResult({ ...result(), name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="name@company.com"
                  value={result().email}
                  onInput={(e) => setResult({ ...result(), email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">
                  Lozinka
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  value={result().password}
                  onInput={(e) => setResult({ ...result(), password: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-white">
                  Potvrdite lozinku
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  value={result().confirmPassword}
                  onInput={(e) => setResult({ ...result(), confirmPassword: e.target.value })}
                  required
                />
              </div>

              {result().error && (
                <div className="text-red-500 text-sm">{result().error}</div>
              )}
              {result().success && (
                <div className="text-green-500 text-sm">Račun uspješno registriran! Preusmjeravam na prijavu...</div>
              )}
              <button
                type="submit"
                className="w-full bg-indigo-700 hover:bg-indigo-600 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                disabled={result().loading}
              >
                {result().loading ? 'Registracija...' : 'Registracija'}
              </button>
              <p className="text-sm font-light text-white">
                Već imate račun?{" "}
                <A href="/signin" className="text-white hover:text-info font-medium hover:underline">
                  Prijavite se ovdje.
                </A>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
