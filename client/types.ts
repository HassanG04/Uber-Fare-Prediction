
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  createdAt: string;
}

export interface PredictionInput {
  userId: string;
  userName: string;
  driverName: string;
  carCondition: string;
  weather: string;
  trafficCondition: string;
  key: string;
  fareAmount?: number;
  pickupDatetime: string;
  pickupLongitude: number;
  pickupLatitude: number;
  dropoffLongitude: number;
  dropoffLatitude: number;
  passengerCount: number;
  hour: number;
  day: number;
  month: number;
  weekday: string;
  year: number;
  jfkDist: number;
  ewrDist: number;
  lgaDist: number;
  solDist: number;
  nycDist: number;
  distance: number;
  bearing: number;
}

export interface PredictionResult {
  predictedFare: number;
  status: 'Good' | 'Bad';
  analysis: string;
}

export interface CreditItem {
  id: string;
  name: string;
  role: string;
  details: string[];
  category: 'Supervisor' | 'Creator' | 'Organization';
  link?: string;
  image?: string;
}
