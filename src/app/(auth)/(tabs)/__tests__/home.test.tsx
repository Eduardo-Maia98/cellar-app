
const mockSaveFavorite = jest.fn();
const mockProducts = [
  { id: 1, title: 'Produto 1', image: 'img1', price: 10 },
  { id: 2, title: 'Produto 2', image: 'img2', price: 20 },
];

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockProducts),
  })
) as jest.Mock;

let mockFavoritos: any[] = [];
jest.mock('@/firebase/favoriteItem', () => ({
  getFavoritesByEmail: jest.fn(() => Promise.resolve(mockFavoritos)),
  saveFavorite: jest.fn((id, product, email) => {
    mockFavoritos.push(product);
    return Promise.resolve();
  }),
}));
jest.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({ user: { email: 'test@example.com' } }),
}));
jest.mock('expo-modules-core', () => ({
  EventEmitter: function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
      removeAllListeners: jest.fn(),
    };
  },
  requireNativeModule: jest.fn(),
  requireOptionalNativeModule: jest.fn(),
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

import { fireEvent, render, waitFor } from '@testing-library/react-native';
import HomeScreen from '../home';




describe('HomeScreen', () => {
  beforeEach(() => {
    mockFavoritos = [];
    jest.clearAllMocks();
  })
  it('should only render product 2', async () => {
    const { findByText, getByText, getAllByText, queryByText } = render(<HomeScreen />);
  
    //Exibe os 2 produtos pois nenhum foi adicionado
    await waitFor(() => {
      expect(queryByText('Produto 1')).toBeTruthy();
      expect(queryByText('Produto 2')).toBeTruthy();
    });
    //Garante que tem os 2 botões de favoritar e clica no primeiro, nesse caso, no do mock do produto 1
    const favoriteButtons = getAllByText('Favoritar');
    expect(favoriteButtons.length).toBe(2);
    fireEvent.press(favoriteButtons[0]);

    //Espera que o produto 1 não esteja mais na tela, apenas o 2, pois o 1 foi favoritado
    await waitFor(() => {
      expect(queryByText('Produto 1')).toBeFalsy();
      expect(getByText('Produto 2')).toBeTruthy();
    });
  });


})