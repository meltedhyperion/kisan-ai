import { NextFunction, Request, Response } from 'express';
import { handleCreateFarmer, handleGetAlertsTab, handleGetExploreTab, handleGetMyFarmTab, handleRegisterBot} from './service';

export const createFarm = async (
  req: Request<unknown, unknown, unknown, {
    status: 'verified' | 'unverified'
  }>,
  res: Response,
  next: NextFunction,
) => {
  try {
   
    res.status(200).json({
      success: true
    });
  } catch (error) {
    next(error);
  }
};

export const registerBots = async (
  req: Request<unknown, unknown, unknown, {
    status: 'verified' | 'unverified'
  }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    
  } catch (error) {
    next(error);
  }
}


export const getExploreTab = async (
  req: Request<unknown, unknown, unknown, {
    status: 'verified' | 'unverified'
  }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    
  } catch (error) {
    next(error);
  }
}


export const getAlertsTab = async (
  req: Request<unknown, unknown, unknown, {
    status: 'verified' | 'unverified'
  }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    
  } catch (error) {
    next(error);
  }
}


export const getMyFarmTab = async (
  req: Request<unknown, unknown, unknown, {
    status: 'verified' | 'unverified'
  }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    
  } catch (error) {
    next(error);
  }
}