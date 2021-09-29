class ProductoDTO {

    constructor(productoData) {
        this.id = productoData._id;
        this.title = productoData.title;
        this.price = productoData.user;
        this.timestamp = productoData.timestamp;
    }

    getId() {
        return this.id;
    }

    getTitle() {
        return this.title;
    }

    getPrice() {
        return this.price;
    }

    getTimestamp() {
        return this.timestamp
    }
}

module.exports = ProductoDTO;