import { Company } from '../../domain/company/Company';
import { CompanyRepository } from '../../domain/ports/CompanyRepository';

/**
 * Use case for searching a company by registration number
 */
export class SearchCompanyByRegNumberUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  /**
   * Execute the use case
   * @param registrationNumber The registration number to search for
   * @returns The company or null if not found
   */
  async execute(registrationNumber: string): Promise<Company | null> {
    return this.companyRepository.searchByRegistrationNumber(registrationNumber);
  }
} 