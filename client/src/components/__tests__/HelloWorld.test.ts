import { render, screen } from '@testing-library/vue';
import HelloWorld from '../HelloWorld.vue';
import { describe, it, expect } from 'vitest';

describe('HelloWorld', () => {
  it('renders the component', () => {
    render(HelloWorld, { props: { msg: 'Vue is awesome' } });
    expect(screen.getByText(/Vue is awesome/i)).toBeInTheDocument();
  });
});
