const { randomUUID } = require('crypto')

module.exports = class DBMemory {

    // The datas will be sabe in a MAP data structure
    #product = new Map()

    create(product) {
        // creating a unique id using the node's crypto module
        const productId = randomUUID()
        this.#product.set(productId, product)
    }

    read() {
        return Array.from(this.#product.entries()).map(productArray => {
            const id = productArray[0]
            const data = productArray[1]
            return {
                id,
                ...data
            }
        })
    }

    readOne(id) {
        return this.#product.has(id) ? { id, ...this.#product.get(id) } : "Product not found"
    }

    update(id, product) {
        this.#product.set(id, product)
    }

    delete(id) {
        this.#product.delete(id)
    }
}