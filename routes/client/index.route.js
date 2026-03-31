const productRoutes = require("./product.route");
const productCategoryRoutes = require("./productCategory.route");
const userRoutes = require("./user.route");
const cartRoutes = require("./cart.route");
const orderRoutes = require("./order.route");
const blogRoutes = require("./blog.route");
const blogCategoryRoutes = require("./blogCategory.route");
const authMiddleware = require("../../middlewares/client/auth.middleware");
module.exports = (app) => {
    const api = "/api/v1";
    app.use(api+"/products",productRoutes);
    app.use(api+"/product-category",productCategoryRoutes);
    app.use(api+"/users",authMiddleware.auth,userRoutes);
    app.use(api+"/cart",cartRoutes);
    app.use(api+"/orders",orderRoutes);
    app.use(api+"/blogs",blogRoutes);
    app.use(api+"/blog-category",blogCategoryRoutes);
}