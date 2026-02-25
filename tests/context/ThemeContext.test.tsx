import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@/contexts/ThemeProvider';
import { useTheme } from '@/hooks/useTheme';

const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme-value">{theme}</span>
      <button onClick={toggleTheme} data-testid="toggle-button">
        Toggle
      </button>
    </div>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });
  it('should provide default theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    const span = screen.getByTestId('theme-value');
    expect(span).toHaveTextContent('light');
    expect(document.documentElement).not.toHaveClass('dark');
  });
  it('should load theme value from localStorage', () => {
    localStorage.setItem('PokemonAppTheme', 'dark');
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    const span = screen.getByTestId('theme-value');
    expect(span).toHaveTextContent('dark');
    expect(document.documentElement).toHaveClass('dark');
  });
  it('should toggle theme when click button', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    const span = screen.getByTestId('theme-value');
    const button = screen.getByTestId('toggle-button');
    await user.click(button);

    expect(span).toHaveTextContent('dark');
    expect(localStorage.getItem('PokemonAppTheme')).toBe('dark');
    expect(document.documentElement).toHaveClass('dark');

    await user.click(button);
    expect(span).toHaveTextContent('light');
    expect(localStorage.getItem('PokemonAppTheme')).toBe('light');
    expect(document.documentElement).not.toHaveClass('dark');
  });
});
