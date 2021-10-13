import React from 'react';
import { render } from '@testing-library/react';

import Spinner from './spinner';

describe('<Spinner />', () => {
  test('basic render', () => {
    render(<Spinner />);
  });
});
