import { RootState } from '../index';

export const selectServices = (state: RootState) => state.service.services;
export const selectServiceDetails = (state: RootState) => state.service.details;
