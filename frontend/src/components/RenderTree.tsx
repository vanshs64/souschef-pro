import './styles/RenderTree.css';

// File: src/components/RenderTree.tsx

// Define the Instruction type
type Instruction = string | Instruction[];

// Global step counter
let stepCounter = 1;

// Recursive function to render the tree
const RenderTree = (steps: Instruction[], level = 0): JSX.Element => {
  return (
    <div className="tree-level">
      {steps.map((step, index) => {
        const currentStepNumber = stepCounter++;
        return (
          <div className="tree-node-container" key={`${level}-${index}`}>
            {/* Step Label */}
            <div className="step-label">Step {currentStepNumber}</div>

            {/* Step Content */}
            <div className="tree-node">
              {Array.isArray(step) ? null : step}
            </div>

            {/* Render Parallel Steps Side by Side */}
            {Array.isArray(step) && (
              <div className="tree-branch">
                {RenderTree(step, level + 1)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RenderTree