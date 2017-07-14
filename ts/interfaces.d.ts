/**
 * What we expect when we try to render settings
 */
export interface ISettingsModalProps {}

export interface ISettingsModalState {
  options: any;
  activeSection: string;
}

export interface ISettingsModalFooterProps {
  modal?: any;
}

export interface ISettingsModalFooterState {
  valid: boolean;
}
