import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { SearchCompaniesUseCase } from '../../application/useCases/SearchCompaniesUseCase';
import { SearchCompanyByRegNumberUseCase } from '../../application/useCases/SearchCompanyByRegNumberUseCase';

/**
 * Lambda adapter for the company controller
 */
export class LambdaCompanyController {
  constructor(
    private readonly searchCompaniesUseCase: SearchCompaniesUseCase,
    private readonly searchCompanyByRegNumberUseCase: SearchCompanyByRegNumberUseCase
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
} 