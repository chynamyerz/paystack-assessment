# Paystack assessment project

This project serves as part of the interview process at Paystack.

# Problem statement

```
Task
Your task is to build a small shopping cart application. 
Assume that you have a list of products in a category (eg. food or clothing) 
which contain a set of standard attributes (sku, selling price, stock level, expiration date etc.) 
which a user can:

1. add to, 
2. remove from and 
3. edit inside a cart.

Parameters
You are required to use NodeJS (using either JavaScript or TypeScript)

You are to make use of a MySQL database

We do not require the use of any UI - interacting via a tool like PostMan/curl is sufficient to interrogate the API.

You must be able to walk us through the solution and it should be sufficiently documented.

This solution needs to be built in a private GitHub repository so that we can track the evolution of the solution and it's commit history

Bonus points
For optional bonus points, feel free to introduce any addition to the solution that you think demonstrates your abilities as an experienced engineer. 
This could be a specific technology, a solution design consideration, some performance optimization etc. 
This is a chance for you to stand out.
```

# Solution plan

## Architectural design

### Technology used

A ssuming the above mentioned , NodeJS and MySQL are installed.

The technology used are as follows:

1. [Prisma](https://www.prisma.io/) an open source next-generation ORM
2. [Graphql-Yoga](https://github.com/dotansimha/graphql-yoga) a fully-featured GraphQL Server with focus on easy setup, performance & great developer experience
3. [Graphql-Tools](https://github.com/ardatan/graphql-tools) a tool for mananging GraphQL schema

### Database schema

Our database will be consisting of 4 tables: 

1. `Category`
2. `Product`
3. `User`
4. `CartProduct`

The entity relationship is as follows:

1. A Product belongs to a Category
2. A User can have Product/s
3. A CartProduct detail the User Product/s in a Cart

This can be visualized in the prisma format as follows:

```prisma
model Category {
  id       Int       @id @default(autoincrement())
  category String    @db.VarChar(255)
  products Product[]
}

model Product {
  id         Int      @id @default(autoincrement())
  name       String
  price      Float
  cotegory   Category @relation(fields: [categoryId], references: [id])
  categoryId Int      @unique
}

model User {
  id           Int           @id @default(autoincrement())
  email        String        @unique
  name         String
  cartProducts CartProduct[]
}

model CartProduct {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  user      User     @relation(fields: [userId], references: [id])
  userId    Int      @unique
}
```

