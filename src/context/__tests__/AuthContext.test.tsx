jest.mock('expo-linking', () => ({
  select: jest.fn(),
}));
jest.mock('expo-constants', () => ({
  manifest: {},
  appOwnership: 'standalone',
}));

jest.mock('expo-modules-core', () => ({
  EventEmitter: function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
      removeAllListeners: jest.fn(),
    };
  },
  requireOptionalNativeModule: jest.fn(),
  requireNativeModule: jest.fn()
}));
import { render } from '@testing-library/react-native';
import { AuthContext, AuthProvider } from '../AuthContext';



describe('AuthContext', () => {
  it('provides user and methods', () => {
    const TestComponent = () => (
      <AuthContext.Consumer>
        {({ user, signIn, signUp, logout }) => (
          <>
            <span>{user ? 'logged' : 'not-logged'}</span>
            <button onClick={() => signUp('a', 'b')}>SignUp</button>
            <button onClick={() => signIn('a', 'b')}>SignIn</button>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </AuthContext.Consumer>
    );
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
  });
});
