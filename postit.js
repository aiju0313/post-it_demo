//ドラッグ座標と付箋紙頂点のオフセット(絶対座標)
var offsetX = 0;
var offsetY = 0;

//ドラッグ
function dragMemo(event) {
    //付箋紙のIDを格納
    event.dataTransfer.setData("text", event.target.id);

    //ドラッグした付箋紙の取得
    var memoElement = document.getElementById(event.target.id);

    offsetX = event.clientX - memoElement.offsetLeft;
    offsetY = event.clientY - memoElement.offsetTop;
}

//ドロップ
function dropMemo(event) {
    //格納されたIDを取り出す
    var id = event.dataTransfer.getData("text");
    //ドラッグした付箋紙の取得
    var memoElement = document.getElementById(id);
    //付箋紙の座標をドロップした座標にセット
    memoElement.style.left = event.clientX - offsetX + "px";
    memoElement.style.top = event.clientY - offsetY + "px";
}
//ドラッグ中
function dragOverMemo(event) {
    //通常のドラッグの動作を禁止
    event.preventDefault();
}


//----------ボタンクリックで付箋紙を自由に追加-------------
//付箋紙IDのカウンター
var memoCurrentId = 1

//付箋紙の追加
function addMemo() {
    //入力されたテキストの取得
    var memoText = document.getElementById("memoText").value;

    //選択された色の取得
    var memoColor = "yellow"

    if (document.getElementById("memoY").checked) memoColor = "yellow";
    if (document.getElementById("memoR").checked) memoColor = "red";
    if (document.getElementById("memoG").checked) memoColor = "green";

    //付箋紙DOM要素の作成(こっから70行目までで付箋紙のaタグをＤＯＭ要素として動的に作成している)
    var memoElement = document.createElement("a"); //aタグのＤＯＭ要素を作成し、memoElementに代入

    //付箋紙DOM要素のプロパティ（情報を格納する変数）をセット
    memoElement.href = "#"; //IDの情報。
    memoElement.id = "memo" + memoCurrentId; //付箋紙に表示するテキストの情報。文字列のmemoを付箋紙ＩＤを生成するためのカウンター(変数memocurrentID)に連結させ、idプロパティにセット
    memoElement.className = "memo "+memoColor; //付箋紙の色の情報
    memoElement.draggable = true; //配置座標(x,y)の情報

    //付箋紙ＤOM要素のイベントをリセット
    memoElement.ondragstart = dragMemo;

    //付箋紙ＤOMy応訴のテキストをセット
    memoElement.innerHTML = memoText;

    //付箋紙エリアに作成した付箋紙を追加
    var memoArea = document.getElementById("memoArea");
    memoArea.appendChild(memoElement);
    //カウンターのインクリメント
    memoCurrentId++;
}


//memoクラス
function Memo(id, text, color, x, y) {
    //プロパティ
    this.id = "memo" + id;
    this.text = text;
    this.color = color;
    this.x = x;
    this.y = y;

    //DOM要素を作成するcreateメソッド
    this.create = function() {
        //付箋紙DOM要素の作成
        var memoElement = document.createElement("a");
        memoElement.href = "#";
        memoElement.id = this.id;
        memoElement.className = "memo "+this.Color;
        memoElement.draggable = true;
        memoElement.ondragstart = dragMemo;
        memoElement.innerHTML = this.Text;

        //付箋紙エリアに作成した付箋紙を追加
        var memoArea = document.getElementById("memoArea");
        memoArea.appendChild(memoElement);
}
}



// 付箋紙を削除する
function deleteMemo(event) {
    // ドラッグされた付箋紙のIDを取得
    var memoId = event.dataTransfer.getData("text");
    
    // 対応する付箋紙要素を取得
    var memoElement = document.getElementById(memoId);
    
    // 付箋紙を削除
    if (memoElement) {
        memoElement.parentNode.removeChild(memoElement);
    }
}

