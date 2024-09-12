import "dotenv/config";
import { db } from "@/db-drizzle";
import { Category } from "@/db-drizzle/migrations/schema";

async function main() {
  await db.insert(Category).values({
    name: "Computer Science"
  });
}

main();

// { name: "Computer Science" },
//         { name: "Music" },
//         { name: "Fitness" },
//         { name: "Photography" },
//         { name: "Accounting" },
//         { name: "Engineering" },
//         { name: "Filming" },