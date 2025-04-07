import { Company, CompanySearchResult } from '../company/Company';

/**
 * Port (interface) for company repository
 */
export interface CompanyRepository {
  /**
   * Search for companies by name prefix
   * @param prefix The name prefix to search for (minimum 3 characters)
   * @param limit Maximum number of results to return
   * @param lastEvaluatedKey Key for pagination
   * @returns Search result with companies and pagination info
   */
  searchByNamePrefix(
    prefix: string,
    limit?: number,
    lastEvaluatedKey?: Record<string, any>
  ): Promise<CompanySearchResult>;

  /**
   * Search for a company by registration number
   * @param registrationNumber The registration number to search for
   * @returns The company or null if not found
   */
  searchByRegistrationNumber(registrationNumber: string): Promise<Company | null>;
} 