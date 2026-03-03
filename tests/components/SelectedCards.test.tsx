import { SelectedCards } from '@/components/SelectedCards';
import { render, screen } from '@testing-library/react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import userEvent from '@testing-library/user-event';
import { resetItems } from '@/store/cards/cardsSlice';
import { validatePokemonData } from '@/utils/validateData';

vi.mock('@/store/hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));
vi.mock('@/utils/validateData', () => ({
  validatePokemonData: vi.fn(),
}));

describe('SelectedCards Component', () => {
  const mockDispatch = vi.fn();
  const user = userEvent.setup();
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
    localStorage.clear();
  });
  it('should return null when no cards selected', () => {
    vi.mocked(useAppSelector).mockReturnValue([]);

    const { container } = render(<SelectedCards />);
    expect(container).toBeEmptyDOMElement();
  });
  it('should render component when cards are selected', () => {
    vi.mocked(useAppSelector).mockReturnValue(['pikachu', 'bulbasaur']);
    render(<SelectedCards />);
    const component = screen.queryByTestId('selected-cards');
    expect(component).toBeInTheDocument();
    expect(screen.getByText('You have selected 2 cards')).toBeInTheDocument();
  });
  it('should display correct text for single card', () => {
    vi.mocked(useAppSelector).mockReturnValue(['pikachu']);

    render(<SelectedCards />);

    expect(screen.getByText('You have selected 1 card')).toBeInTheDocument();
  });
  it('should render both buttons', () => {
    vi.mocked(useAppSelector).mockReturnValue(['pikachu']);

    render(<SelectedCards />);

    expect(screen.getByText('Unselect all')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
  });
  it('should unselect all cards when button is clicked', async () => {
    vi.mocked(useAppSelector).mockReturnValue(['pikachu', 'bulbasaur']);

    render(<SelectedCards />);

    const button = screen.getByText('Unselect all');
    await user.click(button);

    expect(mockDispatch).toHaveBeenCalledWith(resetItems());
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
});
describe('Download Functionality', () => {
  const user = userEvent.setup();
  const mockData = [
    {
      name: 'pikachu',
      types: [{ type: { name: 'electric' } }],
      height: 4,
      weight: 60,
      pic: 'image-url',
    },
    {
      name: 'spearow',
      types: [{ type: { name: 'electric' } }],
      height: 4,
      weight: 60,
      pic: 'image-url',
    },
  ];
  const originalCreateElement = document.createElement.bind(document);
  const mockLink = document.createElement('a');
  const clickSpy = vi.spyOn(mockLink, 'click').mockImplementation(() => {});
  beforeEach(() => {
    localStorage.clear();
    global.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
    global.URL.revokeObjectURL = vi.fn();
    vi.mocked(useAppSelector).mockReturnValue(['pikachu', 'spearow']);
    vi.spyOn(document, 'createElement').mockImplementation(
      (tagName: string) => {
        if (tagName === 'a') return mockLink;
        return originalCreateElement(tagName);
      }
    );
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create CSV file with correct headers and data', async () => {
    localStorage.setItem('searchHistory', JSON.stringify(mockData));
    vi.mocked(validatePokemonData).mockReturnValue(true);

    render(<SelectedCards />);

    const button = screen.getByText(/download/i);
    expect(button).toBeInTheDocument();

    await user.click(button);
    expect(mockLink.download).toBe('2selectedCards.csv');
    expect(mockLink.href).toBe('blob:mock-url');
    expect(clickSpy).toHaveBeenCalledTimes(1);
    expect(global.URL.createObjectURL).toHaveBeenCalled();
  });

  it('should not download when localStorage is empty', async () => {
    vi.mocked(validatePokemonData).mockReturnValue(true);

    render(<SelectedCards />);

    await user.click(screen.getByText(/download/i));

    expect(clickSpy).not.toHaveBeenCalled();
    expect(global.URL.createObjectURL).not.toHaveBeenCalled();
  });
  it('should throw an error when validateData return false', async () => {
    vi.mocked(validatePokemonData).mockReturnValue(false);
    localStorage.setItem('searchHistory', JSON.stringify(mockData));

    const createObjectURLSpy = vi.spyOn(global.URL, 'createObjectURL');
    const revokeObjectURLSpy = vi.spyOn(global.URL, 'revokeObjectURL');

    const uncaughtHandler = (error: Error) => {
      expect(error.message).toBe('Error Parse Data');
    };
    process.on('uncaughtException', uncaughtHandler);

    const rejectionHandler = (event: PromiseRejectionEvent) => {
      expect(event.reason.message).toBe('Error Parse Data');
      event.preventDefault();
    };
    window.addEventListener('unhandledrejection', rejectionHandler);

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<SelectedCards />);

    await user.click(screen.getByText(/download/i));

    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(validatePokemonData).toHaveBeenCalled();
    expect(createObjectURLSpy).not.toHaveBeenCalled();
    expect(revokeObjectURLSpy).not.toHaveBeenCalled();

    createObjectURLSpy.mockRestore();
    revokeObjectURLSpy.mockRestore();
    process.removeListener('uncaughtException', uncaughtHandler);
    window.removeEventListener('unhandledrejection', rejectionHandler);
    consoleSpy.mockRestore();
  });
});
