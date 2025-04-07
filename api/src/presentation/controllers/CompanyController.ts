import { Request, Response } from 'express';
import { CompanyService } from '../../application/services/CompanyService';
import { Company } from '../../domain/company/Company';

export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  /**
   * Search for companies by name prefix
   * @param req Express request
   * @param res Express response
   */
  async searchCompanies(req: Request, res: Response): Promise<void> {
    try {
      const { prefix, limit, lastEvaluatedKey } = req.body;

      if (!prefix || prefix.length < 3) {
        res.status(400).json({
          error: 'Search prefix must be at least 3 characters long',
        });
        return;
      }

      const result = await this.companyService.searchCompanies(
        prefix,
        limit ? parseInt(limit, 10) : undefined,
        lastEvaluatedKey
      );

      res.status(200).json(result);
    } catch (error) {
      console.error('Error searching companies:', error);
      res.status(500).json({
        error: 'Internal server error',
      });
    }
  }

  /**
   * Get a company by ID
   * @param req Express request
   * @param res Express response
   */
  async getCompanyById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const company = await this.companyService.getCompanyById(id);

      if (!company) {
        res.status(404).json({
          error: `Company with ID ${id} not found`,
        });
        return;
      }

      res.status(200).json(company);
    } catch (error) {
      console.error('Error getting company by ID:', error);
      res.status(500).json({
        error: 'Internal server error',
      });
    }
  }

  /**
   * Create a new company
   * @param req Express request
   * @param res Express response
   */
  async createCompany(req: Request, res: Response): Promise<void> {
    try {
      const companyData = req.body;
      const company = await this.companyService.createCompany(companyData);

      res.status(201).json(company);
    } catch (error) {
      console.error('Error creating company:', error);
      res.status(500).json({
        error: 'Internal server error',
      });
    }
  }

  /**
   * Update an existing company
   * @param req Express request
   * @param res Express response
   */
  async updateCompany(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const companyData = req.body;
      const company = await this.companyService.updateCompany(id, companyData);

      res.status(200).json(company);
    } catch (error) {
      console.error('Error updating company:', error);
      
      if (error.message && error.message.includes('not found')) {
        res.status(404).json({
          error: error.message,
        });
        return;
      }
      
      res.status(500).json({
        error: 'Internal server error',
      });
    }
  }

  /**
   * Delete a company
   * @param req Express request
   * @param res Express response
   */
  async deleteCompany(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await this.companyService.deleteCompany(id);

      if (!deleted) {
        res.status(404).json({
          error: `Company with ID ${id} not found`,
        });
        return;
      }

      res.status(204).send();
    } catch (error) {
      console.error('Error deleting company:', error);
      res.status(500).json({
        error: 'Internal server error',
      });
    }
  }
} 