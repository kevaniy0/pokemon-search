import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeSwitch } from '@/components/ThemeSwitch';
import { useTheme } from '@/hooks/useTheme';

vi.mock('@/hooks/useTheme', () => ({
  useTheme: vi.fn(),
}));

describe('ThemeSwitch', () => {
  const user = userEvent.setup();
  const mockToggleTheme = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });
  describe('When theme is Light', () => {
    beforeEach(() => {
      vi.mocked(useTheme).mockReturnValue({
        theme: 'light',
        toggleTheme: mockToggleTheme,
      });
    });
    it('should render sun and moon icons with light theme colors', () => {
      render(<ThemeSwitch />);
      const sunIcon = screen.getByTestId('sun-icon-test');
      const moonIcon = screen.getByTestId('moon-icon-test');
      expect(sunIcon).toBeInTheDocument();
      expect(moonIcon).toBeInTheDocument();
      expect(sunIcon).toHaveAttribute('fill', '#212121');
      expect(moonIcon).toHaveAttribute('fill', '#212121');
    });
    it('should unchecked checkbox', () => {
      render(<ThemeSwitch />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();
    });
    it('should bubble on the left position', () => {
      render(<ThemeSwitch />);
      const bubble = screen.getByTestId('bubble-test');
      expect(bubble).toHaveClass('left-[2px]');
      expect(bubble).not.toHaveClass('left-[59px]');
    });
    it('should call toggleTheme when checkbox is clicked', async () => {
      render(<ThemeSwitch />);
      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);
      expect(mockToggleTheme).toHaveBeenCalledTimes(1);
    });
  });
  describe('When theme is dark', () => {
    beforeEach(() => {
      vi.mocked(useTheme).mockReturnValue({
        theme: 'dark',
        toggleTheme: mockToggleTheme,
      });
    });
    it('should render moon and sun icons with dark colors', () => {
      render(<ThemeSwitch />);
      const sun = screen.getByTestId('sun-icon-test');
      const moon = screen.getByTestId('moon-icon-test');
      expect(sun).toHaveAttribute('fill', '#f1f1f1');
      expect(moon).toHaveAttribute('fill', '#f1f1f1');
    });
    it('should checked checkbox', () => {
      render(<ThemeSwitch />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
    });
    it('should bubble on the right position', () => {
      render(<ThemeSwitch />);
      screen.debug();
      const bubble = screen.getByTestId('bubble-test');
      expect(bubble).toHaveClass('left-[59px]');
      expect(bubble).not.toHaveClass('left-[2px]');
    });
    it('should call toggleTheme when checkbox is clicked', async () => {
      render(<ThemeSwitch />);
      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);
      expect(mockToggleTheme).toHaveBeenCalledTimes(1);
    });
  });
});
