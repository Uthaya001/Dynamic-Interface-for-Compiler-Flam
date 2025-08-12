import { z } from "zod";
import { UISchemaSchema } from "@shared/schema";

export function validateSchema(schema: any): { success: boolean; error?: string } {
  try {
    UISchemaSchema.parse(schema);
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      return {
        success: false,
        error: `${firstError.path.join('.')}: ${firstError.message}`
      };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown validation error"
    };
  }
}

export function validateJSON(jsonString: string): { success: boolean; error?: string; data?: any } {
  try {
    const parsed = JSON.parse(jsonString);
    return { success: true, data: parsed };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Invalid JSON"
    };
  }
}
