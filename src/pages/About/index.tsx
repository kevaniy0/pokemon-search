const AboutPage = () => {
  return (
    <section className="flex flex-col justify-between max-w-4xl mx-auto px-6 text-xDark dark:text-xLight h-[100%] font-[400] mb-5">
      <p className="text-lg leading-relaxed mb-6">
        This app allows you to search for Pokémon by name, view their images and
        stats, and manage your search history. It uses the{' '}
        <span className="font-semibold">PokéAPI</span> - a free public API that
        provides detailed Pokémon data.
      </p>
      <h2 className="text-[20px] font-bold text-xDark dark:text-xLight mb-1">
        Stack:
      </h2>
      <ul className="list-disc list-inside space-y-1 font-[600] text-lg  mb-4">
        <li>React</li>
        <li>TypeScript</li>
        <li>
          Vite <span className="font-normal">(project bundler)</span>
        </li>
        <li>
          Tailwind CSS <span className="font-normal">(styling)</span>
        </li>
        <li>
          GitHub Pages <span className="font-normal">(deployment)</span>
        </li>
        <li>
          localStorage{' '}
          <span className="font-normal">(saving search history)</span>
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
          <span className="font-semibold">Search</span>. (
          <span className="underline underline-offset-2">
            {"You can use numbers from 1 to 1025 if you don't know the names"}
          </span>
          )
        </li>
        <li>
          If the Pokémon exists, its card with image and details will appear.
        </li>
        <li>
          Your previous searches are saved in{' '}
          <span className="font-semibold">localStorage</span> so you can revisit
          them anytime.
        </li>
      </ul>
    </section>
  );
};

export default AboutPage;
