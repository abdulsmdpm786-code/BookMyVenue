import express from "express"
import listingRoutes from "./listingRoutes.js"
import messageRoutes from "./messageRoute.js"
import adminMessageRoutes from "./adminMessageRoutes.js"

const v2Routes = express.Router()


v2Routes.use("/list", listingRoutes)
v2Routes.use("/message", messageRoutes)
v2Routes.use("/adminMessage", adminMessageRoutes)

export default v2Routes