import { ApiDocument, Workspace, GeneralDocument } from ".";
import { fallbackBaseUrl, fallbackDoc } from "./defaults";

export const mockWorkspaces: Workspace[] = [
  {
    id: 1,
    organizationId: 1,
    title: 'E-commerce API',
    description: 'API documentation for the e-commerce platform',
    icon: 'Shopping',
    collections: [
      {
        id: 1,
        name: 'Products',
        description: 'Product management endpoints',
        icon: 'package',
        endpoints: [
          {
            id: 1,
            workspaceId: 1,
            collectionId: 1,
            name: 'Get Products',
            baseUrl: fallbackBaseUrl,
            baseUrlId: 1,
            url: '/api/products',
            method: 'GET',
            headers: '{\n  "Content-Type": "application/json"\n}',
            body: '',
            documentation: {
              id: 101,
              type: 'document',
              title: 'Get Products API',
              text: '# Get Products\n\nRetrieve a list of products with optional filtering.',
              children: [],
              organizationId: 1,
              workspaceId: 1,
              authorId: 1,
              lastEditById: 1,
              created: new Date(),
              lastEdited: new Date()
            },
            tests: [],
            organizationId: 1
          }
        ],
        organizationId: 1,
        workspaceId: 1
      }
    ]
  }
];

export const mockRecentlyUpdated: GeneralDocument[] = [
    {
        id: 1,
        type: 'document',
        title: 'Getting Started with HttPete',
        text: '# Getting Started with HttPete\n\nWelcome to HttPete! This guide will walk you through the basics of using our platform for API testing and documentation.\n\n## Setting up your first project\n\n1. Log in to your HttPete account\n2. Click on "New Project" in the dashboard\n3. Give your project a name and description\n4. Start adding API endpoints\n\n## Creating your first API test\n\n1. In your project, click "New Test"\n2. Enter the API endpoint URL\n3. Select the HTTP method (GET, POST, etc.)\n4. Add any necessary headers or parameters\n5. Click "Send" to run the test\n\n## Documenting your API\n\n1. After running a successful test, click "Generate Docs"\n2. HttPete will automatically create a documentation template\n3. Edit the generated content to add more details\n4. Use markdown to format your documentation\n\nCongratulations! You\'ve now created your first API test and documentation in HttPete. Explore more features to get the most out of our platform.',
        children: [],
        organizationId: 1,
        workspaceId: 1,
        authorId: 1,
        lastEditById: 1,
        created: new Date('2024-11-25T10:34:04.2345'),
        lastEdited: new Date('2024-11-25T10:34:04.2345')
    },
    {
        id: 2,
        type: 'document',
        title: 'Advanced API Testing Techniques',
        text: '# Advanced API Testing Techniques\n\nThis guide covers advanced techniques for API testing in HttPete.\n\n## Using environment variables\n\nEnvironment variables allow you to reuse values across multiple tests.\n\n1. Go to "Environment Settings"\n2. Add key-value pairs for your variables\n3. Use `{{variable_name}}` in your tests to reference these variables\n\n## Chaining API requests\n\nYou can use the response from one API call in subsequent requests.\n\n1. Create a new test\n2. In the "Pre-request Script" tab, add code to extract data from a previous response\n3. Use this data in your current request\n\n## Writing test scripts\n\nTest scripts allow you to automate assertions on your API responses.\n\n1. In the "Tests" tab of your request\n2. Write JavaScript to assert expected values\n3. Use the `pm` object to access response data and make assertions\n\nExample:\n```javascript\npm.test("Status code is 200", function () {\n    pm.response.to.have.status(200);\n});\n```\n\nMaster these techniques to become an API testing expert with HttPete!',
        children: [],
        organizationId: 1,
        workspaceId: 1,
        authorId: 1,
        lastEditById: 1,
        created: new Date('2024-11-25T10:34:04.2345'),
        lastEdited: new Date('2024-11-25T10:34:04.2345')
    },
    {
        id: 3,
        type: 'document',
        title: 'Environment Variables Guide',
        text: '# Environment Variables in HttPete\n\nLearn how to effectively use environment variables to manage different configurations and sensitive data in your API tests.\n\n## What are Environment Variables?\n\nEnvironment variables are key-value pairs that can be used across your API tests. They help you:\n- Manage different environments (development, staging, production)\n- Store sensitive information securely\n- Maintain consistent values across multiple tests\n\n## Best Practices\n\n1. Never hardcode sensitive data\n2. Use descriptive variable names\n3. Document your variables\n4. Keep environment-specific values separate\n\nFollow these guidelines to make the most of environment variables in your API testing workflow.',
        children: [],
        organizationId: 1,
        workspaceId: 1,
        authorId: 1,
        lastEditById: 1,
        created: new Date('2024-11-24T15:20:00.0000'),
        lastEdited: new Date('2024-11-24T15:20:00.0000')
    }
];

export const mockGeneralDocs: GeneralDocument[] = [
    {
        id: 1,
        type: 'folder',
        title: 'General',
        text: '',
        children: [
            {
                id: 2,
                type: 'document',
                title: 'Getting Started',
                text: '# Getting Started\n\nWelcome to the documentation.',
                children: [],
                organizationId: -1,
                workspaceId: -1,
                authorId: -1,
                lastEditById: -1,
                created: new Date(),
                lastEdited: new Date()
            },
            {
                id: 3,
                type: 'document',
                title: 'API Overview',
                text: '# API Overview\n\nThis document provides an overview of the API.',
                children: [],
                organizationId: -1,
                workspaceId: -1,
                authorId: -1,
                lastEditById: -1,
                created: new Date(),
                lastEdited: new Date()
            }
        ],
        organizationId: -1,
        workspaceId: -1,
        authorId: -1,
        lastEditById: -1,
        created: new Date(),
        lastEdited: new Date()
    }
]; 