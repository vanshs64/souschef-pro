// File: src/components/RenderTree.tsx

// Define the Instruction type
type Instruction = string | Instruction[];

// Global step counter
let stepCounter = 1;

// Recursive function to render the tree
export const renderTree = (steps: Instruction[], level = 0): JSX.Element => {
  return (
    <div className="tree-level">
      {steps.map((step, index) => {
        const currentStepNumber = stepCounter++;
        return (
          <div className="tree-node-container" key={`${level}-${index}`}>
            <div className="step-label">Step {currentStepNumber}</div>
            <div className="tree-node">
              {Array.isArray(step) ? null : step}
            </div>
            {Array.isArray(step) && (
              <div className="tree-branch">
                <div className="tree-line"></div>
                {renderTree(step, level + 1)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};