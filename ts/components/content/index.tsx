import * as React from 'react';
import { IContentProps, IContentState } from './interfaces';

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
          this is header
        </div>
        <div className="footer">
          this is floor
        </div>
      </div>
    );
  }
}
