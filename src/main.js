window.onload = () => {
    //Todo set tọa độ của phần tử khi load

    // xóa sự kiện chuột phải mặc định
    document.oncontextmenu = function rightClick(clickEvent) {
        clickEvent.preventDefault();
        return false;
    };

    //Todo set font
    (function () {
        var newStyle = document.createElement('style');
        var styleInner = '';
        Font.forEach((element) => {
            styleInner += `@font-face {
                font-family: '${element.name}';
                src: url('src/fonts/${element.src}');
            }\n`;
        });
        newStyle.innerHTML = styleInner;
        document.body.appendChild(newStyle);
    })();

    //Todo set type background
    (() => {
        var type = document.getElementById('background').getAttribute('data-type') || 0;
        document.querySelectorAll('.background-view')[type].style.display = 'block';
        // if (type == 1) document.querySelector('.babckground-view video').play();
    })();
    (() => {
        var a = document.querySelectorAll('.select-font');
        a.forEach((element) => {
            var options = '';
            Font.forEach((element2) => {
                options += `<option value="${element2.name}" style="font-family: ${element2.name};">${element2.name}</option>`;
            });
            element.innerHTML = options;
        });
    })();
};

var textDemo = new Text();

//? set sự kiện kéo thả của 1 element
function dragElement(elmnt) {
    if (!elmnt.id) elmnt = document.getElementById(elmnt);
    if (!elmnt) return;
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        //Todo get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:

        // y
        elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
        // x
        elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';

        var x = elmnt.style.left.toString().replace('px', ''),
            y = elmnt.style.top.toString().replace('px', '');
        var main = document.querySelector('body');
        var w = main.clientWidth,
            h = main.clientHeight;

        if (x < -50) {
            elmnt.style.left = '-50px';
            x = -50;
        }
        if (y < -50) {
            elmnt.style.top = '-50px';
            y = -50;
        }
        if (x > w + 50 - elmnt.clientWidth) {
            elmnt.style.left = w + 50 - elmnt.clientWidth + 'px';
            x = w + 50 - elmnt.clientWidth;
        }
        if (y > h + 50 - elmnt.clientHeight) {
            elmnt.style.top = h + 50 - elmnt.clientHeight + 'px';
            y = h + 50 - elmnt.clientHeight;
        }
        // setNewPosition(elmnt.id, x, y);
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

dragElement('text-1');

//Todo:
function onchangeValueTab1() {
    var text = document.querySelector('.tab .tab-1 .text-input').value;
    var size = document.querySelector('.tab .tab-1 .size-input').value;
    var font = document.querySelector('.tab .tab-1 .font-input').value;
    document.querySelector('.tab .tab-1 #bold').checked
        ? (textDemo.bold = 'bold')
        : (textDemo.bold = 'initial');
    document.querySelector('.tab .tab-1 #i').checked
        ? (textDemo.italic = 'italic')
        : (textDemo.italic = 'initial');

    textDemo.fontSize = size;
    textDemo.fontFamily = font;
    textDemo.text = text;

    setStyleTextDemo();
}
//TODO: Chạy thử
onchangeValueTab1();
// Thay đổi tab trong chỉnh sửa văn bản
function changeTab(n) {
    var a = document.querySelectorAll('.tab > div');
    a.forEach((element) => {
        element.style.display = 'none';
    });
    if (a[n]) a[n].style.display = 'block';
}
// Thay đổi màu sắc ở đơn màu
function changeColor() {
    var color = document.querySelector('.tab .tab-2 .color-input').value;
    textDemo.color = color;
    setStyleTextDemo();
}
// lấy ngẫu nhiên màu ở đơn màu
function randomColorBtn() {
    var color = randomColor();
    textDemo.color = color;
    document.querySelector('.tab .tab-2 .color-input').value = color;

    setStyleTextDemo();
}

// Thay đổi loại màu của chữ
function changeTypeColor(event) {
    var select = event.target.value;
    if (select == 0) {
        document.querySelector('.tab-2 .single').style.display = 'inline-block';
        document.querySelector('.tab-2 .multi').style.display = 'none';
        textDemo.multiColor.type = 0;
        document
            .querySelector('.content .content-3 .demo .demo__text')
            .classList.remove('linear-gradient');
    } else if (select == 1) {
        document.querySelector('.tab-2 .single').style.display = 'none';
        document.querySelector('.tab-2 .multi').style.display = 'block';
        textDemo.multiColor.type = 1;
        var a = document.querySelectorAll('.colorx4 input');
        console.log('🚀 ~ file: main.js ~ line 171 ~ changeTypeColor ~ a', a);
        a[0].value = textDemo.multiColor.color1;
        a[1].value = textDemo.multiColor.color2;
        a[2].value = textDemo.multiColor.color3;
        a[3].value = textDemo.multiColor.color4;
        document.querySelector('.multi-select').style.display = 'block';
    } else if (select == 2) {
        textDemo.multiColor.type = 2;
        document.querySelector('.multi-select').style.display = 'none';
    }
    setStyleTextDemo();
}
// Nhận tất cả thay đổi kiểu cho chữ hiển thị
function setStyleTextDemo() {
    var bg =
        textDemo.multiColor.type == 1
            ? `background: -webkit-linear-gradient(${textDemo.multiColor.pos}, ${textDemo.multiColor.color1}, ${textDemo.multiColor.color2}, ${textDemo.multiColor.color3}, ${textDemo.multiColor.color4});
            -webkit-background-clip: text;`
            : 'background: transparent';
    document.querySelector('.content .content-3 .demo .demo__text').setAttribute(
        'style',
        `font-size: ${textDemo.fontSize}px; font-weight: ${textDemo.bold};
             font-style: ${textDemo.italic};font-family: ${textDemo.fontFamily};
             color: ${textDemo.color}; ${bg}`
    );
    if (textDemo.multiColor.type == 0) {
        document.querySelector('.content .content-3 .demo .demo__text').innerHTML = textDemo.text;
    } else if (textDemo.multiColor.type == 1) {
        // linear color
        document
            .querySelector('.content .content-3 .demo .demo__text')
            .classList.add('linear-gradient');

        document.querySelector('.content .content-3 .demo .demo__text').innerHTML = textDemo.text;
    } else if (textDemo.multiColor.type == 2) {
        var tmp = textDemo.text;
        document
            .querySelector('.content .content-3 .demo .demo__text')
            .classList.remove('linear-gradient');
        document.querySelector('.content .content-3 .demo .demo__text').innerHTML =
            randomColorColorText(tmp);
    }
}

//Todo: Thay đổi màu sắc ở dải màu
function change4Color() {
    textDemo.multiColor.color1 = document.querySelectorAll('.multi-select .colorx4 input')[0].value;
    textDemo.multiColor.color2 = document.querySelectorAll('.multi-select .colorx4 input')[1].value;
    textDemo.multiColor.color3 = document.querySelectorAll('.multi-select .colorx4 input')[2].value;
    textDemo.multiColor.color4 = document.querySelectorAll('.multi-select .colorx4 input')[3].value;
    setStyleTextDemo();
}

function changeDeg4Color() {
    textDemo.multiColor.pos = document.querySelector('.multi-select select').value;
    setStyleTextDemo();
}
