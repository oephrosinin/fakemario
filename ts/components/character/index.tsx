import * as React from 'react';
import { ICharProps, ICharState } from './interfaces';
import {
  TOUCH_BRAKING,
  TOUCH_ACCELERATION,
  KEY_PRESS_DELAY,
  BRAKING_DELAY,
  MAX_SPEED ,
} from '../../utils/constants';

export default class Character extends React.Component<ICharProps, ICharState> {

  private lastMove;
  private moveBreakTimer;
  private movingInterval;
  private breakingInterval;

  constructor(props: ICharProps) {
    super(props);

    this.state = {
      speed: 0,
      position: 0,
      direction: null,
    };
  }

  componentDidMount() {
    this._applyMoves();
  }

  componentWillUnmount() {
    //
  }

  render() {
    const {position, speed} = this.state;
    console.log('position', position, 'speed', speed);
    return (
      <div className="person-block" ref="mario" style={{left: position}}>
        mario
      </div>
    );
  }

  _clearBreakingInterval() {
    if (this.breakingInterval) {
      clearInterval(this.breakingInterval);
    }
  }

  _clearMovingInterval() {
    if (this.movingInterval) {
      clearInterval(this.movingInterval);
    }
  }

  _isStopped() {
    return this.state.speed === 0;
  }

  _decreaseSpeed(newDirection = this.state.direction) {
    let {speed, direction} = this.state;
    if (!speed) {
      speed = TOUCH_ACCELERATION;
    }
    if (speed <= TOUCH_BRAKING) {
      speed = 0;
    } else {
      speed -= TOUCH_BRAKING;
    }

    if (speed === 0) {
      // Check and try to clear interval
      this._clearBreakingInterval();
      direction = newDirection;
    }

    console.log('_decreaseSpeed', speed, direction, this.state.direction);
    this.setState({speed, direction});
  }

  _increaseSpeed() {
    let {speed} = this.state;
    if (!speed || speed < MAX_SPEED - TOUCH_ACCELERATION) {
      speed += TOUCH_ACCELERATION;
    } else {
      speed = MAX_SPEED;
      console.log('max speed, sonne', speed);
    }

    // console.log('_increaseSpeed', speed);
    this.setState({speed});
  }

  _applyAccelerationTouch(direction = 'ahead') {
    if (!this.lastMove || this.lastMove === direction || this._isStopped()) {
      // speed += TOUCH_ACCELERATION;
      this._increaseSpeed();
      return this.lastMove = direction;
    }

    // Decrease speed
    return this._decreaseSpeed(direction);
  }

  _applySimpleTimer() {
    if (this.moveBreakTimer) {
      console.log('cleaned interval');
      clearTimeout(this.moveBreakTimer);
    }
    this.moveBreakTimer = setTimeout(() => {
      this._decreaseSpeed();

      // Apply break
      this.breakingInterval = setInterval(() => {
        if (this._isStopped()) {
          this._clearBreakingInterval();
        } else {
          this._decreaseSpeed();
        }
      }, 25);

    }, KEY_PRESS_DELAY);
  }

  _moveAhead() {
    // console.log('move ahead');
    this._applyAccelerationTouch('ahead');
    this._applySimpleTimer();
  }

  _moveBack() {
    // console.log('move back');
    this._applyAccelerationTouch('back');
    this._applySimpleTimer();
  }

  _jump() {
    console.log('jump');
  }

  _applyMoves() {
    document.onkeydown = (({key}) => {
      switch (key) {
        case 'ArrowUp':
          return this._jump();
        case 'ArrowLeft':
          return this._moveBack();
        case 'ArrowRight':
          return this._moveAhead();
      }
    });

    if (!this._isStopped()) {
      let {position} = this.state;
      setInterval(() => {
        const delta = this.state.speed / (1000 / BRAKING_DELAY);
        position -= delta;
        this.setState({position});
      }, BRAKING_DELAY);
    } else {
      this._clearMovingInterval();
    }
  }
}
