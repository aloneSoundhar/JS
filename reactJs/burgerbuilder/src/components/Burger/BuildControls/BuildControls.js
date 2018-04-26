import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'},
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    {controls.map(cntrl => {
      return <BuildControl 
        key={cntrl.label} 
        label={cntrl.label}
        added = {() => props.ingredientAdded(cntrl.type)}
        />;
    })}
  </div>
);

export default buildControls;
