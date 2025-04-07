import { Company, CompanySearchResult } from './Company';

export interface CompanyRepository {
  /**
   * Search for companies by name prefix
   * @param prefix The prefix to search for (minimum 3 characters)
   * @param limit Maximum number of results to return
   * @param lastEvaluatedKey Key for pagination
   * @returns Search results with companies and pagination info
   */
  searchByNamePrefix(
    prefix: string,
    limit?: number,
    lastEvaluatedKey?: Record<string, any>
  ): Promise<CompanySearchResult>;
  
  /**
   * Get a company by ID
   * @param id The company ID
   * @returns The company or null if not found
   */
  getById(id: string): Promise<Company | null>;
  
  /**
   * Create a new company
   * @param company The company to create
   * @returns The created company
   */
  create(company: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>): Promise<Company>;
  
  /**
   * Update an existing company
   * @param id The company ID
   * @param company The company data to update
   * @returns The updated company
   */
  update(id: string, company: Partial<Omit<Company, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Company>;
  
  /**
   * Delete a company
   * @param id The company ID
   * @returns True if deleted, false if not found
   */
  delete(id: string): Promise<boolean>;
} 