// the css required by
import '../scss/main.scss';
// the code
import * as React from 'react';
import { render } from 'react-dom';
import { main } from './DOMElements';

import Content from './components/content';

render(<Content />, main);
