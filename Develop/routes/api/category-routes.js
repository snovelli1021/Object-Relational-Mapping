const router = require("express").Router();
const { Category, Product } = require("../../models");
const sequelize = require("sequelize");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  router.get("/", async (req, res) => {
    try {
      const CategoryAll = await Category.findAll({
        attributes: ["id", "category_name"],
        include: {
          model: Product,
          attributes: ["product_name"],
        },
      });
      res.status(200).json(CategoryAll);
    } catch (err) {
      res.status(500).json(err);
    }
  });
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  router.get("/:id", async (req, res) => {
    try {
      const CategoryByID = await Category.findByPk(req.params.id, {
        include: {
          model: Product,
          attributes: ["product_name"],
        },
      });

      if (!CategoryByID) {
        res.status(404).json({ message: "No Category by that id number" });
        return;
      }

      res.status(200).json(CategoryByID);
    } catch (err) {
      res.status(500).json(err);
    }
  });
});

router.post("/", (req, res) => {
  // create a new category
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
