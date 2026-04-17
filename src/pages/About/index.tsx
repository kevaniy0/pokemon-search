const AboutPage = () => {
  return (
    <section className="flex flex-col justify-between max-w-4xl mx-auto px-6 text-xDark dark:text-xLight h-[100%] font-[400] mb-5">
      <p className="text-lg leading-relaxed mb-6">
        This app allows you to search for Pokémon by name, view their images and
        stats. It uses the <span className="font-semibold">PokéAPI</span> - a
        free public API that provides detailed Pokémon data.
      </p>
      <h2 className="text-[20px] font-bold text-xDark dark:text-xLight mb-1">
        Stack:
      </h2>
      <ul className="list-disc list-inside space-y-1 font-[600] text-lg  mb-4">
        <li>React</li>
        <li>TypeScript</li>
        <li>
          Redux Toolkit{' '}
          <span className="font-normal">(global state management)</span>
        </li>
        <li>
          RTK Query <span className="font-normal">(API calls and cache)</span>
        </li>
        <li>
          React Router{' '}
          <span className="font-normal">
            (client-side routing and navigation)
          </span>
        </li>
        <li>
          Context API{' '}
          <span className="font-normal">
            (Theme management with `useContext`)
          </span>
        </li>
        <li>
          Vite <span className="font-normal">(project bundler)</span>
        </li>
        <li>
          Tailwind CSS <span className="font-normal">(styling)</span>
        </li>
        <li>
          Vercel <span className="font-normal">(deployment)</span>
        </li>
        <li>
          Eslint, Prettier, Husky{' '}
          <span className="font-normal">(code quality and formatting)</span>
        </li>
        <li>
          Vitest, React Testing Library{' '}
          <span className="font-normal">(testing)</span>
        </li>
      </ul>
      <h2 className="text-2xl font-bold text-xDark dark:text-xLight mb-4">
        How to use:
      </h2>
      <ul className="list-disc list-inside space-y-3 text-lg">
        <li>
          Type a Pokémon name into the search bar and click{' '}
          <span className="font-semibold">Search</span>.
        </li>
        <li>
          If the Pokémon exists, its card with image and details will appear.
        </li>
        <li>Click on the card to open the description.</li>
        <li>
          Select pokemons to download additional information about them in a CSV
          file.
        </li>
      </ul>
    </section>
  );
};

export default AboutPage;
