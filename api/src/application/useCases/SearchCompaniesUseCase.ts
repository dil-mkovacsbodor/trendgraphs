import { CompanySearchResult } from '../../domain/company/Company';
import { CompanyRepository } from '../../domain/ports/CompanyRepository';

/**
 * Use case for searching companies by name prefix
 */
export class SearchCompaniesUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  /**
   * Execute the use case
   * @param prefix The prefix to search for (minimum 3 characters)
   * @param limit Maximum number of results to return
   * @param lastEvaluatedKey Key for pagination
   * @returns Search results with companies and pagination info
   */
  async execute(
    prefix: string,
    limit?: number,
    lastEvaluatedKey?: Record<string, any>
  ): Promise<CompanySearchResult> {
    // Validate input
    if (!prefix || prefix.length < 3) {
      throw new Error('Search prefix must be at least 3 characters long');
    }

    // Delegate to repository
    return this.companyRepository.searchByNamePrefix(prefix, limit, lastEvaluatedKey);
  }
} 