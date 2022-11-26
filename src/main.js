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
    var a = document.querySelectorAll('input[type="number"]');
    for (let i = 0; i < a.length; i++) {
        const element = a[i];
        // element.addEventListener('chan', function (e) {
        //     ;
        // });
        element.addEventListener('change', function (e) {
            changeValueNumberInput(e.target);
            var value = e.target.value;
            if (!value) e.target.value = 0;
        });
    }
    function changeValueNumberInput(element) {
        var min = parseInt(element.min) || 0;
        var max = parseInt(element.max) || 0;
        var value = parseInt(element.value) || 0;
        if (value < min) {
            element.value = min;
            showMessage('Thông báo', 'Đã vượt qua giới hạn cho phép');
        }
        if (value > max) {
            element.value = max;
            showMessage('Thông báo', 'Đã vượt qua giới hạn cho phép');
        }
    }
    //Todo loadn dữ liệu "Text" khi load xong
    loadText();
    var x = document.querySelector('.background');
    x.addEventListener('mousemove', function () {
        document.querySelector('.background').removeEventListener('mousedown', a);
        mouseClickText('background');
    });
    x.addEventListener('mouseleave', function () {
        document.querySelector('.background').removeEventListener('mousedown', a);
    });
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
        setNewPosition(elmnt.id, x, y);
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
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
        textDemo.colorType = 0;
        document
            .querySelector('.content .content-3 .demo .demo__text')
            .classList.remove('linear-gradient');
    } else if (select == 1) {
        document.querySelector('.tab-2 .single').style.display = 'none';
        document.querySelector('.tab-2 .multi').style.display = 'block';
        textDemo.colorType = 1;
        var a = document.querySelectorAll('.colorx4 input');
        console.log('🚀 ~ file: main.js ~ line 171 ~ changeTypeColor ~ a', a);
        a[0].value = textDemo.multiColor.color1;
        a[1].value = textDemo.multiColor.color2;
        a[2].value = textDemo.multiColor.color3;
        a[3].value = textDemo.multiColor.color4;
        document.querySelector('.multi-select').style.display = 'block';
    } else if (select == 2) {
        textDemo.colorType = 2;
        document.querySelector('.multi-select').style.display = 'none';
    }
    setStyleTextDemo();
}
// Nhận tất cả thay đổi kiểu cho chữ hiển thị
function setStyleTextDemo() {
    var bg =
        textDemo.colorType == 1
            ? `background: -webkit-linear-gradient(${textDemo.multiColor.pos}, ${textDemo.multiColor.color1}, ${textDemo.multiColor.color2}, ${textDemo.multiColor.color3}, ${textDemo.multiColor.color4});
            -webkit-background-clip: text;`
            : 'background: transparent';
    document.querySelector('.content .content-3 .demo .demo__text').setAttribute(
        'style',
        `font-size: ${textDemo.fontSize}px; font-weight: ${textDemo.bold};
             font-style: ${textDemo.italic};font-family: ${textDemo.fontFamily};
             color: ${textDemo.color}; ${bg}`
    );
    if (textDemo.colorType == 0) {
        document.querySelector('.content .content-3 .demo .demo__text').innerHTML = textDemo.text;
    } else if (textDemo.colorType == 1) {
        // linear color
        document
            .querySelector('.content .content-3 .demo .demo__text')
            .classList.add('linear-gradient');

        document.querySelector('.content .content-3 .demo .demo__text').innerHTML = textDemo.text;
    } else if (textDemo.colorType == 2) {
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
function changePosition() {
    var xElement = document.querySelector('.content .content-2 .tab-4 .x-input');
    var yElement = document.querySelector('.content .content-2 .tab-4 .y-input');

    var y = yElement.value < 50 ? 50 : yElement.value > 1300 ? 1300 : yElement.value;
    var x = xElement.value < 50 ? 50 : xElement.value > 600 ? 600 : xElement.value;

    textDemo.x = x;
    textDemo.y = y;
}
function saveBtn2() {
    var id = document.querySelector('.edit-container').id;
    saveBtn(id);
}
function saveBtn(id) {
    var arrText = JSON.parse(localStorage.getItem('Text')) || [];
    for (let i = 0; i < arrText.length; i++) {
        if (arrText[i].id == id) {
            console.log(typeof id);
            //Cập nhật nếu tồn tại
            arrText[i] = textDemo;
            showMessage('Thành công', 'Cập nhật dữ liệu thành công! Đã áp dụng');
            localStorage.setItem('Text', JSON.stringify(arrText));
            viewBlock(0);
            loadText();
            return;
        }
    }
    arrText.push(textDemo);
    showMessage('Thành công', 'Thêm dữ liệu mới thành công! Đã áp dụng');
    localStorage.setItem('Text', JSON.stringify(arrText));

    viewBlock(0);
    loadText();
}

//Todo: Hiện thông báo
function showMessage(title, message, type) {
    var element = document.createElement('div');
    element.className = 'message__container';
    element.innerHTML = `
    <div class="title">${title}</div>
    <div class="mes">${message}</div>
    <div class="close-btn">×</div>`;
    element.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-btn')) {
            var a = setInterval((event) => {
                element.style.opacity -= 0.1;
                if (element.style.opacity < 0) {
                    clearInterval(a);
                    element.remove();
                }
            }, 100);
        }
    });
    setTimeout((event) => {
        var a = setInterval(() => {
            element.style.opacity -= 0.1;
            if (element.style.opacity < 0) {
                clearInterval(a);
                element.remove();
            }
        }, 100);
    }, 3500);
    document.querySelector('.message').appendChild(element);
}

