const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// find all tags
// be sure to include its associated Product data
router.get("/", async (req, res) => {
  try {
    const TagAll = await Tag.findAll({
      attributes: ["id", "tag_name"],
      include: {
        model: Product,
        attributes: ["product_name", "price", "stock"],
      },
    });
    res.status(200).json(TagAll);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single tag by its `id`
// be sure to include its associated Product data
router.get("/:id", async (req, res) => {
  try {
    const TagByID = await Tag.findByPk(req.params.id, {
      include: {
        model: Product,
        attributes: ["product_name", "price", "stock"],
      },
    });

    if (!TagByID) {
      res.status(404).json({ message: "Please select a valid Tag ID." });
      return;
    }

    res.status(200).json(TagByID);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag
router.post("/", async (req, res) => {
  try {
    const createTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(createTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a tag's name by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const updateTag = await Tag.update(
      { tag_name: req.body.tag_name },
      { where: { id: req.params.id } }
    );
    res.status(200).send(updateTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete on tag by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const deleteTag = await Tag.destroy({ where: { id: req.params.id } });
    if (!deleteTag) {
      res.status(404).json({ message: "Please select a valid Tag ID." });
      return;
    }
    res.status(200).json(deleteTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
