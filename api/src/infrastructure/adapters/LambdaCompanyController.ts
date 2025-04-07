import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { SearchCompaniesUseCase } from '../../application/useCases/SearchCompaniesUseCase';
import { SearchCompanyByRegNumberUseCase } from '../../application/useCases/SearchCompanyByRegNumberUseCase';
import { GetIndustriesUseCase } from '../../application/useCases/GetIndustriesUseCase';

/**
 * Lambda adapter for the company controller
 */
export class LambdaCompanyController {
  constructor(
    private readonly searchCompaniesUseCase: SearchCompaniesUseCase,
    private readonly searchCompanyByRegNumberUseCase: SearchCompanyByRegNumberUseCase,
    private readonly getIndustriesUseCase: GetIndustriesUseCase
  ) {}

  /**
   * Search for companies by name prefix
   */
  async searchCompanies(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      if (!event.body) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Request body is required' }),
        };
      }

      const { prefix, limit, lastEvaluatedKey } = JSON.parse(event.body);

      if (!prefix || prefix.length < 3) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Prefix must be at least 3 characters long' }),
        };
      }

      const result = await this.searchCompaniesUseCase.execute(
        prefix,
        limit || 25,
        lastEvaluatedKey
      );

      return {
        statusCode: 200,
        body: JSON.stringify(result),
      };
    } catch (error) {
      console.error('Error searching companies:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Failed to search companies' }),
      };
    }
  }

  /**
   * Search for a company by registration number
   */
  async searchByRegistrationNumber(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      const registrationNumber = event.queryStringParameters?.regNumber;

      if (!registrationNumber) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Registration number is required' }),
        };
      }

      const company = await this.searchCompanyByRegNumberUseCase.execute(registrationNumber);

      if (!company) {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: 'Company not found' }),
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify(company),
      };
    } catch (error) {
      console.error('Error searching company by registration number:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Failed to search company' }),
      };
    }
  }

  /**
   * Get all industries
   */
  async getAllIndustries(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      const industries = await this.getIndustriesUseCase.execute();
      
      return {
        statusCode: 200,
        body: JSON.stringify({ industries }),
      };
    } catch (error) {
      console.error('Error getting industries:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Failed to get industries' }),
      };
    }
  }

  /**
   * Search industries by prefix
   */
  async searchIndustries(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      const prefix = event.queryStringParameters?.prefix || '';
      
      if (prefix.length < 2) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Prefix must be at least 2 characters long' }),
        };
      }

      const industries = await this.getIndustriesUseCase.executeSearch(prefix);
      
      return {
        statusCode: 200,
        body: JSON.stringify({ industries }),
      };
    } catch (error) {
      console.error('Error searching industries:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Failed to search industries' }),
      };
    }
  }
} 