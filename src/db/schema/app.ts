import {integer, pgTable, varchar,timestamp} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";

const timestamps = {
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().$onUpdate(()=>new Date()).notNull()
}

export const departments =pgTable('departments',{
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    code: varchar('code',{length:50}).notNull().unique(),
    name: varchar('name',{length:250}).notNull(),
    description: varchar('description',{length:250}),
    ...timestamps
})


export const subjects =pgTable('subjects',{
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    departmentId: integer('department_id').notNull().references(()=> departments.id, {onDelete:'restrict'}),
    name: varchar('name',{length:250}).notNull(),
    code: varchar('code',{length:50}).notNull().unique(),
    description: varchar('description',{length:250}),
    ...timestamps
})

export const departmentRelations = relations(departments,({many})=>({subjects:many(subjects)}));
export const subjectRelations = relations(subjects,({one,many})=>({
    departments: one(departments,{fields:[subjects.departmentId], references:[departments.id]})
}));

export type Departments =typeof departments.$inferSelect;
export type NewDepartments =typeof departments.$inferInsert;

export type Subject =typeof subjects.$inferSelect;
export type NewSubject =typeof subjects.$inferInsert;