function loadText() {
    var a = JSON.parse(localStorage.getItem('Text')) || [];
    document.querySelector('.text-container').innerHTML = '';
    for (let i = 0; i < a.length; i++) {
        const element = a[i];
        if (element.status == 1) {
            var newE = document.createElement('div');
            newE.classList = 'text ab';
            newE.id = element.id;
            var bg =
                element.colorType == 1
                    ? `background: -webkit-linear-gradient(${element.multiColor.pos}, ${element.multiColor.color1}, ${element.multiColor.color2}, ${element.multiColor.color3}, ${element.multiColor.color4});
            -webkit-background-clip: text;`
                    : 'background: transparent';

            newE.setAttribute(
                'style',
                `font-size: ${element.fontSize}px; font-weight: ${element.bold};font-style: ${element.italic};font-family: ${element.fontFamily};color: ${element.color}; ${bg}; top: ${element.y}px;left: ${element.x}px;`
            );
            newE.setAttribute('data-type-color', element.colorType);
            if (element.colorType == 0) {
                newE.innerHTML = element.text;
            } else if (element.colorType == 1) {
                // linear color
                newE.classList.add('linear-gradient');
                newE.innerHTML = element.text;
                newE.setAttribute(
                    'data-color',
                    element.multiColor.color1 +
                        ',' +
                        element.multiColor.color2 +
                        ',' +
                        element.multiColor.color3 +
                        ',' +
                        element.multiColor.color4
                );
                newE.setAttribute('data-pos', element.multiColor.pos);
            } else if (element.colorType == 2) {
                var tmp = element.text;
                newE.innerHTML = randomColorColorText(tmp);
            }
            mouseClickText(newE);
            dragElement(newE);
            document.querySelector('.text-container').appendChild(newE);
        }
    }
}

function xoaBtn() {
    var id = document.querySelector('.edit-container').id;
    var arrText = JSON.parse(localStorage.getItem('Text')) || [];
    for (let i = 0; i < arrText.length; i++) {
        const element = arrText[i];
        if (element.id == id) {
            arrText.splice(i, 1);
            // a.splice
            localStorage.setItem('Text', JSON.stringify(arrText));
            showMessage('Thành công', 'Đã xóa, Cập nhật dữ liệu thành công! Đã áp dụng');
            viewBlock(0);
            loadText();
            return;
        }
    }
    showMessage('Hủy', 'Bạn đã hủy thao tác!');
    viewBlock(0);
    loadText();
}

function setTextDemo(
    id,
    text,
    color,
    fontFamily,
    fontSize,
    backgroundColor,
    x,
    y,
    status,
    bold,
    italic,
    colorType,
    multiColor
) {
    var options = {
        text: text || '',
        color: color || 'black',
        fontFamily: fontFamily || 'Patrick Hand',
        fontSize: fontSize || 24,
        backgroundColor: backgroundColor || 'transparent',
        x: x || 0,
        y: y || 0,
        status: status || 1,
        bold: bold || 'initial',
        italic: italic || 'initial',
        colorType: colorType || 0,
        multiColor: multiColor || {
            pos: 'left',
            color1: '#E0144C',
            color2: '#379237',
            color3: '#0008C1',
            color4: '#ffffff',
        },
    };
    textDemo = new Text(id, options);
}

function setNewPosition(id, x, y) {
    var a = JSON.parse(localStorage.getItem('Text')) || [];
    a.forEach((element) => {
        if (element.id == id) {
            element.x = x;
            element.y = y;
            localStorage.setItem('Text', JSON.stringify(a));
        }
    });
}

