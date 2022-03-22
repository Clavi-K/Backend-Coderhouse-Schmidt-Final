const admin = require("firebase-admin");
const { firebase } = require("../config");

admin.initializeApp({
    credential: admin.credential.cert(firebase)
});

const db = admin.firestore();

class FirebaseModel {

    constructor(collection) {
        this.collection = db.collection(collection);
    }

    async getAll() {

        try {

            const array = [];
            const response = await this.collection.get();

            response.forEach(doc => {
                array.push({ id: doc.id, ...doc.data() })
            });

            return array;

        } catch (e) {
            throw new Error("Could not get all firebase documents.");
        }

    }

    async getById(id) {
        try {

            const doc = await this.collection.doc(id).get();

            if (!doc.exists) {
                throw new Error(`Firebase document with ID: ${id} not found`);
            } else {

                const data = doc.data();
                return { id, ...data };

            }

        } catch (error) {
            throw new Error(`Could not get firebase document with ID: ${id}`);
        }
    }

    async save(obj) {

        try {

            const saved = await this.collection.add(obj);
            return {id: saved.id, ...obj};

        } catch(e) {
            throw new Error(`Could not save this document: ${obj}`);
        }

    }

    async update(obj) {

        try {

            const updated = await this.collection.doc(obj.id).set(obj);
            return updated;

        } catch(e) {
            throw new Error(`Could not update document with ID: ${obj.id}`);
        }

    }

    async delete(id) {

        try {

            await this.collection.doc(id).delete();

        } catch(e) {
            throw new Error(`Could not delete the document with ID: ${id}`)
        }

    }

}

module.exports = FirebaseModel;