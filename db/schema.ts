import { relations, sql } from "drizzle-orm";
import { pgTable, timestamp, serial, varchar, decimal, integer, boolean } from "drizzle-orm/pg-core";



export const applications = pgTable('applications', {

})


export const jobs = pgTable('jobs', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name', { length: 256 }).notNull(),
  isActive: boolean('is_active').notNull().default(false)
})


export const staff = pgTable('staff', {
  id: serial('id').primaryKey().notNull(),
  firstName: varchar('first_name', { length: 256 }).notNull(),
  lastName: varchar('last_name', { length: 256 }).notNull(),
  roleId: integer('role_id').references(() => roles.id),
  dob: timestamp('dob').default(sql`now()`).notNull(),
  joinedDate: timestamp('joined_date').default(sql`now()`).notNull()
})

export const staffRelations = relations(staff, ({ one }) => ({
  role: one(roles, {
    fields: [staff.roleId],
    references: [roles.id]
  })
}))


export const roles = pgTable('roles', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name', { length: 256 }).notNull(),
})


export const rolesRelations = relations(roles, ({ many }) => ({
  staff: many(staff)
}))


export const dishes = pgTable('dishes', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name', { length: 256 }).notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).$type<number>().notNull(),
  categoryId: integer('category_id').references(() => menuCategories.id),
  status: varchar('status', { length: 256 }).notNull(),
  description: varchar('description', { length: 500 }),
}
);

export const dishesRelations = relations(dishes, ({ one }) => ({
  category: one(menuCategories, {
    fields: [dishes.categoryId],
    references: [menuCategories.id]
  })
}))

export const menuCategories = pgTable('menu_categories', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name', { length: 256 }).notNull(),
  description: varchar('description', { length: 500 }),
  image: varchar('image', { length: 500 })

})

export const menuCategoriesRelations = relations(menuCategories, ({ many }) => ({
  dishes: many(dishes)
}))

export const images = pgTable('images', {
  id: serial('id').primaryKey().notNull(),
  url: varchar('image', { length: 1000 })
})


export type Job = typeof jobs.$inferSelect
export type NewJob = typeof jobs.$inferInsert
export type Staff = typeof staff.$inferSelect
export type NewStaff = typeof staff.$inferInsert
export type NewRole = typeof roles.$inferInsert
export type Role = typeof roles.$inferSelect
export type Dish = typeof dishes.$inferSelect
export type NewDish = typeof dishes.$inferInsert
export type Category = typeof menuCategories.$inferSelect



