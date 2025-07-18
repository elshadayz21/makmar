// import { users, contacts, type User, type InsertUser, type Contact, type InsertContact } from "@shared/schema";

// export interface IStorage {
//   getUser(id: number): Promise<User | undefined>;
//   getUserByUsername(username: string): Promise<User | undefined>;
//   createUser(user: InsertUser): Promise<User>;
//   createContact(contact: InsertContact): Promise<Contact>;
//   getContacts(): Promise<Contact[]>;
// }

// export class MemStorage implements IStorage {
//   private users: Map<number, User>;
//   private contacts: Map<number, Contact>;
//   private currentUserId: number;
//   private currentContactId: number;

//   constructor() {
//     this.users = new Map();
//     this.contacts = new Map();
//     this.currentUserId = 1;
//     this.currentContactId = 1;
//   }

//   async getUser(id: number): Promise<User | undefined> {
//     return this.users.get(id);
//   }

//   async getUserByUsername(username: string): Promise<User | undefined> {
//     return Array.from(this.users.values()).find(
//       (user) => user.username === username,
//     );
//   }

//   async createUser(insertUser: InsertUser): Promise<User> {
//     const id = this.currentUserId++;
//     const user: User = { ...insertUser, id };
//     this.users.set(id, user);
//     return user;
//   }

//   async createContact(insertContact: InsertContact): Promise<Contact> {
//     const id = this.currentContactId++;
//     const contact: Contact = { 
//       ...insertContact, 
//       id, 
//       createdAt: new Date() 
//     };
//     this.contacts.set(id, contact);
//     return contact;
//   }

//   async getContacts(): Promise<Contact[]> {
//     return Array.from(this.contacts.values());
//   }
// }

// export const storage = new MemStorage();

import { db } from "./db";
import { contacts, users, type Contact, type InsertContact, type User } from "@shared/schema";
import { eq } from "drizzle-orm";

export const storage = {
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db.insert(contacts).values(insertContact).returning();
    return contact;
  },

  async getContacts(): Promise<Contact[]> {
    return db.select().from(contacts);
  },

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  },

  async createUser(insertUser: { username: string; password: string }): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  },

  async getUsers(): Promise<User[]> {
    return db.select().from(users);
  },
};