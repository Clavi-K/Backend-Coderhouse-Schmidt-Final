const fs = require('fs');

class Container {
    constructor(path) {

        this.path = path;

    }

    async saveFile(object) {

        if (!object) {

            throw new Error("El objeto no existe.");

        } else {

            const obj = await reader(this.path);
            let id = obj.length;

            object.id = id;

            obj.push(object);

            writer(this.path, obj);
            
            return id;

        }
    }

    async getById(id) {

        if (!id) {

            throw new Error("No hay ID.")

        } else {

            const obj = await reader(this.path);

            let retItem = undefined;

            for (let item of obj) {

                if (item.id == id) {

                    retItem = item;

                }

            }

            return retItem;

        }

    }

    async getAll() {

        const obj = await reader(this.path);

        return obj;

    }

    async updateById(id, prod) {

        if (!id || !prod) {

            throw new Error("No hay ID.")

        } else {

            const obj = await reader(this.path);

            for (let item of obj) {

                if (item.id == id) {

                    prod.id = parseInt(id);
                    obj[id] = prod;

                }

            }

            writer(this.path, obj);

        }
    }

    async deleteById(id) {

        id = parseInt(id);

        if (!id) {

            throw new Error("No hay ID.");

        } else {

            const obj = await reader(this.path);

            obj = obj.filter(item => {
                return item.id != id;
            });

            writer(this.path, obj);

        }

    }

    async deleteAll() {

        const obj = await reader(this.path);

        obj = [];

        writer(this.path, obj);

    }

}

module.exports = Container;

async function reader(path) {

    let data = await fs.promises.readFile(path, "utf-8");
    let obj = JSON.parse(data);

    return obj;

}

async function writer(path, obj) {

    const file = JSON.stringify(obj, null, 2);
    fs.promises.writeFile(path, file);

}