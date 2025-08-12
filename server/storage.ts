import { type Schema, type InsertSchema } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getSchema(id: string): Promise<Schema | undefined>;
  getSchemaByName(name: string): Promise<Schema | undefined>;
  getAllSchemas(): Promise<Schema[]>;
  createSchema(schema: InsertSchema): Promise<Schema>;
  updateSchema(id: string, schema: Partial<InsertSchema>): Promise<Schema | undefined>;
  deleteSchema(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private schemas: Map<string, Schema>;

  constructor() {
    this.schemas = new Map();
    this.seedDefaultSchemas();
  }

  private seedDefaultSchemas() {
    const defaultSchemas = [
      {
        name: "Contact Form",
        description: "Basic contact form with validation",
        content: {
          components: [
            {
              type: "form",
              id: "contact-form",
              props: {
                title: "Contact Us",
                fields: [
                  {
                    label: "Full Name",
                    name: "fullName",
                    type: "text",
                    required: true,
                    placeholder: "Enter your full name"
                  },
                  {
                    label: "Email Address",
                    name: "email",
                    type: "email",
                    required: true,
                    placeholder: "your@email.com",
                    validation: {
                      pattern: "^[^@]+@[^@]+\\.[^@]+$",
                      message: "Please enter a valid email address"
                    }
                  },
                  {
                    label: "Message",
                    name: "message",
                    type: "textarea",
                    required: true,
                    placeholder: "Tell us about your project..."
                  }
                ],
                submitText: "Send Message",
                onSubmit: "console.log('Form submitted:', values); return { success: 'Message sent successfully!' };"
              }
            }
          ]
        }
      },
      {
        name: "Landing Page",
        description: "Hero section with CTA form",
        content: {
          components: [
            {
              type: "text",
              id: "hero-title",
              props: {
                variant: "h1",
                content: "Welcome to Dynamic Interface Builder",
                className: "text-4xl font-bold text-gray-900 mb-4"
              }
            },
            {
              type: "text",
              id: "hero-subtitle",
              props: {
                variant: "p",
                content: "Build beautiful interfaces with JSON schemas and live preview.",
                className: "text-lg text-gray-600 mb-8"
              }
            },
            {
              type: "image",
              id: "hero-image",
              props: {
                src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
                alt: "Team collaborating on a project with laptops and documents",
                className: "rounded-xl shadow-lg w-full h-auto mt-8"
              }
            }
          ]
        }
      }
    ];

    defaultSchemas.forEach(schema => {
      const id = randomUUID();
      const fullSchema: Schema = {
        ...schema,
        id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.schemas.set(id, fullSchema);
    });
  }

  async getSchema(id: string): Promise<Schema | undefined> {
    return this.schemas.get(id);
  }

  async getSchemaByName(name: string): Promise<Schema | undefined> {
    return Array.from(this.schemas.values()).find(
      (schema) => schema.name === name,
    );
  }

  async getAllSchemas(): Promise<Schema[]> {
    return Array.from(this.schemas.values()).sort(
      (a, b) => (b.updatedAt?.getTime() || 0) - (a.updatedAt?.getTime() || 0)
    );
  }

  async createSchema(insertSchema: InsertSchema): Promise<Schema> {
    const id = randomUUID();
    const schema: Schema = { 
      ...insertSchema,
      description: insertSchema.description || null,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.schemas.set(id, schema);
    return schema;
  }

  async updateSchema(id: string, updateData: Partial<InsertSchema>): Promise<Schema | undefined> {
    const existing = this.schemas.get(id);
    if (!existing) return undefined;

    const updated: Schema = {
      ...existing,
      ...updateData,
      updatedAt: new Date(),
    };
    this.schemas.set(id, updated);
    return updated;
  }

  async deleteSchema(id: string): Promise<boolean> {
    return this.schemas.delete(id);
  }
}

export const storage = new MemStorage();
