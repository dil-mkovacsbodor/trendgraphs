import { APIGatewayProxyEvent, APIGatewayProxyResult, Context, Handler } from 'aws-lambda';
import cors from 'cors';

// Domain
import { CompanyRepository } from './domain/ports/CompanyRepository';

// Application
import { SearchCompaniesUseCase } from './application/useCases/SearchCompaniesUseCase';
import { SearchCompanyByRegNumberUseCase } from './application/useCases/SearchCompanyByRegNumberUseCase';

// Infrastructure
import { RapidAPICompanyRepository } from './infrastructure/adapters/RapidAPICompanyRepository';
import { LambdaCompanyController } from './infrastructure/adapters/LambdaCompanyController';
import { HttpMethod } from 'aws-lambda-router/lib/EventProcessor';
import * as lambdaRouter from 'aws-lambda-router';

// Initialize repositories (adapters)
const rapidApiKey = process.env.RAPIDAPI_KEY;
if (!rapidApiKey) {
  throw new Error('RAPIDAPI_KEY is not set');
}
const companyRepository: CompanyRepository = new RapidAPICompanyRepository(rapidApiKey);

// Initialize use cases
const searchCompaniesUseCase = new SearchCompaniesUseCase(companyRepository);
const searchCompanyByRegNumberUseCase = new SearchCompanyByRegNumberUseCase(companyRepository);

// Initialize controller (adapter)
const companyController = new LambdaCompanyController(
  searchCompaniesUseCase,
  searchCompanyByRegNumberUseCase,
);

// CORS middleware
const corsMiddleware = cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});

// Define routes
const routes = {
  proxyIntegration: {
    routes: [
      {
        path: '/health',
        method: 'GET' as HttpMethod,
        action: async (request: any, context: any): Promise<any> => {
          return {
            statusCode: 200,
            body: JSON.stringify({ status: 'ok' }),
          };
        }
      },
      {
        path: '/companies/search',
        method: 'POST' as HttpMethod,
        action: async (request: any, context: any): Promise<any> => {
          return companyController.searchCompanies(request);
        }
      },
      {
        path: '/companies/searchbyreg',
        method: 'GET' as HttpMethod,
        action: async (request: any, context: any): Promise<any> => {
          return companyController.searchByRegistrationNumber(request);
        }
      }
    ]
  }
};

// Lambda handler
export const handler = lambdaRouter.handler(routes) as Handler<APIGatewayProxyEvent, APIGatewayProxyResult>;