function remoteEditText(id) {
    viewBlock(1);
    var element = document.getElementById(id);
    if (element) {
        var text = element.textContent,
            color = element.style.color,
            fontFamily = element.style.fontFamily.replace(/\"/g, ''),
            fontSize = element.style.fontSize,
            backgroundColor = element.style.backgroundColor,
            status = 1,
            bold = element.style.fontWeight,
            italic = element.style.fontStyle,
            x = element.style.left,
            y = element.style.top,
            typeColor = element.getAttribute('data-type-color'),
            multiColor = {};
        if (element.classList.contains('linear-gradient')) {
            var background = element.getAttribute('data-color');
            var acolor = background.split(',');
            multiColor.color1 = acolor[0];
            multiColor.color2 = acolor[1];
            multiColor.color3 = acolor[2];
            multiColor.color4 = acolor[3];
            multiColor.pos = element.getAttribute('data-pos');
        }
        var options = {
            text: text,
            color: color,
            fontFamily: fontFamily,
            fontSize: fontSize,
            backgroundColor: backgroundColor,
            x: x,
            y: y,
            status: status,
            bold: bold,
            italic: italic,
            colorType: typeColor,
            multiColor: multiColor,
        };
        textDemo = new Text(id, options);
    } else textDemo = new Text();
    //Todo set Value
    document.querySelector('.main .edit-container').id = textDemo.id;
    document.getElementById('text-input').value = textDemo.text;
    document.getElementById('size-input').value = parseInt(textDemo.fontSize);
    if (textDemo.bold == 'bold') document.getElementById('bold').selected;
    if (textDemo.italic == 'italic') document.getElementById('i').selected;
    onchangeValueTab1();
    setStyleTextDemo();
    changeTab(0);
}
//Todo ẩn hoặc hiển ở menu chỉnh sửa
function statusBtn(e) {
    var element = e.target;
    if (textDemo.status == 1) {
        element.value = 'Hiện thị';
        textDemo.status = 0;
    } else {
        element.value = 'Ẩn';
        textDemo.status = 1;
    }
}
//Todo xóa "Text" ở màn hình chính
function deleteTextBtn(id) {
    var a = JSON.parse(localStorage.getItem('Text')) || [];
    for (let i = 0; i < a.length; i++) {
        if (a[i].id == id) {
            a.splice(i, 1);
        }
    }
    localStorage.setItem('Text', JSON.stringify(a));
    loadText();
}
//Todo ẩn "Text" ở màn hình chính
function statusBtn2(id) {
    var a = JSON.parse(localStorage.getItem('Text')) || [];
    for (let i = 0; i < a.length; i++) {
        if (a[i].id == id) {
            a[i].status = 0;
        }
    }
    localStorage.setItem('Text', JSON.stringify(a));
    loadText();
}

function getListText() {
    viewBlock(2);
    var array = JSON.parse(localStorage.getItem('Text')) || [];
    var container = document.querySelector('.list-skin .container');
    container.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        var elmnt = document.createElement('div');
        elmnt.classList = 'element';
        elmnt.innerHTML = `
         <div class="start">
             <div class="name">${element.text}</div>
             <div class="time">
                 <div>
                     <div class="created-at">
                         <span>Ngày tạo: </span>
                         <span>${element.time.createdAt}</span>
                     </div>
                     <div class="updated-at">
                         <span>Ngày sửa: </span>
                         <span>${element.time.updatedAt}</span>
                     </div>
                 </div>
             </div>
         </div>
         <div class="end">
             <div class="group-btn">
                 <div class="tooltip" data-tooltip="Chỉnh sửa">
                     <i class="fa-solid fa-pen-to-square" onclick="remoteEditText('${element.id}')"></i>
                 </div>
                 <div class="tooltip" data-tooltip="Hiện thị" onclick="">
                     <i class="fa-sharp fa-solid fa-eye"></i>
                     <!-- <i class="fa-sharp fa-solid fa-eye-slash" onclick=""></i> -->
                 </div>
                 <div class="tooltip" data-tooltip="Xóa" onclick="">
                     <i class="fa-solid fa-trash"></i>
                 </div>
             </div>
         </div>
     </div>`;
        container.appendChild(elmnt);
    }
}

function viewBlock(n) {
    var arrBlock = [];
    var textContent = document.querySelector('.text-container'); // 0
    var editContainer = document.querySelector('.edit-container'); //1
    var listSkin = document.querySelector('.list-skin'); //2
    arrBlock.push(textContent);
    arrBlock.push(editContainer);
    arrBlock.push(listSkin);

    arrBlock.forEach((element) => {
        element.style.display = 'none';
        console.log(element);
    });
    arrBlock[n].style.display = 'block';
}

viewBlock(2);
