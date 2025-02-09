import { HashRouter, Route} from "@solidjs/router";
import { AuthProvider} from "./backend/AuthProvider.jsx";

import MainLayout from "./layouts/MainLayout.jsx";
import RegLogLayout from "./layouts/RegLogLayout.jsx";

import SignUp from "./pages/SignUp.jsx"
import SignIn from "./pages/SignIn.jsx"
import Home from "./pages/Home.jsx";
import Account from "./pages/Account.jsx";
import Settings from "./pages/Settings.jsx";
import PortfolioForm from "./pages/PortfolioForm.jsx";
import PortfolioList from "./pages/PortfolioList.jsx";
import Portfolio from "./pages/Portfolio.jsx";

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Route path="/signup" component={() => (<RegLogLayout><SignUp /></RegLogLayout>)} />
        <Route path="/signin" component={() => (<RegLogLayout><SignIn /></RegLogLayout>)} />
        <Route path="/" component={() => (<MainLayout><Home /></MainLayout>)} />
        <Route path="/account" component={() => (<MainLayout><Account /></MainLayout>)} />
        <Route path="/settings" component={() => (<MainLayout><Settings /></MainLayout>)} />
        <Route path="/portfolioform" component={() => (<MainLayout><PortfolioForm /></MainLayout>)} />
        <Route path="/portfoliolist" component={() => (<MainLayout><PortfolioList /></MainLayout>)} />
        <Route path="/portfolio/:id" component={() => (<MainLayout><Portfolio /></MainLayout>)} />
      </HashRouter>
    </AuthProvider>
  );
}