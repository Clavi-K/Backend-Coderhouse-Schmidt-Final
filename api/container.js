const fs = require('fs');

class Container {
    constructor(path) {

        this.path = path;

    }

    async saveFile(object) {

        if (object === undefined || !object) {

            throw new Error("El objeto no existe.");

        } else {

            let data = await fs.promises.readFile(this.path, "utf-8");
            let obj = JSON.parse(data);
            let id = obj.array.length;

            object.id = id;

            obj.array.push(object);

            let file = JSON.stringify(obj, null, 2);

            fs.promises.writeFile(this.path, file);

            return id;

        }
    }

    async getById(id) {

        if (id === undefined || !id) {

            throw new Error("No hay ID.")

        } else {

            let data = await fs.promises.readFile(this.path, "utf-8");
            let obj = JSON.parse(data);

            let retItem = undefined;

            for (let item of obj.array) {

                if (item.id == id) {

                    retItem = item;

                }

            }

            return retItem;

        }

    }

    async getAll() {

        let data = await fs.promises.readFile(this.path, "utf-8");
        let obj = JSON.parse(data);

        return obj.array;

    }

    async updateById(id, prod) {

        if (id === undefined || !id || prod === undefined || !prod) {

            throw new Error("No hay ID.")

        } else {

            let data = await fs.promises.readFile(this.path, "utf-8");
            let obj = JSON.parse(data);

            for (let item of obj.array) {

                if (item.id == id) {

                    prod.id = parseInt(id);
                    obj.array[id] = prod;

                }

            }

            let file = JSON.stringify(obj, null, 2);

            fs.promises.writeFile(this.path, file);

        }
    }

    async deleteById(id) {

        id = parseInt(id);

        if (id === undefined || !id) {

            throw new Error("No hay ID.");

        } else {

            let data = await fs.promises.readFile(this.path, "utf-8");
            let obj = JSON.parse(data);

            obj.array = obj.array.filter(item => {
                return item.id != id;
            });

            let file = JSON.stringify(obj, null, 2)
            fs.promises.writeFile(this.path, file);

        }

    }

    async deleteAll() {

        let data = await fs.promises.readFile(this.path, "utf-8");
        let obj = JSON.parse(data);

        obj.array = [];

        let file = JSON.stringify(obj, null, 2);
        fs.promises.writeFile(this.path, file);

    }

}

module.exports = Container;



// cont.saveFile(obj)
//     .then((response) => console.log(response))
//     .catch((e) => console.log(e));

// cont.getById(1)
//     .then((reponse) => console.log(reponse))
//     .catch((e) => console.log(e));

// cont.getAll()
//     .then((reponse) => console.log(reponse))
//     .catch((e) => console.log(e));

// cont.deleteById(1);

// cont.deleteAll();