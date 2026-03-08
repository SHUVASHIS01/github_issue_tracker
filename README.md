Answer of the questions:

    - 1️⃣ What is the difference between var, let, and const?
      **Answer:** `var` is function-scoped and allows redeclaration, often leading to unexpected behavior. `let` is block-scoped and allows reassignment but not redeclaration within the same scope. `const` is also block-scoped but prevents both reassignment and redeclaration, making it ideal for values that shouldn't change.
    - 2️⃣ What is the spread operator (...)?
      **Answer:** The spread operator `...` allows expanding elements of an iterable (like an array or string) or object properties into places where multiple elements or key-value pairs are expected. It is extremely useful for copying arrays, merging objects, or passing elements as individual function arguments.
    - 3️⃣ What is the difference between map(), filter(), and forEach()?
      **Answer:** 
      - `map()` iterates over an array, applies a callback function to each element, and returns a new array with the transformed results.
      - `filter()` iterates over an array and returns a new array containing only the elements that pass a specific condition.
      - `forEach()` simply executes a function on every item in an array but does not return a new array (it returns `undefined`), making it useful mainly for side effects.
    - 4️⃣ What is an arrow function?
      **Answer:** An arrow function is a more concise syntax for writing function expressions in ES6 (`() => {}`). Unlike regular functions, arrow functions do not have their own `this` binding; instead, they inherit `this` from the surrounding lexical scope.
    - 5️⃣ What are template literals?
      **Answer:** Template literals are strings enclosed in backticks (\`) instead of regular quotes. They allow for easy string interpolation and embedding of expressions using the `${expression}` syntax, as well as native support for multi-line strings without needing newline characters.

