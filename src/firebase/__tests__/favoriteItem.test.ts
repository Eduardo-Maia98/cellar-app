import * as favoriteItem from '../favoriteItem';

jest.mock('@react-native-firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  doc: jest.fn(),
  setDoc: jest.fn(),
  getDocs: jest.fn(),
  deleteDoc: jest.fn(),
}));

describe('favoriteItem Firebase functions', () => {
  it('should call setDoc when saving a favorite', async () => {
    const setDoc = require('@react-native-firebase/firestore').setDoc;
    setDoc.mockResolvedValueOnce(undefined);
    await favoriteItem.saveFavorite('1', { foo: 'bar' }, 'test@email.com');
    expect(setDoc).toHaveBeenCalled();
  });

  it('should call deleteDoc when removing a favorite', async () => {
    const deleteDoc = require('@react-native-firebase/firestore').deleteDoc;
    deleteDoc.mockResolvedValueOnce(undefined);
    await favoriteItem.removeFavorite(1, 'test@email.com');
    expect(deleteDoc).toHaveBeenCalled();
  });
});
