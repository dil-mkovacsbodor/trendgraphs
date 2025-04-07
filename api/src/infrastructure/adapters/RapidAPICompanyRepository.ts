import axios from 'axios';
import { Company, CompanySearchResult } from '../../domain/company/Company';
import { CompanyRepository } from '../../domain/ports/CompanyRepository';
import { RapidAPICompanyItem, RapidAPICompanySearchResponse, RapidAPICompanyByRegResponse } from '../../domain/company/RapidAPITypes';

/**
 * RapidAPI adapter for the CompanyRepository port
 */
export class RapidAPICompanyRepository implements CompanyRepository {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(apiKey: string, baseUrl: string = 'https://business-and-company-name-api.p.rapidapi.com/api/v1/cacctrlsrvc') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async searchByNamePrefix(
    prefix: string,
    limit: number = 25,
    lastEvaluatedKey?: Record<string, any>
  ): Promise<CompanySearchResult> {
    if (prefix.length < 3) {
      throw new Error('Search prefix must be at least 3 characters long');
    }

    // Calculate page from lastEvaluatedKey or default to 1
    const page = lastEvaluatedKey?.page || 1;
    
    try {
      const response = await axios.get<RapidAPICompanySearchResponse>(`${this.baseUrl}/companies/searchbyname`, {
        params: {
          companyName: prefix,
          limit: limit,
          page: page
        },
        headers: {
          'x-rapidapi-host': 'business-and-company-name-api.p.rapidapi.com',
          'x-rapidapi-key': this.apiKey
        }
      });

      // Transform the API response to match our CompanySearchResult interface
      const companies = this.mapApiResponseToCompanies(response.data.items);
      
      return {
        companies,
        count: response.data.count,
        lastEvaluatedKey: {
          page: page + 1
        }
      };
    } catch (error) {
      console.error('Error searching companies via RapidAPI:', error);
      throw new Error('Failed to search companies');
    }
  }

  async searchByRegistrationNumber(registrationNumber: string): Promise<Company | null> {
    try {
      const response = await axios.get<RapidAPICompanyByRegResponse>(`${this.baseUrl}/companies/searchbyreg`, {
        params: {
          regNumber: registrationNumber
        },
        headers: {
          'x-rapidapi-host': 'business-and-company-name-api.p.rapidapi.com',
          'x-rapidapi-key': this.apiKey
        }
      });

      if (!response.data.success || !response.data.data) {
        return null;
      }

      return this.mapApiResponseToCompany(response.data.data);
    } catch (error) {
      console.error('Error searching company by registration number via RapidAPI:', error);
      return null;
    }
  }

  private mapApiResponseToCompanies(apiResponse: RapidAPICompanyItem[]): Company[] {
    if (!apiResponse || !Array.isArray(apiResponse)) {
      return [];
    }

    return apiResponse.map((item) => this.mapApiResponseToCompany(item));
  }

  private mapApiResponseToCompany(apiResponse: RapidAPICompanyItem): Company {
    return {
      id: apiResponse.id,
      name: apiResponse.companyName,
      description: '',
      industry: '',
      foundedYear: this.extractYearFromRegistrationDate(apiResponse.registrationDate),
      website: '',
      logoUrl: '',
      registrationNumber: apiResponse.registrationNumber,
      address: apiResponse.address,
      status: apiResponse.status,
      registrationDate: apiResponse.registrationDate,
      createdAt: new Date(apiResponse.createdAt),
      updatedAt: new Date(apiResponse.modifiedAt)
    };
  }

  private extractYearFromRegistrationDate(registrationDate: string): number | undefined {
    // Example: "Date of Registration - Nov 1, 2021"
    const match = registrationDate.match(/\d{4}/);
    if (match) {
      return parseInt(match[0], 10);
    }
    return undefined;
  }
} 