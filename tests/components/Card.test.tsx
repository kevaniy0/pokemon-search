import { render, screen } from '@testing-library/react';
import Card from 'src/components/Card';
import { mockPokemon } from 'tests/__mocks__/pokemon';

describe('Card', () => {
  const { abilities, height, name, sprites, types, weight } = mockPokemon;
  const abils = abilities.map((item) => item.ability.name).join(', ');
  const type = types.map((item) => item.type.name).join(', ');
  it('should render component with correct description', () => {
    render(
      <Card
        abilities={abils}
        height={height}
        name={name}
        pic={sprites.front_default}
        type={type}
        weight={weight}
      />
    );
    const abilitiesElement = screen.getByText(abils);
    expect(abilitiesElement).toBeInTheDocument();

    const heightElement = screen.getByText(height);
    expect(heightElement).toBeInTheDocument();

    const nameElement = screen.getByText(name);
    expect(nameElement).toBeInTheDocument();

    const picElement = screen.getByTestId(`pokemon-pic-id-${name}`);
    expect(picElement).toBeInTheDocument();
    expect(picElement).toHaveStyle(
      `background-image: url(${sprites.front_default})`
    );

    const typeElement = screen.getByText(type);
    expect(typeElement).toBeInTheDocument();

    const weightElement = screen.getByText(weight);
    expect(weightElement).toBeInTheDocument();
  });
  it('should handle missing props gracefully', () => {
    render(<Card name="" abilities="" type="" height={0} weight={0} pic="" />);

    const abilitiesElement = screen.getByTestId(`pokemon-abilities-id-`);
    expect(abilitiesElement).toBeEmptyDOMElement();

    const heightElement = screen.getByTestId(`pokemon-height-id-0`);
    expect(heightElement).toHaveTextContent('0');

    const nameElement = screen.getByTestId(`pokemon-name-id-`);
    expect(nameElement).toBeEmptyDOMElement();

    const picElement = screen.getByTestId(`pokemon-pic-id-`);
    expect(picElement).toHaveStyle(`background-image: url("")`);

    const typeElement = screen.getByTestId(`pokemon-type-id-`);
    expect(typeElement).toBeEmptyDOMElement();

    const weightElement = screen.getByTestId(`pokemon-weight-id-0`);
    expect(weightElement).toHaveTextContent('0');
  });
});
