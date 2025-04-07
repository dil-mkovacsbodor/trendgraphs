import { Industry } from '../../domain/industry/Industry';
import { IndustryRepository } from '../../domain/ports/IndustryRepository';

/**
 * Use case for retrieving industries
 */
export class GetIndustriesUseCase {
  constructor(private readonly industryRepository: IndustryRepository) {}

  /**
   * Execute the use case to get all industries
   * @returns Array of industries
   */
  public async execute(): Promise<Industry[]> {
    return this.industryRepository.getAllIndustries();
  }

  /**
   * Execute the use case to search industries by prefix
   * @param prefix The prefix to search for
   * @returns Array of matching industries
   */
  public async executeSearch(prefix: string): Promise<Industry[]> {
    return this.industryRepository.searchIndustries(prefix);
  }
} 