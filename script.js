const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const filter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let editmode = false;


function displayItems(){

 const itemsFromStorage = getItemsFromStorage();

 itemsFromStorage.forEach(item => addItemToDom(item));

 checkUI();

}
function addItem(e){

    const item = itemInput.value;

    e.preventDefault();

    if(item.trim( )=== ''){
        alert('please add an item');
        return;
    }

    if(editmode){
        const itemtoedit = itemList.querySelector('.edit-mode');

        removeItemFromStorage(itemtoedit.textContent);

        itemtoedit.classList.remove('edit-mode');

        itemtoedit.remove();

        editmode = false;
    }else{
        if(checkIfItemExists(item)){
            alert('item already exists');
            return;
        }
    }

    addItemToDom(item);
    addItemToStorage(item);

    checkUI();

    itemInput.value = '';
}

function addItemToDom(item){

    const li = document.createElement('li');
  
    li.appendChild(document.createTextNode(item));

    const button = createButton('remove-item btn-link text-red');


    const icon = createIcon('fa-solid fa-xmark');

   

    button.appendChild(icon);

    

    li.appendChild(button);

    itemList.appendChild(li);

}

function addItemToStorage(item){

 let itemsFromStorage = getItemsFromStorage();


 
  itemsFromStorage.push(item);

  localStorage.setItem('items',JSON.stringify(itemsFromStorage));


}

function getItemsFromStorage(){

 let itemsFromStorage;

 

 if(localStorage.getItem('items') === null){
   
    itemsFromStorage = [];

 }else{

    itemsFromStorage = JSON.parse(localStorage.getItem('items'));

 }

 return itemsFromStorage;
 

}

function createButton(classes){
    const button = document.createElement('button');
    button.className = classes;
    return button;
}

function createIcon(classes){
    const icon = document.createElement('i');
    icon.className = classes;
    return icon
}

function onClickItem(e){

    if(e.target.parentElement.classList.contains('remove-item')){

        removeItem(e.target.parentElement.parentElement)
    }else{

        setItemToEdit(e.target);

    }

}

function setItemToEdit(item){
    
    editmode = true;

    itemList.querySelectorAll('li').forEach((i)=> i.classList.remove('edit-mode'))
    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
    formBtn.style.backgroundColor = '#228b22'
    itemInput.value = item.textContent;
}

function removeItem(item){


   
    if(window.confirm('Are you sure?')){
        
        
        item.remove();
        removeItemFromStorage(item.textContent);
        checkUI();
    }
 

}

function removeItemFromStorage(item){

    let itemsFromStorage = getItemsFromStorage();

    
    itemsFromStorage = itemsFromStorage.filter((i) => i!==item);

    localStorage.setItem('items', JSON.stringify(itemsFromStorage));

}

function clearItems(e){

    if(window.confirm('Are you sure?')){
    
        while (itemList.firstChild){
       
        
            itemList.removeChild(itemList.firstChild);

           
        }
        
    }

    localStorage.removeItem('items');

    checkUI();

}

function checkIfItemExists(item){

    const itemsFromStorage = getItemsFromStorage();

    return itemsFromStorage.includes(item);

}

function filterItems(e){

    const text = e.target.value.toLowerCase();

    const items = itemList.querySelectorAll('li');

    items.forEach(item => {
        
        const itemName = item.firstChild.textContent.toLowerCase();
   
        if(itemName.indexOf(text)!=-1){

        item.style.display = 'flex'

        }else{

        item.style.display = 'none'

        }
   
   
    })





}

function checkUI() {

    itemInput.value = '';

    const items = itemList.querySelectorAll('li');

    if(items.length === 0 ){
      
        clearBtn.style.display='none';
        filter.style.display = 'none';

    }else{
        clearBtn.style.display='block';
        filter.style.display = 'block';
    }

    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add item';
    formBtn.style.backgroundColor = '#333'
}

function init() {
checkUI();

itemForm.addEventListener('submit',addItem);

itemList.addEventListener('click',onClickItem); //event delegation

clearBtn.addEventListener('click',clearItems);

filter.addEventListener('input',filterItems);

document.addEventListener('DOMContentLoaded',displayItems); }

init();