class Text {
    constructor(id, options) {
        options = options || {};
        this.id = id || createId();
        this.text = options.text || '';
        this.color = options.color || 'black';
        this.fontFamily = options.fontFamily || 'Patrick Hand';
        this.fontSize = options.fontSize || 24;
        this.backgroundColor = options.backgroundColor || 'transparent';
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.status = options.status || 1;
        this.bold = 'initial';
        this.italic = 'initial';
        this.colorType = options.colorType || 0;
        this.multiColor = options.multiColor || {
            pos: 'left',
            color1: '#E0144C',
            color2: '#379237',
            color3: '#0008C1',
            color4: '#ffffff',
        };
    }
}

function createId(length) {
    var d = new Date().getDate(),
        m = new Date().getMonth(),
        y = new Date().getFullYear();

    d = d < 10 ? '0' + d : d;
    m = m < 10 ? '0' + m : m;
    var str = 'qwertyuiopasdfghjkzxcvbnm';
    var arr = str.split('');
    length = length || 8;
    length = length < 8 ? 8 : length > 18 ? 18 : length;

    var id = '';
    while (length--) {
        var n = Math.floor(Math.random() * (str.length - 1));
        id += arr[n];
    }
    return id + '_' + d + m + y;
}

const Font = [
    {
        name: 'Allison',
        src: 'Allison-Regular.ttf',
    },
    {
        name: 'Allura',
        src: 'Allura-Regular.ttf',
    },
    {
        name: 'Alumni Sans Collegiate One',
        src: 'AlumniSansCollegiateOne-Regular.ttf',
    },
    {
        name: 'AmaticSC',
        src: 'AmaticSC-Regular.ttf',
    },
    {
        name: 'AndadaPro',
        src: 'AndadaPro-VariableFont_wght.ttf',
    },
    {
        name: 'Big Shoulders Stencil Display',
        src: 'BigShouldersStencilDisplay-VariableFont_wght.ttf',
    },
    {
        name: 'Bungee Inline',
        src: 'BungeeInline-Regular.ttf',
    },
    {
        name: 'Bungee Shade',
        src: 'BungeeShade-Regular.ttf',
    },
    {
        name: 'Charmonman',
        src: 'Charmonman-Regular.ttf',
    },
    {
        name: 'Coiny',
        src: 'Coiny-Regular.ttf',
    },
    {
        name: 'Comforter Brush',
        src: 'ComforterBrush-Regular.ttf',
    },
    {
        name: 'Dancing Script',
        src: 'DancingScript-VariableFont_wght.ttf',
    },
    {
        name: 'Ephesis',
        src: 'Ephesis-Regular.ttf',
    },
    {
        name: 'Ephesis',
        src: 'Ephesis-Regular.ttf',
    },
    {
        name: 'Farsan',
        src: 'Farsan-Regular.ttf',
    },
    {
        name: 'Fuzzy Bubbles Bold',
        src: 'FuzzyBubbles-Bold.ttf',
    },
    {
        name: 'Fuzzy Bubbles Regular',
        src: 'FuzzyBubbles-Regular.ttf',
    },
    {
        name: 'Grape Nuts',
        src: 'GrapeNuts-Regular.ttf',
    },
    {
        name: 'Great Vibes',
        src: 'GreatVibes-Regular.ttf',
    },
    {
        name: 'Ingrid Darling',
        src: 'IngridDarling-Regular.ttf',
    },
    {
        name: 'Inspiration',
        src: 'Inspiration-Regular.ttf',
    },
    {
        name: 'Island Moments',
        src: 'IslandMoments-Regular.ttf',
    },
    {
        name: 'Lavishly Yours',
        src: 'LavishlyYours-Regular.ttf',
    },
    {
        name: 'Lovers Quarrel',
        src: 'LoversQuarrel-Regular.ttf',
    },
    {
        name: 'Mali',
        src: 'Mali-Regular.ttf',
    },
    {
        name: 'Ms Madi',
        src: 'MsMadi-Regular.ttf',
    },
    {
        name: 'My Soul',
        src: 'MySoul-Regular.ttf',
    },
    {
        name: 'Oooh Baby',
        src: 'OoohBaby-Regular.ttf',
    },
    {
        name: 'Pacifico',
        src: 'Pacifico-Regular.ttf',
    },
    {
        name: 'Pangolin',
        src: 'Pangolin-Regular.ttf',
    },
    {
        name: 'Patrick Hand',
        src: 'PatrickHand-Regular.ttf',
    },
    {
        name: 'Potta One',
        src: 'PottaOne-Regular.ttf',
    },
    {
        name: 'Qwigley',
        src: 'Qwigley-Regular.ttf',
    },
    {
        name: 'Qwitcher Grypen',
        src: 'QwitcherGrypen-Regular.ttf',
    },
    {
        name: 'Road Rage',
        src: 'RoadRage-Regular.ttf',
    },
    {
        name: 'Rowdies',
        src: 'Rowdies-Regular.ttf',
    },
    {
        name: 'Ruge Boogie',
        src: 'RugeBoogie-Regular.ttf',
    },
    {
        name: 'Ruthie',
        src: 'Ruthie-Regular.ttf',
    },
    {
        name: 'Sedgwick Ave',
        src: 'SedgwickAve-Regular.ttf',
    },
    {
        name: 'Send Flowers',
        src: 'SendFlowers-Regular.ttf',
    },
    {
        name: 'Shalimar',
        src: 'Shalimar-Regular.ttf',
    },
    {
        name: 'Smooch',
        src: 'Smooch-Regular.ttf',
    },
    {
        name: 'Splash',
        src: 'Splash-Regular.ttf',
    },
    {
        name: 'Square Peg',
        src: 'SquarePeg-Regular.ttf',
    },
    {
        name: 'Style Script',
        src: 'StyleScript-Regular.ttf',
    },
    {
        name: 'Tapestry',
        src: 'Tapestry-Regular.ttf',
    },
    {
        name: 'Tourney',
        src: 'Tourney-VariableFont_wdth,wght.ttf',
    },
    {
        name: 'Updock',
        src: 'Updock-Regular.ttf',
    },
    {
        name: 'VT323',
        src: 'VT323-Regular.ttf',
    },
    {
        name: 'Water Brush',
        src: 'WaterBrush-Regular.ttf',
    },
    {
        name: 'Whisper',
        src: 'Whisper-Regular.ttf',
    },
    {
        name: 'Wind Song',
        src: 'WindSong-Regular.ttf',
    },
];
function randomColor() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return '#' + randomColor;
}
function randomColorColorText(text) {
    var a = text.split('');
    var span = '';
    for (let i = 0; i < a.length; i++) {
        span += `<span style="color:${randomColor()}">${a[i]}</span>`;
    }
    return span;
}
function randomColorColorTextWithTime(element, time) {
    if (time == 0) return;
    randomColorColorText(element);
    setInterval(() => {
        randomColorColorText(element);
    }, time);
}

// chuột chữ phải vào chữ
function mouseClickText(elmnt) {
    elmnt = elmnt.id ? elmnt : document.getElementById(elmnt);
    elmnt.addEventListener('mousedown', function (e) {
        var main = document.querySelector('.main');

        var x = e.clientX;
        var y = e.clientY;
        if (main.clientHeight - y < 100) y = y - 100;
        if (y < 10) y = 10;
        if (main.clientWidth - x < 100) x = x - 100;
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
