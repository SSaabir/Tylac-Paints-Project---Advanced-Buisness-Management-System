
import React from 'react';
import { Button, Card, List } from 'flowbite-react';

export default function Instruction() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          How to Use Tylac Waterproof Paint
        </h1>

        {/* Step-by-Step Instructions */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Step-by-Step Guide</h2>
          <List>
            <List.Item>
              <strong>Step 1: Surface Preparation</strong>
              <p className="text-gray-600">
                Clean the surface thoroughly to remove dirt, dust, and grease. Use a mild detergent
                and water, then allow the surface to dry completely.
              </p>
            </List.Item>
            <List.Item>
              <strong>Step 2: Priming (Optional)</strong>
              <p className="text-gray-600">
                For best results, apply a primer suitable for outdoor surfaces. Allow the primer to
                dry as per the manufacturer's instructions.
              </p>
            </List.Item>
            <List.Item>
              <strong>Step 3: Stir the Paint</strong>
              <p className="text-gray-600">
                Stir the paint thoroughly before use to ensure an even consistency.
              </p>
            </List.Item>
            <List.Item>
              <strong>Step 4: Application</strong>
              <p className="text-gray-600">
                Apply the paint using a brush, roller, or sprayer. For best results, apply in thin,
                even coats. Allow the first coat to dry completely before applying a second coat.
              </p>
            </List.Item>
            <List.Item>
              <strong>Step 5: Drying Time</strong>
              <p className="text-gray-600">
                Allow the paint to dry for at least 24 hours before exposing it to moisture or heavy
                use.
              </p>
            </List.Item>
            <List.Item>
              <strong>Step 6: Clean Up</strong>
              <p className="text-gray-600">
                Clean your tools with soap and water immediately after use.
              </p>
            </List.Item>
          </List>
        </Card>

        {/* Safety Precautions */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Safety Precautions</h2>
          <List>
            <List.Item>
              Wear protective gloves and eyewear while handling the paint.
            </List.Item>
            <List.Item>
              Work in a well-ventilated area to avoid inhaling fumes.
            </List.Item>
            <List.Item>
              Keep the paint out of reach of children and pets.
            </List.Item>
            <List.Item>
              Dispose of any leftover paint and containers responsibly.
            </List.Item>
          </List>
        </Card>

        {/* Tips for Best Results */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">Tips for Best Results</h2>
          <List>
            <List.Item>
              Apply the paint in dry weather conditions with temperatures between 50°F and 90°F.
            </List.Item>
            <List.Item>
              Avoid painting in direct sunlight to prevent premature drying.
            </List.Item>
            <List.Item>
              Use high-quality brushes or rollers for a smooth finish.
            </List.Item>
            <List.Item>
              Store the paint in a cool, dry place when not in use.
            </List.Item>
          </List>
        </Card>
      </div>
    </div>
  );
}