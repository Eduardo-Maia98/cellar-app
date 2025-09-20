

const mockProducts = [
  { id: 1, title: 'Produto 1', image: 'img1', price: 10 },
  { id: 2, title: 'Produto 2', image: 'img2', price: 20 },
];

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockProducts),
  })
) as jest.Mock;

jest.mock('@/firebase/favoriteItem', () => ({
  getFavoritesByEmail: jest.fn(() => Promise.resolve([])),
  saveFavorite: jest.fn(),
}));
jest.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({ user: { email: 'test@example.com' } }),
}));
jest.mock('expo-modules-core', () => ({
  EventEmitter: jest.fn(),
}));
let mockFocusEffectCallback: any;
jest.mock('expo-router', () => ({
  useFocusEffect: (cb: any) => {
    if (!mockFocusEffectCallback) {
      mockFocusEffectCallback = cb;
      cb && cb();
    }
  },
}));
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import HomeScreen from '../home';



describe('HomeScreen', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockProducts),
      })
    ) as jest.Mock;
  });

  it('should only render product 2', async () => {
    render(<HomeScreen />);


    await waitFor(() => {
      expect(screen.queryByTestId('loading-indicator')).toBeNull();
    },{ timeout: 5000 });

    //Garante que tem os 2 botões de favoritar e clica no primeiro, nesse caso, no do mock do produto 1
    await waitFor(() => {
      screen.debug()
      const favoriteButtons = screen.getAllByText(/Favoritar/i);
      expect(favoriteButtons.length).toBe(2);
      fireEvent.press(favoriteButtons[0]);
    });
    //Espera que o produto 1 não esteja mais na tela, apenas o 2, pois o 1 foi favoritado
    await waitFor(() => {
      expect(screen.queryByText(/Produto 1/)).toBeFalsy();
      expect(screen.queryByText(/Produto 2/)).toBeTruthy();
    });
  });


})