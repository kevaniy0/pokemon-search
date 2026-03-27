import getPokemon from '@/services/PokemonAPI-OLD';
import HttpError from '@/services/HttpError';
import { mockPokemon } from 'tests/__mocks__/pokemon';

describe('getPokemon', () => {
  const data = mockPokemon;
  beforeEach(() => {
    vi.resetAllMocks();
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
  describe('successful requests', () => {
    it('should fetch pokemon data successfully', async () => {
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => data,
      } as Response);
      const result = await getPokemon('spearow');
      expect(result).toEqual(data);
      expect(fetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/spearow'
      );
      expect(fetch).toHaveBeenCalledTimes(1);
    });
    it('should trim amd lowercase the pokemon name', async () => {
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => data,
      } as Response);
      await getPokemon('  PIKAchu  ');

      expect(fetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/pikachu'
      );
    });
  });
  describe('error handling - HTTP errors', () => {
    it('should throw HttpError with 404 status', async () => {
      vi.mocked(fetch).mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      } as Response);

      await expect(getPokemon('unknown')).rejects.toThrow(HttpError);
      await expect(getPokemon('unknown')).rejects.toMatchObject({
        status: 404,
        message: 'Pokemon not found',
      });
    });
    it('should throw HttpError with 400 status', async () => {
      vi.mocked(fetch).mockResolvedValue({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
      } as Response);

      await expect(getPokemon('invalid')).rejects.toMatchObject({
        status: 400,
        message: 'Bad Request',
      });
    });
    it('should throw HttpError with other status codes', async () => {
      vi.mocked(fetch).mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Server Error',
      } as Response);

      await expect(getPokemon('error')).rejects.toMatchObject({
        status: 500,
        message: 'Server Error',
      });
    });
  });
  describe('error handling - network errors', () => {
    it('should handle network errors', async () => {
      vi.mocked(fetch).mockRejectedValue(new Error('Network error'));
      await expect(getPokemon('pikachu')).rejects.toMatchObject({
        status: 0,
        message: 'Network error',
      });
    });
  });

  it('should handle non-Error network failures', async () => {
    vi.mocked(fetch).mockRejectedValue('String error');

    await expect(getPokemon('pikachu')).rejects.toMatchObject({
      status: 0,
      message: 'Unknown network error',
    });
  });

  it('should preserve original HttpError', async () => {
    const originalError = new HttpError(404, 'Custom error');
    vi.mocked(fetch).mockRejectedValue(originalError);

    await expect(getPokemon('pikachu')).rejects.toBe(originalError);
  });
  describe('offline handling', () => {
    const originalOnLine = navigator.onLine;

    beforeEach(() => {
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        configurable: true,
        value: true,
      });
    });

    afterEach(() => {
      Object.defineProperty(navigator, 'onLine', {
        value: originalOnLine,
      });
    });

    it('should throw no internet connection error when offline', async () => {
      Object.defineProperty(navigator, 'onLine', { value: false });

      vi.mocked(fetch).mockRejectedValue(new Error('Network error'));

      await expect(getPokemon('pikachu')).rejects.toMatchObject({
        status: 0,
        message: 'No internet connection',
      });
    });

    it('should handle fetch error when online', async () => {
      Object.defineProperty(navigator, 'onLine', { value: true });

      vi.mocked(fetch).mockRejectedValue(new Error('Network error'));

      await expect(getPokemon('pikachu')).rejects.toMatchObject({
        status: 0,
        message: 'Network error',
      });
    });
  });
});
