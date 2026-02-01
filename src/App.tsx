import Header from './components/Header';
import { Navigate, Route, Routes } from 'react-router';
import HomePage from './pages/Home';
import Footer from './components/Footer';
import { githubLink } from './components/Footer/footer-data';
import logo from 'assets/Github-desktop-logo-symbol.svg.png';
import pokemonLogo from 'assets/pokemon-logo.svg';
import AboutPage from './pages/About';
import { HomeLayout } from './pages/Home/HomeLayout';
import { NotFoundPage } from './pages/404';
import CardDescription from './components/CardDescription';

const App = () => {
  return (
    <div className="container mx-auto flex flex-col h-[100vh]">
      <Header name="Pokémon Search" logo={pokemonLogo} />
      <main className="flex flex-col flex-1 items-center">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomeLayout />}>
            <Route path=":page" element={<HomePage />}>
              <Route path="pokemon/:name" element={<CardDescription />} />
            </Route>
          </Route>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer link={githubLink} image={logo} />
    </div>
  );
};

export default App;
