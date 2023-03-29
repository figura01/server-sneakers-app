import { Document, Schema } from 'mongoose';
import { NextFunction } from 'express';
import * as connections from '../../config/connection/connection';
// import { CategorieProductModel } from '../CategorieProduct/model';
/**
 * @export
 * @interface IProductModel
 * @extends {Document}
 */
export interface IProductModel extends Document {
    categorie_product: string;
    unit_price: number;
    name: string;
    quantity: number;
}

/**
 * @swagger
 * components:
 *  schemas:
 *    UserSchema:
 *      required:
 *        - email
 *        - name
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        email:
 *          type: string
 *        password:
 *          type: string
 *        passwordResetToken:
 *          type: string
 *        passwordResetExpires:
 *          type: string
 *          format: date
 *        tokens:
 *          type: array
 *    Users:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/UserSchema'
 */
const ProductSchema: Schema = new Schema({
    categorie: {
        type: Schema.Types.ObjectId,
        ref: "categorieProductModel",
        default: "",
        require: true,
    },
    unit_price: {
        type: Number,
        require: true,
    },
    name: {
        type: String,
        default: "",
        require: true,
    },
    quantity: {
        type: Number,
        default: 1,
    }
}, {
    collection: 'productmodel',
    versionKey: false,
}).pre('save', async function (next: NextFunction): Promise < void > {
    const product: IProductModel = this; // tslint:disable-line

    if (!product) {
        return next();
    }
});


export default connections.db.model< IProductModel >('ProductModel', ProductSchema);
