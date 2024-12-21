import { TEnvironments } from '../constants/types';

export const environments: TEnvironments = {
  local: '',
  systest: 'https://authoring.systest.cha.rbxd.ds/mfe/podcast/authoring/',
  staging: 'https://authoring.staging.cha.rbxd.ds/mfe/podcast/authoring/',
  integration: '',
  performance: 'https://authoring.performance.cha.rbxd.ds/mfe/podcast/authoring/',
};
export const currentEnvironment: keyof TEnvironments = Cypress.env('ENV');
export const baseURL: string = environments[currentEnvironment];