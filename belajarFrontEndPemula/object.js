// 1.  Buatlah variabel dengan nama restaurant yang object dengan ketentuan berikut:
//      - Memiliki properti bernama "name"
//         - Bertipe data string
//         - Bernilai apa pun, asalkan tidak string kosong atau null.
//      - Memiliki properti bernama "city"
//         - Bertipe data string
//         - Bernilai apa pun, asalkan tidak string kosong atau null.
//      - Memiliki properti "favorite drink"
//         - Bertipe data string
//         - Bernilai apa pun, asalkan tidak string kosong atau null.
//      - Memiliki properti "favorite food"
//         - Bertipe data string
//         - Bernilai apa pun, asalkan tidak string kosong atau null.
//      - Memiliki properti "isVegan"
//         - Bertipe data boolean
//         - Bernilai boolean apa pun.
 
// 2.  Buatlah variabel bernama name.
//     Kemudian isi dengan nilai name dari properti object restaurant
// 3.  Buatlah variabel bernama favoriteDrink.
//     Kemudian isi dengan nilai "favorite drink" dari properti object restaurant

let restaurant = {
    name : 'adji',
    city : 'bekasi',
    favorite_drink : 'coffe',
    favorite_food : 'rendang',
    isVegan : false
}

let name = restaurant.name;
let favoriteDrink = restaurant.favorite_drink;

console.log('my name ' + name + ' favorite drink ' + favoriteDrink);