import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Blog from 'src/components/Blog';

const rootComponent = (
  <BrowserRouter>
    <Blog />
  </BrowserRouter>
);

const target = document.getElementById('root');

render(rootComponent, target);
