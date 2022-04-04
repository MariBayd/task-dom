/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    for (let i = 0; i < count; i++) {
        let elem = document.createElement(tag);
        elem.textContent = content;
        document.body.insertAdjacentElement('beforeend', elem);
    }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
function recursion(childrenCount, level, treeResult, maxLevel) {
    if (level <= 0) return;

    for (let i = 0; i < childrenCount; i++) {
        let treeChild = document.createElement('div');
        treeChild.setAttribute('class', 'item_' + (maxLevel - level + 1));
        treeResult.insertAdjacentElement('afterbegin', treeChild);

        recursion(childrenCount, level - 1, treeChild, maxLevel);
    }
}

export function generateTree(childrenCount, level) {
    if (level <= 0) return null;

    let root = document.createElement('div');
    root.setAttribute('class', 'item_1');

    recursion(childrenCount, level - 1, root, level);

    return root;
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/

export function replaceNodes() {
    let tree = generateTree(2, 3);

    for (let i = 0; i < tree.childNodes.length; i++) {
        let newSection = document.createElement('section');
        newSection.classList.add('item_2');

        if (tree.childNodes[i].classList.contains('item_2')) {
            let children = tree.childNodes[i].innerHTML;

            newSection.insertAdjacentHTML('afterbegin', children);
            tree.childNodes[i].replaceWith(newSection);
        }
    }

    return tree;
}
