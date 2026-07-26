import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.routes.js"
import productRoutes from "./routes/product.routes.js"
import categoryRoutes from "./routes/category.routes.js"
import cartRoutes from "./routes/cart.routes.js"
import orderRoutes from "./routes/order.routes.js"

const app = express()

app.use(express.json())

// TODO: Fix the CORS issue
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001")
  res.header("Access-Control-Allow-Credentials", "true")
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization")
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  )

  if (req.method === "OPTIONS") {
    return res.sendStatus(204)
  }

  next()
})
app.use(cookieParser())

app.use("/auth", authRoutes)
app.use("/products", productRoutes)
app.use("/categories", categoryRoutes)
app.use("/cart", cartRoutes)
app.use("/order", orderRoutes)

export default app
