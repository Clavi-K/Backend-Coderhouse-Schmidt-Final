const mongoose = require("mongoose");

class MongoModel {
    constructor(collection, schema) {
        
        this.model = mongoose.model(collection, schema);

    }

    async create(obj) {

        const doc = await this.model.create(obj);
        return doc._id;

    }

    async getById(id) {

        const doc = await this.model.findOne({ _id: id });

        return doc;

    }

    async update(id, obj) {

        const doc = await this.model.findOne({ _id: id });

        doc.overwrite(obj);
        await doc.save();

    }

    async delete(id) {

        return await this.model.deleteOne({ _id: id });

    }

}

module.exports = MongoModel