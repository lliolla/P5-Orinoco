
//déclaration des variables
let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));  // recuperer le panier convertit en javascript
console.log('shoppingCart',shoppingCart )
let orderInfos = localStorage.getItem('orderInfos');  // recuperer le retour API convertit en javascript
console.log('orderInfos',orderInfos)
let cartQte = localStorage.getItem('cartQte');  // recuperer le retour API convertit en javascript
console.log('cartQte',cartQte)

let form =document.getElementById("form") // formulaire
let btnCartSend =document.getElementById("btnCartSend") // bouton envoi

let tableCartRows = document.getElementById("tableCartRows")// corps du tableau
let tableFoot = document.getElementById("tableFoot")//pied du tableau
let table=document.getElementById("table") // tableau entier
let tableTitle=document.getElementById("tableTitle") // h2

let orderModal = document.getElementById('orderModal')// modal de confirmation de commande

//variables info clients a vérifier
let fristName = document.getElementById("inputFristName");
let lastName= document.getElementById("inputLastName");
let address = document.getElementById("inputAddress");
let zip = document.getElementById("inputZip");
let city = document.getElementById("inputCity");
let email = document.getElementById("InputMail");



function showCart(){
//au chargement de la page génerer dynamiquement le panier si shoppingcart est plein sinon on affiche panier vide avec bouton de retour a teddiesHome.html
	onloadcartNumbers()
		if (shoppingCart && Object.keys(shoppingCart).length <= 0 || !shoppingCart ) {
			// si shoppingcart est vide on masque le cart le formulaire et son bouton et on affiche un retour à la page des produits
			tableTitle.style.display = "none";
			tableCart.style.display = "none";
			form.style.display = "none";
			btnCartSend.style.display = "none";

			let h2 = document.createElement("h2");
			table.appendChild(h2);
			h2.setAttribute('class','emptyCart__title');
			h2.textContent ="Votre panier est vide ";

			let p = document.createElement("p");
			table.appendChild(p);
			p.setAttribute('class','emptyCart__content');
			p.textContent ="Faites un petit tour dans nos boutiques et laissez-vous tenter";

			var a = document.createElement("a");
			table.appendChild(a);
			a.setAttribute('class','btn btn-secondary btn-lg btn-block');
			a.setAttribute('href','teddiesHome.html');
			a.setAttribute('role','button');
			a.textContent = "Continuer mes achats";

			 }else{
				totalCartPrice ();// total price du panier
				if(shoppingCart){
					createTableCart();  //afficher le panier

				}
			 } 
}
showCart()


// on fait une boucle pour accèder à tous les boutons supprimer
 let bntDelated = document.querySelectorAll('.bntDelated') //boutons supprimer
 for (i=0 ;i<bntDelated.length ; i++ ){
	bntDelated[i].addEventListener("click", function(){ // au clic sur sup on suprimer le teddy coorepondant dans le shopping cart
		let index = Array.from(bntDelated).indexOf(event.target) ;
		console.log("click pour suprimer envoi l'index, ",index);
		let idTeddy =Object.keys(shoppingCart)[index];
		console.log("click pour suprimer envoi l'idteddy ",idTeddy);
	    delateItemCart(idTeddy);
			})
 }


// au clic sur le btn envoyer la commande on verifie le format des input
btnCartSend.addEventListener('click', function(){
	//si tout est ok on affiche le modal avec un num de commande et le prix total
	if (checkInput() == true){
		sendToApi();
	
		
	}

})

function delateItemCart(idTeddy){
//supprimer un teddy en fonction de son index dans teddyArray
	delete shoppingCart[idTeddy];
	localStorage.removeItem("shoppingCart");
  // on met a jour le prix et qte
    updateCartNumbers();
    totalCartPrice ();
   //on met a jour le localStorage
	localStorage.setItem('shoppingCart',JSON.stringify(shoppingCart) ) ;   
  // on recharge la page 
 	window.location.reload()
 }

function totalCartPrice (){
	let totalCart = 0;
	 for ( let teddy in shoppingCart){
		let cartQte =  shoppingCart[teddy].qte;
		let cartprice =  shoppingCart[teddy].price;
		totalCart += cartQte * cartprice
	 localStorage.setItem('totalCart',JSON.stringify(totalCart) );
 }
}

function updateCartNumbers(){
// on met a jour les qte de teddy apres suppression
	localStorage.removeItem("cart");
	let number = 0 
//on convertit shopping cart en array 
	let arrayNumber = Object.values(shoppingCart);
// on compte le nombre de qte ds le tableau et on met a jour number
		for( let i=0 ;i<arrayNumber.length; i++){
		number +=arrayNumber[i].qte 
		}
 	localStorage.setItem('cartQte',JSON.stringify(number) )
}


