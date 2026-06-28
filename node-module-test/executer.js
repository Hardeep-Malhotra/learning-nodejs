// Yeh function kisi bhi module ko dynamically chalayega
function runMyModule(moduleName, userName) {
  console.log(
    `\n[Executor]: Abhi main '${moduleName}' module ko load kar raha hu...`,
  );

  // Run-time par module ko import kiya (Dynamic Require)
  const targetModule = require(`./${moduleName}`);

  // Module ke andar ke function ko execute kiya
  const result = targetModule.showDetails(userName);

  console.log(`[Executor]: Module se response mila -> "${result}"`);
}

// Is executor function ko bahar bhej rahe hain
module.exports = { runMyModule };
