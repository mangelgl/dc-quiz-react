# Getting Started with React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Information

### useState(initialState)

useState es un Hook de React que permite agregar una variable de estado a tu componente.

#### Referencia

Llama a useState en el nivel superior de tu componente para declarar una variable de estado. \
Es buena idea tener múltiples variables de estado si no se encuentran relacionadas entre sí.

```react
import { useState } from 'react';

function MyComponent() {
  const [age, setAge] = useState(28);
  const [name, setName] = useState('Taylor');
  const [todos, setTodos] = useState(() => createTodos());
```

La convención es nombrar variables de estado como `[algo, setAlgo]` usando desestructuración de arrays.

### useReducer(reducer, initialArg, init?)

useReducer es un Hook de React que te permite agregar un reducer a tu componente. Reduce la lógica en tus proyectos más complejos. \
Los componentes con muchas actualizaciones de estado distribuidas a través de varios controladores de eventos pueden ser agobiantes. Para estos casos, puedes consolidar toda la lógica de actualización de estado fuera del componente en una única función, llamada reducer. \

Parámetros:

- La función reductora que debe devolver el estado inicial. Debe tomar el estado y la acción como argumentos y debe devolver el siguiente estado.
- El valor inicial del estado.

Devuelve:

- El estado actual.
- La función dispatch que permite actualizar el estado a un valor diferente y activar una nueva renderización.

```react
const [state, dispatch] = useReducer(reducer, { age: 42 });

function handleClick() {
  dispatch({ type: 'incremented_age' });
  // ...
}
```
