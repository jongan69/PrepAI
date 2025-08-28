#!/usr/bin/env node

const swaggerJsdoc = require('swagger-jsdoc');
const fs = require('fs');
const path = require('path');

// Import the swagger configuration
const swaggerConfig = require('../swagger-config.js');

console.log('🔍 Generating Swagger documentation...');

try {
  // Generate the Swagger specification
  const specs = swaggerJsdoc(swaggerConfig);

  // Write the specification to a JSON file
  const outputPath = path.join(__dirname, '..', 'swagger.json');
  fs.writeFileSync(outputPath, JSON.stringify(specs, null, 2));

  console.log('✅ Swagger documentation generated successfully!');
  console.log(`📄 Documentation saved to: ${outputPath}`);
  console.log(`🌐 You can view it at: http://localhost:8081/api/docs`);
  console.log(`📊 Total endpoints documented: ${Object.keys(specs.paths || {}).length}`);

  // Log the documented endpoints
  if (specs.paths) {
    console.log('\n📋 Documented endpoints:');
    Object.keys(specs.paths).forEach((path) => {
      const methods = Object.keys(specs.paths[path]);
      methods.forEach((method) => {
        const endpoint = specs.paths[path][method];
        console.log(`  ${method.toUpperCase()} ${path} - ${endpoint.summary || 'No summary'}`);
      });
    });
  }
} catch (error) {
  console.error('❌ Error generating Swagger documentation:', error);
  process.exit(1);
}
