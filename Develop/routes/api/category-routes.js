const router = require("express").Router();
const { Category, Product } = require("../../models");
const sequelize = require("sequelize");

// The `/api/categories` endpoint

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
      res.status(404).json({ message: "Please select a valid Category ID." });
      return;
    }

    res.status(200).json(CategoryByID);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const createCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(createCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(
      { category_name: req.body.category_name },
      { where: { id: req.params.id } }
    );
    res.status(200).send(updateCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: { id: req.params.id },
    });
    if (!deleteCategory) {
      res.status(404).json({ message: "Please select a valid Category ID." });
      return;
    }
    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
