
const _private = new WeakMap(); //objeto WeakMap //ENCAPSULACIÓN: Es osultar los detalles que no son relevantes para el exterior. Agrupar datos (propiedades) y métodos que atúan sobre esas propiedades de manera que el acceso a esos datos está restringido desde fuera del paquete.

class Book {        //El nombre de la clase empieza con Mayúscula, cada palabra debe empezar con mayúscula también.
     // ====== Método constructor ======
    constructor(title, author, price){      //ABSTRACCIÓN, abstraer es eliminar los detaller innecesarios para solo enfocarnos en los aspectos que son necesarios para el contexto o sistema que estamos desarrollando.
        // ====== Propiedades ======
        const properties = {        //Hace parte de la encapsulación
        _title: title,
        _author:  author,
        _price: price
        }
        //Colocar propiedades como privadas:
        _private.set(this, {properties}); //finaliza la encapsulación
    }
    
    //Métodos / Getters-Setters ======

    //Obtiene el título de un libro:
    get title() {
        return _private.get(this).properties['_title'];
    }  

    // Setea/modifica el título de un libro:
    set title(newTitle) {
        return _private.get(this).properties['_title'] = newTitle; //si elimino setter lo que va a pasar es que no se van a poder realizar cambios en el objeto. Se utiliza para accerder y modificar la información que teníamos como "privado".
    }
    
    get author() {
        return _private.get(this).properties['_author'];
    }  

    
    set author(newAuthor) {
        return _private.get(this).properties['_author'] = newAuthor; //si elimino setter lo que va a pasar es que no se van a poder realizar cambios en el objeto. Se utiliza para accerder y modificar la información que teníamos como "privado".
    }

    
    get price() {
        return _private.get(this).properties['_price'];
    }  

    //No coloques éste setter para prices si no quieres dar acceso.
    set price(newPrice) {
        return _private.get(this).properties['_price'] = newPrice; //si elimino setter lo que va a pasar es que no se van a poder realizar cambios en el objeto. Se utiliza para accerder y modificar la información que teníamos como "privado".
    }
    
    //Muestra todos los datos de un libro.
    getAllData(){
        console.log(`Titulo: ${this.title}, Autor: ${this.author}, precio:${this.price}`)
    }
} 


class Comic extends Book { //Esta clase es una exteción de la clase Book.
    constructor(name, author, price, illustrators){
        super(name,author,price);
        this.illustrators = illustrators; //nueva propiedad para ilustradores
    }
    
    addIllustrator(newIllustrator){    //Método para agregar mas illustradores con el tiempo.
    this.illustrators.push(newIllustrator)
    }

    /* ====== Ejemplo de: Polimorfismo ======
        Sobreescribe el método getAllData definido en la clase padre: Book
    */
    getAllData(){
        // Ejecuta el código de getAllData de la clase Padre
        super.getAllData();
        // Código extra para imprimir la propiedad illustrators
        console.log(`llustradores: ${this.illustrators}`);
    }
    
}

class ShoppingCart {
    constructor(){
        this.products = [];
    }
    //función para agregar un producto al carrito:
    addProduct(amount, price){ 
        this.products.push(...Array(amount).fill(price)); //fill sirve para rellenar. Amount es el monto, la cantidad. Los 3 puntos del array sirven para crear una copia, concatenar el resto y así no tener multiplos elementos (varios array), con este simbolo tendríamos los precios en un mismo array. 
    }
    //Mostrar productos del carrito
    showProducts(){ //definimos una función para mostrar esos productos.
        console.log(this.products);
    }
    // Calcular total de los productos agregados al carrito:
    calTotal(){
        return this.products
        .map(price => price) //map lo que hace es que va a ejecutar una función sobre cada uno de nuestros productos.
        .reduce((acumulador, price) => acumulador + price, 0); //reduce
    }
    //Imprime el total:
    printTicket(){
        console.log(`Total a pagar ${this.calTotal()}`)
    }

}

//Instancia de Book:
const book1 = new Book('1984', 'G.O', 350);

//Instancia de Comic:
const comic1 = new Comic('The killing Joke', 'A.M', 150, ['B.B']);

console.log(book1.title);

console.log(comic1.author);

console.log(comic1.price);

console.log(comic1.illustrators); //como no lo tenemos privado, simplemente podemos tener acceso sin necesidad de agregar getter y setter.
//los 4 console.log de arriba el chico los borra.

comic1.addIllustrator('J.H');
console.log(comic1.illustrators);

const cart = new ShoppingCart();


cart.addProduct(2, comic1.price);
cart.addProduct(3, book1.price);

cart.showProducts();

cart.printTicket();

book1.getAllData();
comic1.getAllData();

