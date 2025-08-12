export async function executeSandboxedFunction(
  code: string, 
  context: Record<string, any> = {}
): Promise<any> {
  try {
    // Create a sandboxed function that has access to safe globals only
    const safeGlobals = {
      console: {
        log: (...args: any[]) => console.log('[User Code]:', ...args),
        warn: (...args: any[]) => console.warn('[User Code]:', ...args),
        error: (...args: any[]) => console.error('[User Code]:', ...args),
      },
      Math,
      Date,
      JSON,
      String,
      Number,
      Boolean,
      Array,
      Object,
      RegExp,
      setTimeout: undefined, // Disable async operations
      setInterval: undefined,
      fetch: undefined,
      XMLHttpRequest: undefined,
      eval: undefined,
      Function: undefined,
      ...context // Add the passed context (like form values)
    };

    // Wrap the user code in a function that returns the result
    const wrappedCode = `
      (function() {
        "use strict";
        try {
          ${code}
        } catch (error) {
          throw new Error('User code error: ' + error.message);
        }
      })()
    `;

    // Create a new function with restricted scope
    const func = new Function(
      ...Object.keys(safeGlobals),
      `return ${wrappedCode}`
    );

    // Execute the function with the safe globals
    const result = func(...Object.values(safeGlobals));
    
    return result;
  } catch (error) {
    console.error('Sandboxed execution error:', error);
    throw new Error(
      error instanceof Error 
        ? `Execution failed: ${error.message}` 
        : 'Unknown execution error'
    );
  }
}

export function isSafeCode(code: string): boolean {
  // Basic checks for dangerous patterns
  const dangerousPatterns = [
    /eval\s*\(/,
    /Function\s*\(/,
    /setTimeout/,
    /setInterval/,
    /fetch\s*\(/,
    /XMLHttpRequest/,
    /document\./,
    /window\./,
    /global\./,
    /process\./,
    /require\s*\(/,
    /import\s+/,
    /export\s+/,
    /__proto__/,
    /constructor/,
    /prototype/,
  ];

  return !dangerousPatterns.some(pattern => pattern.test(code));
}
