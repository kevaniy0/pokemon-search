import Header from './components/Header';
import { Route, Routes } from 'react-router';
import HomePage from './pages/Home';
import Footer from './components/Footer';
import { githubLink } from './components/Footer/footer-data';
import logo from 'assets/Github-desktop-logo-symbol.svg.png';
import AboutPage from './pages/About';

const App = () => {
  return (
    <div className="container mx-auto flex flex-col h-[100vh]">
      <Header />
      <main className="flex flex-col flex-1 items-center">
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </main>
      <Footer link={githubLink} image={logo} />
    </div>
  );
};

export default App;
