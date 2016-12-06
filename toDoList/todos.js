window.addEventListener('load', function () {
    showMustGoOn();
    counter();
    function getToDo() {
        var todoStorage = [];
        var todoStr = localStorage.getItem('id');
        if (todoStr !== null) {
            todoStorage = JSON.parse(todoStr);
        }
        return todoStorage;
    }

    document.getElementById('add-press').addEventListener('click', newToDo);
    function newToDo() {
        var item = document.getElementById('todo-enter').value;
        if(item === ''){
            alert('write something')
        } else {
            var allToDo = getToDo();
            allToDo.push(item);
            localStorage.setItem('id', JSON.stringify(allToDo));
        }
        showMustGoOn();
        counter();
    }

    function showMustGoOn() {
        var todoStorage = getToDo();
        var elements = document.getElementById('todo-list');
        while (elements.firstChild) {
            elements.removeChild(elements.firstChild);
        }
        for (var i = 0; i < todoStorage.length; i++) {
            var newLi = document.createElement('li');
            var newDel = document.createElement('button');
            var newEdit = document.createElement('button');
            var span = document.createElement('span');
            newDel.textContent = 'X';
            newDel.className = "button-delete";
            newEdit.textContent = 'Edit';
            newEdit.addEventListener('click', edit);
            var sel = document.createElement('input');
            sel.type = 'checkbox';
            newLi.appendChild(sel);
            newLi.appendChild(newDel);
            newLi.appendChild(newEdit);
            newLi.setAttribute('draggable', 'true');
            newLi.setAttribute('ondragenter', 'dragEnter(event)');
            newLi.setAttribute('ondragstart', 'dragStart(event)');
            span.innerHTML = todoStorage[i];
            newLi.appendChild(span);
            newLi.id = i;
            document.getElementById('todo-list').appendChild(newLi);
            newDel.addEventListener('click', delItem);
            sel.addEventListener('click', selectItem);
            document.getElementById('todo-enter').value = '';
        }
    }

    function delItem() {
        var todoStorage = getToDo();
        var delet = this.parentNode.getAttribute('id');
        todoStorage.splice(delet, 1);
        localStorage.setItem('id', JSON.stringify(todoStorage));
        showMustGoOn();
        counter();
    }

    function counter() {
        var allTasks = document.getElementsByTagName('li');
        var cheked = document.getElementsByClassName('checked');
        document.getElementById('counter').textContent = cheked.length;
        document.getElementById('counterOfNotDone').textContent = allTasks.length - cheked.length;
    }

    function selectItem(event) {
        var ch = event.target;
        if (ch.tagName == 'INPUT') {
            ch.parentNode.classList.toggle('checked');
        }
        counter();
    }

    function edit(e) {
        var todoStorage = getToDo();
        var modal = document.getElementById('edit');
        modal.style.display = "block";
        var input = document.getElementById('copyLi');
        var span = e.target.parentNode.lastChild;
        var li = event.target.parentElement;
        var id = li.getAttribute('id');
        input.value = li.getElementsByTagName('span')[0].innerHTML;
        document.getElementById('save').onclick = function (event) {
            var div = event.target.parentNode;
            var input = div.querySelector('input');
            todoStorage[id] = input.value;
            localStorage.setItem('id', JSON.stringify(todoStorage));
            modal.style.display = "none";
            showMustGoOn();
            document.getElementById('cancel').onclick = function () {
                modal.style.display = "none";
            }
        }
    }

    var btnEnter = document.getElementById('add-press');
    btnEnter.addEventListener('click', newToDo);
    var keyEnter = document.getElementById('todo-enter');
    keyEnter.addEventListener('keypress', function pressEnter(event) {
        if (event.keyCode == 13) {
            newToDo();
        }
    });
    var clear = document.getElementById('clear');
    clear.addEventListener('click', function delAllItem() {
        var elements = document.getElementById('todo-list');
        while (elements.firstChild) {
            elements.removeChild(elements.firstChild);
        }
        window.localStorage.clear();
        location.reload();
    });
});