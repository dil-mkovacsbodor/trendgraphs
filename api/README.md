# TrendGraphs API

This is the backend API for the TrendGraphs application, built using AWS Lambda, TypeScript, and a Hexagonal Architecture (also known as Ports and Adapters).

## Features

- Company search by name prefix (minimum 3 characters)
- Company search by registration number
- Industry listing and search
- RapidAPI integration for company data

## Architecture

The project follows a Hexagonal Architecture with the following structure:

```
src/
├── domain/           # Domain models and ports (interfaces)
│   ├── company/      # Company domain models
│   ├── industry/     # Industry domain models
│   └── ports/        # Ports (interfaces) for adapters
├── application/      # Application use cases
│   └── useCases/     # Use case implementations
└── infrastructure/   # Infrastructure adapters
    ├── adapters/     # Adapters for external systems
    └── data/         # Data files
```

### Hexagonal Architecture Components

1. **Domain Layer**: Contains the core business logic, entities, and ports (interfaces)
   - **Company**: Domain model for companies
   - **Industry**: Domain model for industries
   - **CompanyRepository**: Port (interface) for company data access
   - **IndustryRepository**: Port (interface) for industry data access

2. **Application Layer**: Contains use cases that orchestrate the domain logic
   - **SearchCompaniesUseCase**: Use case for searching companies by name prefix
   - **SearchCompanyByRegNumberUseCase**: Use case for searching companies by registration number
   - **GetIndustriesUseCase**: Use case for retrieving and searching industries

3. **Infrastructure Layer**: Contains adapters that implement the ports
   - **RapidAPICompanyRepository**: Adapter for RapidAPI data access
   - **FileIndustryRepository**: Adapter for loading industry data from a JSON file
   - **LambdaCompanyController**: Adapter for AWS Lambda requests

## API Endpoints

### Companies

- `POST /companies/search` - Search for companies by name prefix
  - Request body: `{ "prefix": "com", "limit": 25, "lastEvaluatedKey": { "page": 1 } }`
  - Response: `{ "companies": [...], "count": 10, "lastEvaluatedKey": { "page": 2 } }`

- `GET /companies/searchbyreg` - Search for a company by registration number
  - Query parameter: `regNumber` (e.g., `RC - 1754689`)
  - Response: `{ "id": "...", "name": "...", ... }`

### Industries

- `GET /industries` - Get all industries
  - Response: `{ "industries": [{ "name": "Technology" }, { "name": "Healthcare" }, ...] }`

- `GET /industries/search` - Search for industries by prefix
  - Query parameter: `prefix` (e.g., `tech`)
  - Response: `{ "industries": [{ "name": "Technology" }, { "name": "Telecommunications" }, ...] }`

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Set up environment variables:
   ```
   RAPIDAPI_KEY=your_rapidapi_key
   ```

3. Build for deployment:
   ```
   npm run build
   ```

4. Deploy to AWS Lambda:
   ```
   # Package the application
   zip -r function.zip dist node_modules
   
   # Upload to AWS Lambda
   aws lambda update-function-code --function-name YourFunctionName --zip-file fileb://function.zip
   ```

## AWS Lambda Configuration

This application is designed to be deployed as an AWS Lambda function with API Gateway integration:

1. Create a new Lambda function in AWS
2. Set the runtime to Node.js
3. Set the handler to `dist/lambda.handler`
4. Configure environment variables:
   - `RAPIDAPI_KEY`: Your RapidAPI key
5. Create an API Gateway trigger for the Lambda function
6. Configure the API Gateway routes to match the endpoints:
   - `POST /companies/search`
   - `GET /companies/searchbyreg`
   - `GET /industries`
   - `GET /industries/search`

## External API

This application uses the Business and Company Name API from RapidAPI:
- Endpoint: `https://business-and-company-name-api.p.rapidapi.com/api/v1/cacctrlsrvc/companies/searchbyname`
- Documentation: [RapidAPI Business and Company Name API](https://rapidapi.com/api-sports/api/business-and-company-name-api)

## Testing

Run tests with:
```
npm test
``` 