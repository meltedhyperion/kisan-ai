import { NextFunction, Request, Response } from 'express';
import { bigquery } from '../loaders/database';

export const createFarmer = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      uid,
      name,
      age,
      preferredLanguage,
      location: { village, state },
    } = req.body;

    const query = `
      INSERT INTO \`project.dataset.user_profile\`
      (id, name, age, languages, village, state, crops, farms)
      VALUES (@id, @name, @age, @languages, @village, @state, @crops, @farms)
    `;

    const params = {
      id: uid,
      name,
      age,
      languages: [preferredLanguage],
      village,
      state,
      crops: [],
      farms: [],
    };

    await bigquery.query({ query, params });

    res.status(201).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const createFarm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, ownerId, farmName, farmName_hi, address, crop, crop_hi, area } = req.body;

    const query = `
      INSERT INTO \`project.dataset.bandhu_farm_mapping\`
      (id, ownerId, farmName, farmName_hi, address, crop, crop_hi, area)
      VALUES (@id, @ownerId, @farmName, @farmName_hi, @address, @crop, @crop_hi, @area)
    `;

    await bigquery.query({ query, params: { id, ownerId, farmName, farmName_hi, address, crop, crop_hi, area } });

    res.status(201).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const registerBots = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bots = req.body; // expects BandhuDevice[]

    const rows = bots.map((bot: any) => ({
      id: bot.id,
      farmId: bot.farmId,
      status: bot.status,
    }));

    await bigquery.dataset('dataset').table('bandhu_bot').insert(rows);

    res.status(201).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const getMyFarmTab = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.headers['x-user-id']; // or from token

    const query = `
      SELECT * FROM \`project.dataset.bandhu_farm_mapping\`
      WHERE ownerId = @userId
      LIMIT 10
    `;
    const [rows] = await bigquery.query({ query, params: { userId } });

    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};


export const getExploreTab = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = `SELECT * FROM \`project.dataset.web_sourced_data\` ORDER BY id DESC LIMIT 20`;
    const [rows] = await bigquery.query({ query });

    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

export const getAlertsTab = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.headers['x-user-id']; // or extract from token

    const query = `
      SELECT * FROM \`project.dataset.alerts\`
      WHERE userId = @userId
      ORDER BY createdAt DESC
      LIMIT 50
    `;
    const [rows] = await bigquery.query({ query, params: { userId } });

    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};
export const geminicall = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { message } = req.body;

    // Simulate a response from Gemini AI
    const response = {
      reply: `Gemini Bhai says: ${message}`,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}