function createTableCart(){// on affiche dynamiquement le panier sous forme de tableau
// on boucle le shopping cart pour afficher une ligne par teddy
	 for ( let teddy in shoppingCart ){
		 let tr1 = document.createElement("tr");
		 tableCartRows.appendChild(tr1);

		 let th7 = document.createElement("th");
		 tr1.appendChild(th7);
		 th7.setAttribute('scoop','row');
		 th7.textContent="counter ligne";

		 let td = document.createElement("td");
		 tr1.appendChild(td);
		 let teddyname =shoppingCart[teddy].name ;
		 td.textContent= teddyname;
		 td.setAttribute("id","Name")

		 let td1 = document.createElement("td");
		 tr1.appendChild(td1);
		 let teddyColor = shoppingCart[teddy].colors;
		 td1.textContent=teddyColor;
		 td.setAttribute("id","Color")

		 let price = shoppingCart[teddy].price  + "€";
		 let td2 = document.createElement("td");
		 tr1.appendChild(td2);
		 td2.textContent=price;

		 let td3 = document.createElement("td");
		 tr1.appendChild(td3);
		 td3.setAttribute("class","counter");

		 let div = document.createElement("div");
		 td3.appendChild(div);
		 div.setAttribute("class","number");
		 div.setAttribute("id","number");

		 div.textContent=shoppingCart[teddy].qte;
		//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
		//  let div1 = document.createElement("div")
		//  td3.appendChild(div1)
		//  div1.setAttribute("class","counter-clic")

		//  let i1 = document.createElement("i")
		//  div1.appendChild(i1)
		//  i1.setAttribute("class","fas fa-plus plus")

		//  let i2 = document.createElement("i")
		//  div1.appendChild(i2)
		//  i2.setAttribute("class","fas fa-minus minus")

 		//  let td4 = document.createElement("td")
 		//  tr1.appendChild(td4)
 		//  td4.textContent= subTotal
//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
		 let td5 = document.createElement("td");
		 tr1.appendChild(td5);
		 td5.setAttribute("class","text-center");

		 let i3 = document.createElement("i");
		 td5.appendChild(i3);
		 i3.setAttribute("class","fas fa-times-circle bntDelated");

	}
	let tr2 = document.createElement("tr");
	tableFoot.appendChild(tr2);

	let td6 = document.createElement("td");
	tr2.appendChild(td6);
	td6.setAttribute("colspan","2");

	let td7 = document.createElement("td");
	tr2.appendChild(td7);
	td7.textContent = "Total"

	let totalCart = localStorage.getItem('totalCart')
	let td8 = document.createElement("td");
	tr2.appendChild(td8);
	td8.setAttribute("colspan","3");
	td8.setAttribute('class','text-right');
	td8.textContent = totalCart + "€";

}


function checkInput(){
// on verifie si les champs sont remplit sinon on affiche un messge d'alerte
let check = "";	
let regexEmail = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/ //regex qui gère le format de l'email

	if (fristName.value === ""){
			 alert("Merci de renseigner votre prénom");
			 fristName.focus();
			 return check = false;
	 }
		if(lastName.value === ""){
			 alert("Merci de renseigner votre nom");
			 lastName.focus();
			  return check = false;
		}
			if(address.value === ""){
				 alert("Merci de renseigner votre adresse");
				 address.focus();
				  return check = false;
			}
				if(zip.value.length != 5  ){
					 alert("Merci de renseigner votre code postal");
					 zip.focus();
					 return  check = false;
				}
					if(city.value === ""){
						 alert("Merci de renseigner votre ville");
						 city.focus();
						 return  check = false;
					}
						if(email.value === "" || !regexEmail.test(email.value)){
							 alert("Merci de verifier votre email");
							 email.focus();
							  return check = false;
						}
		return check = true
     }


function sendToApi(){
// crerer un objet qui va recuperer la value de chaque input du formulaire
	//creation de la class client
	class customer{
		constructor(fristName,lastName,address,city,email){
			this.lastName = lastName;
			this.fristName = fristName;
			this.address = address;
			this.city = city;
			this.email = email;
		}
	}
	// objet contenant les infos du formulaire
	let newCustumer = new customer (lastName,fristName, address,city,email)

// creer un tableau pour envoyer uniquement les ID des teddy
	//recupérer le shoppingCart
    let apiCart =JSON.parse(localStorage.getItem("shoppingCart")) ;
    console.log("apiCart",apiCart);
    let apiCartArray = []; // tableau des id des teddy
     //on boucle l'objet apicart pour recupéré les ID
    for (let teddy in apiCart){
        apiCart[teddy].id
        console.log("apiCart[teddy].id ",apiCart[teddy].id )
        apiCartArray.push(apiCart[teddy].id)
        console.log("send api id",apiCartArray)
    }

// POST API
	 fetch("http://localhost:3000/api/teddies/order", {
	 	method: "POST",
	 	headers: { "Content-Type": "application/json" },
	 	body: JSON.stringify({
	 	  contact: {
	 		firstName: newCustumer.fristName,
	 		lastName: newCustumer.lastName,
	 		address: newCustumer.address,
	 		city: newCustumer.city,
	 		email: newCustumer.email,
	 	  },
	 	  products: apiCartArray,
	 	}),
	   })
	   .then((response) => {
	 	if (response.ok) {
	 	  return response.json();
	 	}
	   })
	   .then((data) => {
		   console.log('data',data)
	 	localStorage.setItem("orderInfos", JSON.stringify(data));
		 window.location="confirm.html ";
	   })
	   .catch((error) => console.log("erreur de type : ", error));
}

function onloadcartNumbers(){
  //on recupère la qte stockée dans le localstorage et on met à jour la span cart
  let productSpan = document.getElementById("cartNumber");// on selectionne le badge qui contient les qté
  let productQte = localStorage.getItem("cartQte");
  productQte=parseInt(productQte);//on convertit le string en number 
	 
  if(productQte){
        productSpan.textContent=productQte;
	  }
}

  
 
