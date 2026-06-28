// Import the console module.
// (This is optional because console is already available globally in Node.js.)
// It is used here only for learning purposes.
const { log } = require("console");

// Import the built-in Path module.
// The Path module is used to work with file and directory paths.
const path = require("path");

/* ==========================================================================
   1. path.join()
   ==========================================================================

   Purpose:
   - Joins multiple path segments into a single path.
   - Automatically uses the correct path separator for the operating system.
     Windows  -> \
     Linux/Mac -> /

   Syntax:
      path.join(path1, path2, path3, ...)

*/

// const result = path.join("src", "controller", "authController.js");

// console.log(result);

// Output:
// src/controller/authController.js

/* ==========================================================================
   2. path.resolve()
   ==========================================================================

   Purpose:
   - Converts a relative path into an absolute path.
   - Resolves the path based on the current working directory.

   Syntax:
      path.resolve(path1, path2, ...)

*/

// const result = path.resolve("public", "index.html");

// console.log(result);

// Example Output:
// C:\Users\Rahul\Project\public\index.html
// (The output depends on your current project location.)

/* ==========================================================================
   3. path.basename()
   ==========================================================================

   Purpose:
   - Returns only the file name from a complete file path.
   - Removes all directory information.

   Syntax:
      path.basename(filePath)

*/

// const file = path.basename("/users/rahul/docs/resume.pdf");

// console.log(file);

// Output:
// resume.pdf

/* ==========================================================================
   4. path.extname()
   ==========================================================================

   Purpose:
   - Returns the extension of a file.

   Syntax:
      path.extname(filePath)

*/

// const file = path.extname("/users/rahul/docs/resume.pdf");

// console.log(file);

// Output:
// .pdf

/* ==========================================================================
   5. path.parse()
   ==========================================================================

   Purpose:
   - Breaks a file path into an object containing useful information.

   Returned Properties:
      root → Root directory
      dir  → Directory path
      base → File name with extension
      ext  → File extension
      name → File name without extension

   Syntax:
      path.parse(filePath)

*/

// const info = path.parse("/users/rahul/docs/resume.pdf");

// console.log(info);

/*
Output:

{
  root: '/',
  dir: '/users/rahul/docs',
  base: 'resume.pdf',
  ext: '.pdf',
  name: 'resume'
}
*/

/* ==========================================================================
   6. path.relative()
   ==========================================================================

   Purpose:
   - Returns the relative path from one location to another.

   Syntax:
      path.relative(fromPath, toPath)

*/

// Starting location
const fromPath = "/users/rahul/app/src";

// Destination location
const toPath = "/users/rahul/pictures/logo.png";

// console.log(path.relative(fromPath, toPath));

// Output:
// ../../pictures/logo.png

/* ==========================================================================
   7. path.normalize()
   ==========================================================================

   Purpose:
   - Cleans and normalizes a file path.
   - Removes unnecessary separators.
   - Resolves "." (current directory).
   - Resolves ".." (parent directory).

   Syntax:
      path.normalize(path)

*/

const dirtyPath = "/users/rahul//projects/../docs/./index.js";

console.log(path.normalize(dirtyPath));

// Output:
// /users/rahul/docs/index.js
