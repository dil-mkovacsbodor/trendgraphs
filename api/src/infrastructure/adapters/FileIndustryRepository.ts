import * as fs from 'fs';
import * as path from 'path';
import { Industry } from '../../domain/industry/Industry';
import { IndustryRepository } from '../../domain/ports/IndustryRepository';

/**
 * Adapter for loading industry data from a JSON file
 */
export class FileIndustryRepository implements IndustryRepository {
  private industries: Industry[] = [];

  constructor() {
    this.loadIndustries();
  }

  /**
   * Load industries from the JSON file
   */
  private loadIndustries(): void {
    try {
      const filePath = path.resolve(__dirname, '../data/industries.json');
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const industryNames = JSON.parse(fileContent);
      
      // Convert string array to Industry objects
      this.industries = industryNames.map((name: string) => ({ name }));
    } catch (error) {
      console.error('Error loading industries:', error);
      // Provide a fallback list of industries in case of file reading error
      this.industries = [
        { name: 'Technology' },
        { name: 'Healthcare' },
        { name: 'Financial Services' },
        { name: 'Manufacturing' },
        { name: 'Retail' }
      ];
    }
  }

  /**
   * Get all industries
   * @returns Array of industries
   */
  public async getAllIndustries(): Promise<Industry[]> {
    return [...this.industries];
  }

  /**
   * Search industries by prefix
   * @param prefix The prefix to search for
   * @returns Array of matching industries
   */
  public async searchIndustries(prefix: string): Promise<Industry[]> {
    if (!prefix || prefix.length < 2) {
      return [];
    }
    
    const lowerPrefix = prefix.toLowerCase();
    return this.industries.filter(industry => 
      industry.name.toLowerCase().includes(lowerPrefix)
    );
  }
} 