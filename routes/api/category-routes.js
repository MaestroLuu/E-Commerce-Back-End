const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryID = await Category.findAll(req.body, {
      include: [{ model: Product}]
  })
  res.status(200).json(categoryData);
} catch (err) {
  res.status(500).json(err);
  } 
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryID = await Category.findByPk(req.params.id, {
      include: [{ model: Product}]
    })
    if (!categoryID) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    } 
    res.status(200).json(categoryID); 
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory= await Category.create({
      category_name: req.body.category_name
    })
    res.status(200).json(newCategory)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update(
      {category_name: req.body.category_name},
      {where: {id: req.params.id}}
    );
  res.status(200).json(updatedCategory)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;
