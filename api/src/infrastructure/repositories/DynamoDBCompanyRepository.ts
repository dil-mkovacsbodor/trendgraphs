import { DynamoDB } from 'aws-sdk';
import { Company, CompanySearchResult } from '../../domain/company/Company';
import { CompanyRepository } from '../../domain/company/CompanyRepository';
import { v4 as uuidv4 } from 'uuid';

export class DynamoDBCompanyRepository implements CompanyRepository {
  private readonly tableName: string;
  private readonly dynamoDB: DynamoDB.DocumentClient;

  constructor(tableName: string, dynamoDB?: DynamoDB.DocumentClient) {
    this.tableName = tableName;
    this.dynamoDB = dynamoDB || new DynamoDB.DocumentClient();
  }

  async searchByNamePrefix(
    prefix: string,
    limit: number = 25,
    lastEvaluatedKey?: Record<string, any>
  ): Promise<CompanySearchResult> {
    if (prefix.length < 3) {
      throw new Error('Search prefix must be at least 3 characters long');
    }

    const params: DynamoDB.DocumentClient.QueryInput = {
      TableName: this.tableName,
      KeyConditionExpression: 'begins_with(#name, :prefix)',
      ExpressionAttributeNames: {
        '#name': 'name',
      },
      ExpressionAttributeValues: {
        ':prefix': prefix,
      },
      Limit: limit,
      ScanIndexForward: true,
    };

    if (lastEvaluatedKey) {
      params.ExclusiveStartKey = lastEvaluatedKey;
    }

    const result = await this.dynamoDB.query(params).promise();

    return {
      companies: result.Items as Company[],
      count: result.Count || 0,
      lastEvaluatedKey: result.LastEvaluatedKey,
    };
  }

  async getById(id: string): Promise<Company | null> {
    const params: DynamoDB.DocumentClient.GetItemInput = {
      TableName: this.tableName,
      Key: { id },
    };

    const result = await this.dynamoDB.get(params).promise();
    return result.Item as Company || null;
  }

  async create(companyData: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>): Promise<Company> {
    const now = new Date();
    const company: Company = {
      ...companyData,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
    };

    const params: DynamoDB.DocumentClient.PutItemInput = {
      TableName: this.tableName,
      Item: company,
      ConditionExpression: 'attribute_not_exists(id)',
    };

    await this.dynamoDB.put(params).promise();
    return company;
  }

  async update(
    id: string,
    companyData: Partial<Omit<Company, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<Company> {
    const existingCompany = await this.getById(id);
    if (!existingCompany) {
      throw new Error(`Company with ID ${id} not found`);
    }

    const now = new Date();
    const updatedCompany: Company = {
      ...existingCompany,
      ...companyData,
      updatedAt: now,
    };

    const params: DynamoDB.DocumentClient.PutItemInput = {
      TableName: this.tableName,
      Item: updatedCompany,
      ConditionExpression: 'attribute_exists(id)',
    };

    await this.dynamoDB.put(params).promise();
    return updatedCompany;
  }

  async delete(id: string): Promise<boolean> {
    const params: DynamoDB.DocumentClient.DeleteItemInput = {
      TableName: this.tableName,
      Key: { id },
      ConditionExpression: 'attribute_exists(id)',
      ReturnValues: 'ALL_OLD',
    };

    try {
      await this.dynamoDB.delete(params).promise();
      return true;
    } catch (error) {
      if (error.code === 'ConditionalCheckFailedException') {
        return false;
      }
      throw error;
    }
  }
} 