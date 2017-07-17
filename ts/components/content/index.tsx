import * as React from 'react';
import { IContentProps, IContentState } from './interfaces';

import Character from '../character';

export default class Content extends React.Component<IContentProps, IContentState> {

  constructor(props: IContentProps) {
    super(props);
  }

  componentDidMount() {
    //
  }

  componentWillUnmount() {
    //
  }

  render() {
    return (
      <div className="game-wrapper">
        <div className="header">
          this is header1
          <Character />
        </div>
        <div className="footer">
          this is floor
        </div>
      </div>
    );
  }
}
