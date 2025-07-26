
import type { UserProfile, Farm, Alert, ExploreCard, SensorReading, BandhuDevice } from './types';
import { subHours, subDays } from 'date-fns';

// Mock Data
export const mockUser: UserProfile = {
  uid: 'test-user-123',
  name: 'A. Farmer',
  email: 'farmer@kisan.ai',
  age: 42,
  preferredLanguage: 'हिन्दी',
  location: {
    village: 'Anandvan',
    district: 'Pune',
    state: 'Maharashtra',
    pincode: '411001',
  },
};

export const mockFarms: Farm[] = [
  { id: 'farm-001', ownerId: 'test-user-123', farmName: 'Sunrise Fields', farmName_hi: 'सनराइज फील्ड्स', address: 'Anandvan, Pune', crop: 'Wheat', crop_hi: 'गेहूँ', area: 12.5 },
  { id: 'farm-002', ownerId: 'test-user-123', farmName: 'Green Valley', farmName_hi: 'ग्रीन वैली', address: 'Near River, Pune', crop: 'Sugarcane', crop_hi: 'गन्ना', area: 25 },
  { id: 'farm-003', ownerId: 'test-user-123', farmName: 'Fertile Ground Farm', farmName_hi: 'फर्टाइल ग्राउंड फार्म', address: 'Highway 4, Pune', crop: 'Cotton', crop_hi: 'कपास', area: 8 },
];

export const mockAlerts: Alert[] = [
  { id: 'alert-1', userId: 'test-user-123', title: 'Heavy Rainfall Expected', title_hi: 'भारी बारिश की उम्मीद', message: 'The meteorological department predicts over 50mm of rain in the next 24 hours. Ensure drainage systems are clear and protect sensitive crops. Consider delaying any planned irrigation.', message_hi: 'मौसम विभाग ने अगले 24 घंटों में 50 मिमी से अधिक बारिश की भविष्यवाणी की है। सुनिश्चित करें कि जल निकासी व्यवस्था साफ है और संवेदनशील फसलों की रक्षा करें। किसी भी नियोजित सिंचाई में देरी करने पर विचार करें।', severity: 'critical', status: 'unread', createdAt: subHours(new Date(), 2) },
  { id: 'alert-2', userId: 'test-user-123', title: 'Pest Infestation Warning', title_hi: 'कीट संक्रमण की चेतावनी', message: 'High density of aphids detected in Sector B. Immediate action is recommended. Recommended pesticide: Imidacloprid. Consult with a local expert for dosage.', message_hi: 'सेक्टर बी में एफिड्स का उच्च घनत्व पाया गया। तत्काल कार्रवाई की सिफारिश की जाती है। अनुशंसित कीटनाशक: इमिडाक्लोप्रिड। खुराक के लिए स्थानीय विशेषज्ञ से परामर्श करें।', severity: 'warning', status: 'unread', createdAt: subHours(new Date(), 8) },
  { id: 'alert-3', userId: 'test-user-123', title: 'Irrigation Complete', title_hi: 'सिंचाई पूरी हुई', message: 'The automated irrigation cycle for the main wheat field finished at 4:30 AM. Total water used: 2500 liters.', message_hi: 'मुख्य गेहूं के खेत के लिए स्वचालित सिंचाई चक्र सुबह 4:30 बजे समाप्त हो गया। कुल पानी का उपयोग: 2500 लीटर।', severity: 'info', status: 'read', createdAt: subDays(new Date(), 1) },
  { id: 'alert-4', userId: 'test-user-123', title: 'Soil Moisture Low', title_hi: 'मिट्टी में नमी कम', message: 'Soil moisture in the vegetable patch (Sector A) has dropped to 18%, which is below the critical threshold of 20%. Immediate irrigation is advised to prevent crop stress.', message_hi: 'सब्जी पैच (सेक्टर ए) में मिट्टी की नमी 18% तक गिर गई है, जो 20% की महत्वपूर्ण सीमा से नीचे है। फसल के तनाव को रोकने के लिए तत्काल सिंचाई की सलाह दी जाती है।', severity: 'warning', status: 'read', createdAt: subDays(new Date(), 2) },
];

export const mockExploreFeed: ExploreCard[] = [
  { id: 'exp-1', headline: 'New Government Subsidy for Drip Irrigation', headline_hi: 'ड्रिप सिंचाई के लिए नई सरकारी सब्सिडी', summary: 'The government has announced a 50% subsidy on drip irrigation systems for small and marginal farmers.', summary_hi: 'सरकार ने छोटे और सीमांत किसानों के लिए ड्रिप सिंचाई प्रणालियों पर 50% सब्सिडी की घोषणा की है।', source: 'AgriNews India', redirectUrl: 'https://example.com/news-1' },
  { id: 'exp-2', headline: 'Best Practices for Wheat Cultivation in Your Region', headline_hi: 'आपके क्षेत्र में गेहूं की खेती के लिए सर्वोत्तम प्रथाएं', summary: 'Learn about the ideal sowing time, fertilization, and pest control for wheat in the Pune district.', summary_hi: 'पुणे जिले में गेहूं के लिए आदर्श बुवाई समय, निषेचन और कीट नियंत्रण के बारे में जानें।', source: 'Krishi Vigyan Kendra', redirectUrl: 'https://example.com/news-2' },
  { id: 'exp-3', headline: 'Weather Forecast: Monsoon Arriving Early', headline_hi: 'मौसम का पूर्वानुमान: मानसून जल्दी आ रहा है', summary: 'Meteorological department predicts an early onset of monsoon this year. Plan your sowing accordingly.', summary_hi: 'मौसम विभाग ने इस साल मानसून के जल्दी आने की भविष्यवाणी की है। अपनी बुवाई की योजना उसी के अनुसार बनाएं।', source: 'IMD', redirectUrl: 'https://example.com/news-3' },
];

export const mockBandhuDevices: BandhuDevice[] = [
    { id: 'BANDHU-XYZ-01', farmId: 'farm-001', status: 'online' },
    { id: 'BANDHU-XYZ-02', farmId: 'farm-001', status: 'offline' },
    { id: 'BANDHU-ABC-03', farmId: 'farm-001', status: 'online' },
];

// Mock API Functions
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getUserProfile = async (uid: string): Promise<UserProfile> => {
  await delay(200);
  return mockUser;
};

export const getFarms = async (ownerId: string): Promise<Farm[]> => {
  await delay(300);
  return mockFarms.filter(farm => farm.ownerId === ownerId);
};

export const getFarmById = async (farmId: string): Promise<Farm | undefined> => {
    await delay(250);
    return mockFarms.find(farm => farm.id === farmId);
}

export const getAlerts = async (userId: string): Promise<Alert[]> => {
  await delay(400);
  return mockAlerts.filter(alert => alert.userId === userId);
};

export const getExploreFeed = async (): Promise<ExploreCard[]> => {
    await delay(500);
    return mockExploreFeed;
}

export const getSensorReadings = async (farmId: string): Promise<SensorReading[]> => {
    await delay(600);
    const readings: SensorReading[] = [];
    for (let i = 10; i >= 0; i--) {
        readings.push({
            timestamp: subDays(new Date(), i),
            soilMoisture: 30 + Math.random() * 40,
            temperature: 25 + Math.random() * 10,
            lightIntensity: 50000 + Math.random() * 20000,
            rainfall: Math.random() > 0.8 ? Math.random() * 10 : 0,
        });
    }
    return readings;
}

export const getBandhuDevices = async (farmId: string): Promise<BandhuDevice[]> => {
    await delay(350);
    return mockBandhuDevices.filter(device => device.farmId === farmId);
}
