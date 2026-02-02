import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ReactElement, ReactNode } from 'react';
import { ThemeProvider, FavoritesProvider, TripProvider } from '../contexts';

interface WrapperProps {
  children: ReactNode;
}

const AllProviders = ({ children }: WrapperProps) => {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <TripProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </TripProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
