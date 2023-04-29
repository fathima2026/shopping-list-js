const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');




function addItem(e){

    const item = itemInput.value;

    e.preventDefault();

    if(item.value = ''){
        alert('please add an item');
    }

    const li = document.createElement('li');
  
    li.appendChild(document.createTextNode(item));

    const button = createButton('remove-item btn-link text-red');


    const icon = createIcon('fa-solid fa-xmark');

   

    button.appendChild(icon);

    

    li.appendChild(button);

    itemList.appendChild(li);

    itemInput.value = '';
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

itemForm.addEventListener('submit',addItem);