// import type { Express } from "express";
// import { createServer, type Server } from "http";
// import { storage } from "./storage";
// import { insertContactSchema } from "@shared/schema";
// import { z } from "zod";

// export async function registerRoutes(app: Express): Promise<Server> {
//   // Contact form submission
//   app.post("/api/contact", async (req, res) => {
//     try {
//       const validatedData = insertContactSchema.parse(req.body);
//       const contact = await storage.createContact(validatedData);
//       res.status(201).json({ 
//         message: "Contact form submitted successfully", 
//         contact: contact 
//       });
//     } catch (error) {
//       console.error("Error in /api/contact:", error); // Log the error for debugging
//       if (error instanceof z.ZodError) {
//         res.status(400).json({ 
//           message: "Invalid form data", 
//           errors: error.errors 
//         });
//       } else {
//         res.status(500).json({ 
//           message: "Internal server error" 
//         });
//       }
//     }
//   });

//   // Get all contacts (for admin purposes)
//   app.get("/api/contacts", async (req, res) => {
//     try {
//       const contacts = await storage.getContacts();
//       res.json(contacts);
//     } catch (error) {
//       console.error("Error in /api/contacts:", error); // Log the error for debugging
//       res.status(500).json({ 
//         message: "Internal server error" 
//       });
//     }
//   });

//   const httpServer = createServer(app);
//   return httpServer;
// }


import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertUserSchema } from "@shared/schema";
import { z } from "zod";
import bcrypt from "bcryptjs";

// Extend Express session type
declare module "express-session" {
  interface SessionData {
    userId?: number;
    isAuthenticated?: boolean;
  }
}

// Authentication middleware
const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session?.isAuthenticated) {
    return next();
  }
  res.status(401).json({ message: "Authentication required" });
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Login endpoint
  app.post("/api/login", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      const user = await storage.getUserByUsername(validatedData.username);
      
      if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      
      const isValid = await bcrypt.compare(validatedData.password, user.password);
      if (!isValid) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      
      req.session.userId = user.id;
      req.session.isAuthenticated = true;
      
      res.json({ message: "Login successful", user: { id: user.id, username: user.username } });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid form data", errors: error.errors });
      } else {
        console.error("Error in /api/login:", error); // Log the error for debugging
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Logout endpoint
  app.post("/api/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Could not log out" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  // Check authentication status
  app.get("/api/auth/check", (req, res) => {
    if (req.session?.isAuthenticated) {
      res.json({ isAuthenticated: true, userId: req.session.userId });
    } else {
      res.json({ isAuthenticated: false });
    }
  });

  // Registration endpoint
  app.post("/api/register", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);

      // Check if username already exists
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(409).json({ message: "Username already taken" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(validatedData.password, 10);

      // Create the user
      const newUser = await storage.createUser({
        username: validatedData.username,
        password: hashedPassword,
      });

      res.status(201).json({
        message: "User registered successfully",
        user: { id: newUser.id, username: newUser.username }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid form data", errors: error.errors });
      } else {
        console.error("Error in /api/register:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.status(201).json({ 
        message: "Contact form submitted successfully", 
        contact: contact 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          message: "Internal server error" 
        });
      }
    }
  });

  // Get all contacts (protected route)
  app.get("/api/contacts", requireAuth, async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ 
        message: "Internal server error" 
      });
    }
  });

  // Mark contact as read
  app.post("/api/contacts/:id/read", async (req, res) => {
    const id = Number(req.params.id);
    try {
      await storage.markContactAsRead(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to mark as read" });
    }
  });

  // Get all users (for admin purposes)
  app.get("/api/users", async (req, res) => {
    try {
      const users = await storage.getUsers();
      // Only return id and username, not password
      res.json(users.map(u => ({ id: u.id, username: u.username })));
    } catch (error) {
      console.error("Error in /api/users:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
