import itemModel from "../model/itemSchema.js";

const addTheProuduct = async (req, res, next) => {
  try {
    const { itemName, price, description, category, imageUrl, available } =
      req.body;

    const item = new itemModel({
      itemName,
      price,
      description,
      category,
      imageUrl,
      available,
    });
    await item.save();

    return res.status(201).json({ message: "item added successfully" });
  } catch (error) {
    next(error);
  }
};
const viewProduct = async (req, res, next) => {
  try {
    const items = await itemModel.find();
    if (!items || items.length === 0) {
      return res.status(404).json({ message: "No items are founded in db" });
    }
    return res.status(200).json({ message: "items fetch success", items });
  } catch (error) {
    next(error);
  }
};

const viewProductByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    if (!category) {
      return res.status(404).json({ message: "category is not founded" });
    }
    const data = await itemModel.find({ category });
    if (!data || data.length === 0) {
      return res
        .status(404)
        .json({ message: "no data founded with this category" });
    }
    return res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};
export { addTheProuduct, viewProduct, viewProductByCategory };
