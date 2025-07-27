import { BigQuery } from '@google-cloud/bigquery';
import path from 'path';

export const bigquery = new BigQuery({
  keyFilename: path.join(__dirname, '../../service.json'),
});
