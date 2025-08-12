import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const schemas = pgTable("schemas", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  content: jsonb("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertSchemaSchema = createInsertSchema(schemas).pick({
  name: true,
  description: true,
  content: true,
});

export type InsertSchema = z.infer<typeof insertSchemaSchema>;
export type Schema = typeof schemas.$inferSelect;

// Component type definitions
export const ComponentFieldSchema = z.object({
  label: z.string(),
  name: z.string(),
  type: z.enum(['text', 'email', 'number', 'textarea', 'checkbox', 'select']),
  required: z.boolean().optional(),
  placeholder: z.string().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  options: z.array(z.string()).optional(),
  validation: z.object({
    pattern: z.string().optional(),
    message: z.string().optional(),
  }).optional(),
});

export const FormComponentSchema = z.object({
  type: z.literal('form'),
  id: z.string(),
  props: z.object({
    title: z.string().optional(),
    fields: z.array(ComponentFieldSchema),
    submitText: z.string().optional(),
    onSubmit: z.string().optional(),
    className: z.string().optional(),
  }),
});

export const TextComponentSchema = z.object({
  type: z.literal('text'),
  id: z.string(),
  props: z.object({
    variant: z.enum(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span']),
    content: z.string(),
    className: z.string().optional(),
  }),
});

export const ImageComponentSchema = z.object({
  type: z.literal('image'),
  id: z.string(),
  props: z.object({
    src: z.string(),
    alt: z.string(),
    className: z.string().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
  }),
});

export const ComponentSchema = z.union([
  FormComponentSchema,
  TextComponentSchema,
  ImageComponentSchema,
]);

export const UISchemaSchema = z.object({
  components: z.array(ComponentSchema),
});

export type ComponentField = z.infer<typeof ComponentFieldSchema>;
export type FormComponent = z.infer<typeof FormComponentSchema>;
export type TextComponent = z.infer<typeof TextComponentSchema>;
export type ImageComponent = z.infer<typeof ImageComponentSchema>;
export type Component = z.infer<typeof ComponentSchema>;
export type UISchema = z.infer<typeof UISchemaSchema>;
