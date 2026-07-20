import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth.routes.js"
import productRoutes from "./routes/product.routes.js"
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use("/auth", authRoutes)
app.use("/product", productRoutes)

export default app
