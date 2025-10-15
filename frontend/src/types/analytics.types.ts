// Analytics Types
export interface AnalyticsData {
  linkId: string;
  totalClicks: number;
  uniqueVisitors: number;
  clicksByDate: DateClick[];
  clicksByCountry: CountryClick[];
  clicksByDevice: DeviceClick[];
  clicksByBrowser: BrowserClick[];
  clicksByReferrer: ReferrerClick[];
}

export interface DateClick {
  date: string;
  clicks: number;
}

export interface CountryClick {
  country: string;
  clicks: number;
  percentage: number;
}

export interface DeviceClick {
  device: 'desktop' | 'mobile' | 'tablet';
  clicks: number;
  percentage: number;
}

export interface BrowserClick {
  browser: string;
  clicks: number;
  percentage: number;
}

export interface ReferrerClick {
  referrer: string;
  clicks: number;
  percentage: number;
}

export interface AnalyticsTimeRange {
  start: Date;
  end: Date;
}

