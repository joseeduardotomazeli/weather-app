import { render, screen } from '@testing-library/react';

import Header from './shared/Header';
import Address from './shared/Address';

describe('App', () => {
  it(`should render heading text, refresh button and today's date formatted`, () => {
    render(<Header />);

    const date = new Date();

    const dateFormatted = date.toLocaleDateString('pt-br', {
      weekday: 'long',
      day: 'numeric',
      month: 'numeric',
    });

    expect(screen.getByText('Builders | Weather app')).toBeInTheDocument();
    expect(screen.getByTestId('refresh-button')).toBeInTheDocument();
    expect(screen.getByText(dateFormatted)).toBeInTheDocument();
  });

  it('should render address', async () => {
    render(
      <Address
        address={{
          street: 'Rua Otto Benz',
          houseNumber: '569',
          city: 'Ribeirão Preto',
        }}
      />
    );

    expect(screen.getByText('📍 Rua Otto Benz - 569,')).toBeInTheDocument();
    expect(screen.getByText('Ribeirão Preto')).toBeInTheDocument();
  });
});
