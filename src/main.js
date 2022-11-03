window.onload = () => {
    // set tọa độ của phần tử khi load
    var text = JSON.parse(localStorage.getItem('Text')) || [];
    for (var i = 0; i < text.length; i++) {
        var a = document.createElement('div');
        a.classList = 'text';
        a.id = text[i].id;
        a.style.display = text[i].status == 1 ? 'block' : 'none';

        a.innerHTML = `
        <span class="day-text" style=" font-size:${text[i].fontSize}px; font-family: '${text[i].fontFamily}'; color: ${text[i].color}">
            ${text[i].text}
        </span>`;
        document.querySelector('.main').appendChild(a);
        setPositionOnLoad(text[i].id, text[i].x, text[i].y);
        dragElement(`${text[i].id}`);
        mouseClick(`${text[i].id}`);
    }

    // xóa sự kiện chuột phải mặc định
    document.oncontextmenu = function rightClick(clickEvent) {
        clickEvent.preventDefault();
        return false;
    };

    // set font
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

    mouseClickBackground('background');
};

//? set sự kiện kéo thả của 1 element
function dragElement(elmnt) {
    if (!elmnt.id) elmnt = document.getElementById(elmnt);
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
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
        var main = document.querySelector('.background');
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

//? set vị trí sau khi kéo thả vào localStorage
function setNewPosition(id, x, y) {
    var positionElement = JSON.parse(localStorage.getItem('Text')) || [];
    var i = positionElement.length;
    while (i--) {
        if (positionElement[i].id == id) {
            positionElement[i].x = x;
            positionElement[i].y = y;
            localStorage.setItem('Text', JSON.stringify(positionElement));
            return 'Sửa cái đã có';
        }
    }
    // if i = -1 thì tạo mới
    if (i == -1) {
        var pos = new Text(id, x, y);
        positionElement.push(pos);
        localStorage.setItem('Text', JSON.stringify(positionElement));
        return 'Tạo mới';
    }
}

// set vị trí của 1 element
function setPositionOnLoad(id, x, y) {
    var elmnt = id.id ? id : document.getElementById(id);
    if (elmnt) {
        elmnt.style.top = y + 'px';
        elmnt.style.left = x + 'px';
    }
}

// chuột chữ phải vào chữ
function mouseClick(elmnt) {
    elmnt = elmnt.id ? elmnt : document.getElementById(elmnt);
    elmnt.addEventListener('mousedown', function (e) {
        var x = e.clientX;
        var y = e.clientY;
        if (e.button == 2) {
            e.preventDefault();
            mouseRightClick(elmnt, x, y);
        }
    });

    function mouseRightClick(elmnt, x, y) {
        if (document.getElementById(`for-${elmnt.id}`))
            document.getElementById(`for-${elmnt.id}`).remove();
        var el = document.createElement('div');
        el.id = `for-${elmnt.id}`;
        el.classList = 'mouse-right-when-click';
        el.style.top = y + 'px';
        el.style.left = x + 'px';
        el.innerHTML = `
            <ul>
                <li onclick="remoteEditText('${elmnt.id}',1)">Chỉnh sửa</li>
                <li onclick="setHideText('${elmnt.id}',0)">Ẩn</li>
                <li>Xóa</li>
            </ul>`;
        setTimeout(() => {
            el.remove();
        }, 5000);
        el.addEventListener('mouseleave', function () {
            el.remove();
        });
        document.querySelector('.main').appendChild(el);
    }
}

// Hiện ô sửa Text hoặc thêm mới
function editText(id, option) {
    var a;
    if (!id) a = new Text();
    else {
        var b = JSON.parse(localStorage.getItem('Text')) || [];
        b.forEach((element) => {
            if (element.id == id) a = element;
        });
    }
    var elmnt = document.createElement('div');
    elmnt.classList = 'edit-text';
    elmnt.style.fontFamily = 'Patrick Hand';
    elmnt.innerHTML = `<div class="edit-text-background"></div>
    <div class="col left">
        <h1 class="heading">Chỉnh sửa</h1>
        <div class="content">
            <span>Văn bản muốn hiển thị</span>
            <input class="text char" type="text" spellcheck="false" value="${a.text}" id="input-text">
            <span>Font size</span>
            <input class="text fontSize" type="number" min="10" max="200" value="${a.fontSize}" id="input-font-size">
            <span>Font</span>
            <select class="select-font" style="cursor: pointer;" value="${a.fontFamily}" id="input-font-family"></select>
            <span>Màu sắc</span>
            <input class="color-select" type="color" value="${a.color}" id="input-color">
            <span style="display: none">Màu Nền</span>
            <input style="display: none" class="color-select" type="color" value="${a.backgroundColor}" id="input-background-color">
            <span>
                Vị trí
            </span>
            <div class="pos">
                <div>
                    <span>x:</span>
                    <input type="number" min="-50" max="1280" value="${a.x}" id="pos-x">
                </div>
                <div>
                    <span>y:</span>
                    <input type="number" min="-50" max="600" value="${a.y}" id="pos-y">
                </div>
            </div>
            <div class="btn-group">
                <input type="button" value="Xác nhận" onclick="confirmText('${a.id}')">
                <input type="button" class="hide-text-edit" onclick="setHideTextWhenEdit('${a.id}')" value="Ẩn">
                <input type="button" onclick="remoteEditText()" value="Hủy">
            </div>
        </div>
    </div>
    <div class="col right">
        <div class="text-demo" style="font-family: '${a.fontFamily}'; font-size: ${a.fontSize}px;color: ${a.color}">${a.text}</div>
    </div>`;

    document.body.appendChild(elmnt);
    var option = {
        fontFamily: a.fontFamily,
    };
    setEventEditText(option);
}

// Hiện hoặc ẩn phần sửa text
function remoteEditText(id, status, option) {
    if (status == 1) {
        document.querySelector('.main').style.display = 'none';
        editText(id, option);
    } else location.reload();
}

// set sự kiện ở edit-text
function setEventEditText(option) {
    console.log('🚀 ~ file: main.js ~ line 242 ~ setEventEditText ~ option', option);
    Font.forEach((element) => {
        var op = document.createElement('option');
        if (element.name == option.fontFamily) op.selected = true;
        op.innerHTML = element.name;
        op.style.fontFamily = element.name;
        op.value = element.name;
        document.querySelector('.select-font').appendChild(op);
    });
    document.querySelector('.select-font').addEventListener('change', function (e) {
        var v = document.querySelector('.select-font').value;
        document.querySelector('.text-demo').style.fontFamily = v;
    });
    document.querySelector('.char').addEventListener('input', function (e) {
        var v = document.querySelector('.char').value;
        document.querySelector('.text-demo').innerHTML = v;
    });
    document.querySelector('.fontSize').addEventListener('input', function (e) {
        var v = document.querySelector('.fontSize').value;
        v = v < 10 ? 10 : v > 200 ? 200 : v;
        document.querySelector('.text-demo').style.fontSize = v + 'px';
    });
    document.querySelector('.color-select').addEventListener('input', function (e) {
        var v = document.querySelector('.color-select').value;
        document.querySelector('.text-demo').style.color = v;
    });
    var o = document.querySelector('.background');
    var src = o.style.backgroundImage;
    document.querySelector('.edit-text .edit-text-background').style.backgroundImage = src;
}
// Lưu Text vào localStorage
function saveEditText(id, option) {
    var a = JSON.parse(localStorage.getItem('Text')) || [];
    if (!checkInputEditText()) return;
    a.forEach((element) => {
        if (element.id == id) {
            element.text = document.getElementById('input-text').value || 'Chưa nhập text';
            element.color = document.getElementById('input-color').value || 'White';
            element.fontFamily =
                document.getElementById('input-font-family').value || 'Patrick Hand';
            element.fontSize = document.getElementById('input-font-size').value || 10;
            element.backgroundColor =
                document.getElementById('input-background-color').value || 'transparent';
            element.x = document.getElementById('pos-x').value || 0;
            element.y = document.getElementById('pos-y').value || 0;

            localStorage.setItem('Text', JSON.stringify(a));
        }
    });
}
// Kiểm tra dữ liệu đầu vào của text
function checkInputEditText() {
    var text = document.getElementById('input-text').value,
        fontSize = document.getElementById('input-font-size').value,
        x = document.getElementById('pos-x').value,
        y = document.getElementById('pos-y').value;

    if (!text) alert('Chưa nhập văn bản cần hiển thị');
    else if (fontSize < 10 || fontSize > 200) alert('Font size nhập vào không hợp lệ');
    else if (x < -50 || x > 1280) alert('X nhập vào không hợp lệ');
    else if (y < -50 || y > 700) alert('Y size nhập vào không hợp lệ');
    else return true;
}

// Xác nhận text or tạo mới Text
function confirmText(id, option) {
    saveEditText(id, option);
    remoteEditText('', 0, option);
}

function setHideText(id, option) {
    var a = JSON.parse(localStorage.getItem('Text')) || [];
    a.forEach((element) => {
        if (element.id == id) {
            element.status = option;
            localStorage.setItem('Text', JSON.stringify(a));
            location.reload();
        }
    });
}

function setHideTextWhenEdit(id) {
    var a = JSON.parse(localStorage.getItem('Text')) || [];
    a.forEach((element) => {
        if (element.id == id) {
            var status = element.status;
            if (status == 1) {
                element.status = 0;
                document.querySelector('.edit-text .hide-text-edit').value = 'Hiện thị';
            } else if (status == 0) {
                element.status = 1;
                document.querySelector('.edit-text .hide-text-edit').value = 'Ẩn';
            }
            localStorage.setItem('Text', JSON.stringify(a));
        }
    });
}

function removeText(id) {
    var a = JSON.parse(localStorage.getItem('Text')) || [];
    var i = 0;
    a.forEach((element) => {
        if (element.id == id) {
            var x = confirm('Xác nhận xóa Text: ' + element.text);
            if (x) {
                a.splice(i, 1);
            }
            localStorage.setItem('Text', JSON.stringify(a));
        }
        i++;
    });
}

function mouseClickBackground(elmnt) {
    elmnt = elmnt.id ? elmnt : document.getElementById(elmnt);
    elmnt.addEventListener('mousedown', function (e) {
        var x = e.clientX;
        var y = e.clientY;
        if (e.button == 2) {
            e.preventDefault();
            mouseRightClick(elmnt, x, y);
        }
    });

    function mouseRightClick(elmnt, x, y) {
        if (document.getElementById(`for-${elmnt.id}`))
            document.getElementById(`for-${elmnt.id}`).remove();
        var el = document.createElement('div');
        el.id = `for-${elmnt.id}`;
        el.classList = 'mouse-right-when-click';
        el.style.top = y + 'px';
        el.style.left = x + 'px';
        el.innerHTML = `
            <ul>
                <li onclick="">Chỉnh sửa hình nền</li>
                <li onclick="">Ẩn hình nền</li>
                <li>Danh sách Text</li>
            </ul>`;
        setTimeout(() => {
            el.remove();
        }, 5000);
        el.addEventListener('mouseleave', function () {
            el.remove();
        });
        document.querySelector('.main').appendChild(el);
    }
}
function setEvenEditBackground(option) {
    var o = document.querySelector('.background');
    var src = o.style.backgroundImage;
    document.querySelector('.edit-background').style.backgroundImage = src;
}
setEvenEditBackground();
var a = ['ABdE', 'ABde', 'AbdE', 'Abde', 'aBdE', 'abdE', 'abde', 'abdE'];
var b = ['ABdE', 'ABde', 'aBdE', 'aBde'];


