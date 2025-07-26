// src/service.ts
import { BigQuery } from '@google-cloud/bigquery';

const bigquery = new BigQuery();

// 1. Create a new farmer
export const handleCreateFarmer = async (user: {
  id: string;
  name: string;
  age: number;
  languages: string[];
  village: string;
  state: string;
  crops: string[];
  farms: string[];
}) => {
  const query = `
    INSERT INTO \`project.dataset.user_profile\`
    (id, name, age, languages, village, state, crops, farms)
    VALUES (@id, @name, @age, @languages, @village, @state, @crops, @farms)
  `;
  const options = {
    query,
    params: user,
  };
  await bigquery.query(options);
  return true;
};

// 2. Register a new bot
export const handleRegisterBot = async (botData: {
  id: string;
  hardware_id: string;
  timestamp: string;
  rainfall: string;
  moisture: string;
  sunlight_intensity: string;
  smoke_intensity: string;
}) => {
  const query = `
    INSERT INTO \`project.dataset.bandhu_bot\`
    (id, hardware_id, timestamp, rainfall, moisture, sunlight_intensity, smoke_intensity)
    VALUES (@id, @hardware_id, @timestamp, @rainfall, @moisture, @sunlight_intensity, @smoke_intensity)
  `;
  const options = {
    query,
    params: botData,
  };
  await bigquery.query(options);
  return true;
};

// 3. Get Explore Tab data
export const handleGetExploreTab = async () => {
  const query = `
    SELECT * FROM \`project.dataset.web_sourced_data\`
    ORDER BY timestamp DESC
    LIMIT 20
  `;
  const [rows] = await bigquery.query({ query });
  return rows;
};

// 4. Get Alerts Tab
export const handleGetAlertsTab = async (farmerId: string) => {
  const query = `
    SELECT * FROM \`project.dataset.alerts\`
    WHERE farmer_id = @farmerId
    ORDER BY timestamp DESC
  `;
  const [rows] = await bigquery.query({
    query,
    params: { farmerId },
  });
  return rows;
};

// 5. Get My Farm Tab
export const handleGetMyFarmTab = async (farmerId: string) => {
  const query = `
    SELECT u.*
    FROM \`project.dataset.user_profile\` u
    JOIN \`project.dataset.bandhu_farm_mapping\` m
    ON u.id = m.farmer_id
    WHERE m.farmer_id = @farmerId
  `;
  const [rows] = await bigquery.query({
    query,
    params: { farmerId },
  });
  return rows;
};
