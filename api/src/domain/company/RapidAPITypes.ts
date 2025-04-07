/**
 * Types for the RapidAPI Business and Company Name API responses
 */

/**
 * Company item from the RapidAPI response
 */
export interface RapidAPICompanyItem {
  id: string;
  companyName: string;
  registrationNumber: string;
  address: string;
  status: string;
  registrationDate: string;
  type: string;
  registeredOn: string | null;
  isDeleted: boolean;
  isActive: boolean;
  createdAt: string;
  updateAt: string;
  modifiedAt: string;
}

/**
 * Company search response from the RapidAPI
 */
export interface RapidAPICompanySearchResponse {
  api_version: string;
  generated_on: string;
  count: number;
  limit: number;
  page: number;
  items: RapidAPICompanyItem[];
}

/**
 * Company search by registration number response from the RapidAPI
 */
export interface RapidAPICompanyByRegResponse {
  message: string;
  generated_on: string;
  data: RapidAPICompanyItem;
  api_version: string;
  success: boolean;
} 