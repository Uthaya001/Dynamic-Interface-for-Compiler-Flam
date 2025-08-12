import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSchemaSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all schemas
  app.get("/api/schemas", async (req, res) => {
    try {
      const schemas = await storage.getAllSchemas();
      res.json(schemas);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch schemas" });
    }
  });

  // Get schema by ID
  app.get("/api/schemas/:id", async (req, res) => {
    try {
      const schema = await storage.getSchema(req.params.id);
      if (!schema) {
        return res.status(404).json({ message: "Schema not found" });
      }
      res.json(schema);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch schema" });
    }
  });

  // Create new schema
  app.post("/api/schemas", async (req, res) => {
    try {
      const validated = insertSchemaSchema.parse(req.body);
      const schema = await storage.createSchema(validated);
      res.status(201).json(schema);
    } catch (error) {
      res.status(400).json({ message: "Invalid schema data" });
    }
  });

  // Update schema
  app.put("/api/schemas/:id", async (req, res) => {
    try {
      const validated = insertSchemaSchema.partial().parse(req.body);
      const schema = await storage.updateSchema(req.params.id, validated);
      if (!schema) {
        return res.status(404).json({ message: "Schema not found" });
      }
      res.json(schema);
    } catch (error) {
      res.status(400).json({ message: "Invalid schema data" });
    }
  });

  // Delete schema
  app.delete("/api/schemas/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteSchema(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Schema not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete schema" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
