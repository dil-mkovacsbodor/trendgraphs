import { Company, CompanySearchResult } from '../../domain/company/Company';
import { CompanyRepository } from '../../domain/company/CompanyRepository';

export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  /**
   * Search for companies by name prefix
   * @param prefix The prefix to search for (minimum 3 characters)
   * @param limit Maximum number of results to return
   * @param lastEvaluatedKey Key for pagination
   * @returns Search results with companies and pagination info
   */
  async searchCompanies(
    prefix: string,
    limit?: number,
    lastEvaluatedKey?: Record<string, any>
  ): Promise<CompanySearchResult> {
    return this.companyRepository.searchByNamePrefix(prefix, limit, lastEvaluatedKey);
  }

  /**
   * Get a company by ID
   * @param id The company ID
   * @returns The company or null if not found
   */
  async getCompanyById(id: string): Promise<Company | null> {
    return this.companyRepository.getById(id);
  }

  /**
   * Create a new company
   * @param companyData The company data to create
   * @returns The created company
   */
  async createCompany(companyData: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>): Promise<Company> {
    return this.companyRepository.create(companyData);
  }

  /**
   * Update an existing company
   * @param id The company ID
   * @param companyData The company data to update
   * @returns The updated company
   */
  async updateCompany(
    id: string,
    companyData: Partial<Omit<Company, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<Company> {
    return this.companyRepository.update(id, companyData);
  }

  /**
   * Delete a company
   * @param id The company ID
   * @returns True if deleted, false if not found
   */
  async deleteCompany(id: string): Promise<boolean> {
    return this.companyRepository.delete(id);
  }
} 