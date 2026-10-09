import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import { index } from "./db/index.js";
import { demoUsers } from "./db/schema/index.js";

async function main() {
  console.log("Performing CRUD operations...");
  const [newUser] = await index.insert(demoUsers).values({
    name: "Admin User",
    email: `admin-${randomUUID()}@example.com`,
  }).returning();
  if (!newUser) throw new Error("Failed to create user");
  console.log("CREATE: New user created:", newUser);

  const [foundUser] = await index.select().from(demoUsers)
    .where(eq(demoUsers.id, newUser.id));
  if (!foundUser) throw new Error("Failed to read user");
  console.log("READ: Found user:", foundUser);

  const [updatedUser] = await index.update(demoUsers)
    .set({ name: "Super Admin" })
    .where(eq(demoUsers.id, newUser.id)).returning();
  if (!updatedUser) throw new Error("Failed to update user");
  console.log("UPDATE: User updated:", updatedUser);

  const [deletedUser] = await index.delete(demoUsers)
    .where(eq(demoUsers.id, newUser.id)).returning();
  if (!deletedUser) throw new Error("Failed to delete user");
  console.log("DELETE: User deleted.");
  console.log("CRUD operations completed successfully.");
}

main().catch(() => {
  console.error("CRUD failed. Check DATABASE_URL, database access, and migrations.");
  process.exitCode = 1;
});
