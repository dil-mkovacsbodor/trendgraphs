/**
 * Company domain model
 */
export interface Company {
  id: string;
  name: string;
  description?: string;
  industry?: string;
  foundedYear?: number;
  website?: string;
  logoUrl?: string;
  registrationNumber?: string;
  address?: string;
  status?: string;
  registrationDate?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Result of a company search
 */
export interface CompanySearchResult {
  companies: Company[];
  count: number;
  lastEvaluatedKey?: Record<string, any>;
} 