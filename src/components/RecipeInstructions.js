import React from "react";

const RecipeInstructions = ({ instructions }) => (
  <div className="instructions">
    <h2>Instructions</h2>
    <div className="steps">
      {instructions.map((instruction, ix) => (
        <div className="step" key={ix}>
          <div className="number">{ix + 1}</div>
          <div className="text">{instruction}</div>
        </div>
      ))}
    </div>
  </div>
);

export default RecipeInstructions;
