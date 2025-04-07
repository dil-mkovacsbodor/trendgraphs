import { Industry } from '../industry/Industry';

/**
 * Port interface for industry data access
 */
export interface IndustryRepository {
  /**
   * Get all industries
   * @returns Array of industries
   */
  getAllIndustries(): Promise<Industry[]>;

  /**
   * Search industries by prefix
   * @param prefix The prefix to search for
   * @returns Array of matching industries
   */
  searchIndustries(prefix: string): Promise<Industry[]>;
} 