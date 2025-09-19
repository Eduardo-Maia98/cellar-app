import { fireEvent, render } from '@testing-library/react-native';
import ProductCard from '../ProductCard';

describe('ProductCard', () => {
  it('should render product info and handle favorite', () => {
    const product = { id: '1', title: 'Test', price: 10, image: 'img' };
    const onFavorite = jest.fn();
    const { getByText } = render(
      <ProductCard product={product} onFavorite={onFavorite} />
    );
    expect(getByText('Test')).toBeTruthy();
    fireEvent.press(getByText('Favoritar'));
    expect(onFavorite).toHaveBeenCalled();
  });
});
