import { relations } from "drizzle-orm";
import { pgTable, serial, varchar, decimal, integer, text } from "drizzle-orm/pg-core";

export const menuItems = pgTable('menu_items', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name', { length: 256 }).notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).$type<number>().notNull(),
  categoryId: integer('category_id').references(() => menuCategories.id),
  status: varchar('status', { length: 256 }).notNull(),
  description: varchar('description', { length: 500 }),
}
);

export const menuItemsRelations = relations(menuItems, ({ one }) => ({
  category: one(menuCategories, {
    fields: [menuItems.categoryId],
    references: [menuCategories.id]
  })
}))

export const menuCategories = pgTable('menu_categories', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name', { length: 256 }).notNull(),
  description: varchar('description', { length: 500 }),
  image: varchar('image', { length: 500 })

})

export const images = pgTable('images', {
  id: serial('id').primaryKey().notNull(),
  url: varchar('image', { length: 1000 })
})

export const menuCategoriesRelations = relations(menuCategories, ({ many }) => ({
  menuItems: many(menuItems)
}))

export type Dish = typeof menuItems.$inferSelect
export type Category = typeof menuCategories.$inferSelect



