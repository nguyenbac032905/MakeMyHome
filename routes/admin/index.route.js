const systemConfig = require("../../config/system");
const productRoutes = require("./product.route");
const productCategoryRoutes = require("./productCategory.route");
const adminRoutes = require("./admin.route");
const userRoutes = require("./user.route");
const orderRoutes = require("./order.route");
const blogRoutes = require("./blog.route");
const blogCategoryRoutes = require("./blogCategory.route");
module.exports = (app) => {
    const api = "/api/v1";
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(api+PATH_ADMIN+"/products",productRoutes);
    app.use(api+PATH_ADMIN+"/product-category",productCategoryRoutes);
    app.use(api+PATH_ADMIN+"/admin-accounts",adminRoutes);
    app.use(api+PATH_ADMIN+"/users",userRoutes);
    app.use(api+PATH_ADMIN+"/orders",orderRoutes);
    app.use(api+PATH_ADMIN+"/blogs",blogRoutes);
    app.use(api+PATH_ADMIN+"/blog-category",blogCategoryRoutes);
}