import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { Router } from 'aws-lambda-http-router';
import cors from 'cors';

// Domain
import { CompanyRepository } from './domain/ports/CompanyRepository';
import { IndustryRepository } from './domain/ports/IndustryRepository';

// Application
import { SearchCompaniesUseCase } from './application/useCases/SearchCompaniesUseCase';
import { SearchCompanyByRegNumberUseCase } from './application/useCases/SearchCompanyByRegNumberUseCase';
import { GetIndustriesUseCase } from './application/useCases/GetIndustriesUseCase';

// Infrastructure
import { RapidAPICompanyRepository } from './infrastructure/adapters/RapidAPICompanyRepository';
import { FileIndustryRepository } from './infrastructure/adapters/FileIndustryRepository';
import { LambdaCompanyController } from './infrastructure/adapters/LambdaCompanyController';

// Initialize repositories (adapters)
const rapidApiKey = process.env.RAPIDAPI_KEY || 'hTU91xlBYRmshOI5I4hvwqhIyCmIp1AUu0wjsnTldRfEZAO0MQ';
const companyRepository: CompanyRepository = new RapidAPICompanyRepository(rapidApiKey);
const industryRepository: IndustryRepository = new FileIndustryRepository();

// Initialize use cases
const searchCompaniesUseCase = new SearchCompaniesUseCase(companyRepository);
const searchCompanyByRegNumberUseCase = new SearchCompanyByRegNumberUseCase(companyRepository);
const getIndustriesUseCase = new GetIndustriesUseCase(industryRepository);

// Initialize controller (adapter)
const companyController = new LambdaCompanyController(
  searchCompaniesUseCase,
  searchCompanyByRegNumberUseCase,
  getIndustriesUseCase
);

// Create router
const router = new Router();

// CORS middleware
const corsMiddleware = cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});

// Apply CORS middleware to all routes
router.use(corsMiddleware);

// Health check endpoint
router.get('/health', async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify({ status: 'ok' }),
  };
});

// Company routes
router.post('/companies/search', async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  return companyController.searchCompanies(event);
});

router.get('/companies/searchbyreg', async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  return companyController.searchByRegistrationNumber(event);
});

// Industry routes
router.get('/industries', async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  return companyController.getAllIndustries(event);
});

router.get('/industries/search', async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  return companyController.searchIndustries(event);
});

// Lambda handler
export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  try {
    return await router.dispatch(event);
  } catch (error) {
    console.error('Error handling request:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
}; 