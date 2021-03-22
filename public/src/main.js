import React from ’react’;
import ReactDOM from ’react-dom’;

const bootstrapReact =
() => ReactDOM.render(
React.createElement(’h3’, null, ’React in action !’),
document.getElementById(’insertReactHere’)
);


window.addEventListener( ’DOMContentLoaded’, bootstrapReact );
