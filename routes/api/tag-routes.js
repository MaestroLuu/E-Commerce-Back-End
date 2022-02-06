const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

//completed
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag}]
    })
  res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  } 
});

//completed
router.get('/:id', async (req, res) => {
  try {
    const tagID = await Tag.findByPk(req.params.id, {
      include: [{model: Product, through: ProductTag}]
    })
    if (!tagID) {
      res.status(404).json({message: 'The tag does not exist.'})
      return;
    }
    res.status(200).json(tagID);
  } catch (err) {
    res.status(500).json(err)
  }
});


//completed
router.post('/', async (req, res) => {
  try {
    const newTag= await Tag.create({
      tag_name: req.body.tag_name
    })
    res.status(200).json(newTag)
  } catch (err) {
    res.status(500).json(err)
  }

});

//completed
router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(
      {tag_name: req.body.tag_name},
      {where: {id: req.params.id}}
    );
    if (!req.params.id) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    } 
  res.status(200).json(updatedTag)
  } catch (err) {
    res.status(500).json(err)
  }

});

// completed
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
