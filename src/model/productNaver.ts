import SQ, { Model, Optional } from "sequelize";
import { sequelize } from "../db/database";
const DataTypes = SQ.DataTypes;

export interface ProductAttributes {
  productId: string;
  title: string;
  image?: string;
  category1?: string;
  category2?: string;
  category3?: string;
  category4?: string;
  buyCount?: number;
  insertDate?: string;
  updateDate?: string;
}

interface ProductCreationAttributes
  extends Optional<
    ProductAttributes,
    | "image"
    | "category1"
    | "category2"
    | "category3"
    | "category4"
    | "buyCount"
    | "insertDate"
    | "updateDate"
  > {}

interface ProductInterface
  extends Model<ProductAttributes, ProductCreationAttributes>,
    ProductAttributes {}

const ProductNaver = sequelize.define<ProductInterface>(
  "product_naver",
  {
    productId: {
      type: DataTypes.STRING(40),
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(100),
    },
    category1: {
      type: DataTypes.STRING(100),
    },
    category2: {
      type: DataTypes.STRING(100),
    },
    category3: {
      type: DataTypes.STRING(100),
    },
    category4: {
      type: DataTypes.STRING(100),
    },
    buyCount: {
      type: DataTypes.INTEGER,
    },
    insertDate: {
      type: DataTypes.DATE,
    },
    updateDate: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export async function getAll() {
  return ProductNaver.findAll();
}

export async function upsert(req: ProductAttributes) {
  return ProductNaver.findOne({ where: { productId: req.productId } }).then(
    (product) => {
      if (product)
        return product.update({
          ...req,
          buyCount: product.buyCount! + 1,
          updateDate: Date(),
        });
      return ProductNaver.create(req);
    }
  );
}

export async function getByCategory() {
  return ProductNaver.findAll({
    group: ["category1"],
    attributes: [
      "category1",
      [sequelize.fn("SUM", sequelize.col("buyCount")), "buyCount"],
    ],
  });
}

export async function getDetailByCategory(categoryName: string) {
  return ProductNaver.findAll({ where: { category1: categoryName } });
}
