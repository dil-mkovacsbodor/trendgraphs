import { Router } from 'express';
import { CompanyController } from '../controllers/CompanyController';

export function createCompanyRoutes(companyController: CompanyController): Router {
  const router = Router();

  // Search companies by name prefix (POST endpoint)
  router.post('/search', (req, res) => companyController.searchCompanies(req, res));

  // Get company by ID
  router.get('/:id', (req, res) => companyController.getCompanyById(req, res));

  // Create a new company
  router.post('/', (req, res) => companyController.createCompany(req, res));

  // Update an existing company
  router.put('/:id', (req, res) => companyController.updateCompany(req, res));

  // Delete a company
  router.delete('/:id', (req, res) => companyController.deleteCompany(req, res));

  return router;
} 