let cards=[
    "A","2","3","4","5","6","7","8","9","10","J","Q","K",
    "A","2","3","4","5","6","7","8","9","10","J","Q","K",
];

let hanntei=["hoge","fuga"];
let mekuri=["hoge","fuga"];
let scoer=0;
let mekuriCount=0;
let missCount=0;
let missCount2=0;
let time = 0;

window.alert("準備はいい？");
/**********************************タイマー */
var testTimer;

function startTimer(){
testTimer=setInterval(function(){
//繰り返し処理させたいコード
document.getElementById("time").textContent=time;
time=time+1;
} , 1000);
}
startTimer();
//stopTimer();

//*******************************************: */
function stopTimer(){
clearInterval(testTimer);
}

//document.getElementById("scoer").textContent=scoer;

let finish = function(){
    
    scoer=scoer-time;
    window.alert("終了!!\n****結果****\n経過時間"+time+" 秒\n間違えた回数"+missCount+" 回\n同じカードをクリックした回数"+missCount2+" 回\n\nスコア"+scoer+" pt");
    
    
        let result = window.confirm('もう一度チャレンジする？');
        
        if( result ) {
     
            //「true」の処理
            location.reload();
     
        }
        else {
            
            //「false」の処理
            window.alert("また遊んでね！");
            
        }

}

let uragaeshi = function(){
    
        document.getElementById(mekuri[0]).textContent="";
        document.getElementById(mekuri[1]).textContent="";
        document.getElementById("field").style.pointerEvents="visible";
  }

function judge(){

    if(mekuri[0]==mekuri[1]){
        window.alert("❕エラー❕\n同じカードです。");
        document.getElementById(mekuri[0]).textContent="";

        missCount2=missCount2+1;
        scoer=scoer-1;
        //document.getElementById("scoer").textContent=scoer;
        console.log("スコア"+scoer);
    }
    else if(hanntei[0]==hanntei[1] && mekuri[0]!=mekuri[1]){
        //window.alert("正解");
            scoer=scoer+20;
            //document.getElementById("scoer").textContent=scoer;

            document.getElementById(mekuri[0]).style.backgroundColor="red";
            document.getElementById(mekuri[1]).style.backgroundColor="red";

            document.getElementById(mekuri[0]).style.pointerEvents="none";
            document.getElementById(mekuri[1]).style.pointerEvents="none";

            console.log("スコア"+scoer);

            mekuriCount=mekuriCount+2;
            if(mekuriCount==cards.length){
                stopTimer();
                setTimeout(finish,10);
            }
    }else{
        //不正解
        missCount=missCount+1;
        scoer=scoer-1;
        document.getElementById("field").style.pointerEvents="none";
        //document.getElementById("scoer").textContent=scoer;
        setTimeout(uragaeshi, 900);
        console.log("スコア"+scoer);
        
    }
}

//クリック処理
let count=0;
function click(e){
    
        //id取得
        let elm_id=e.target.id;
        //class取得
        let elm_class=e.target.className;
    
        console.log(elm_id);
        console.log(elm_class);

        let tmp = document.getElementById(elm_id);
        //id=1に配列1番目を与える
        tmp.textContent =cards[elm_id];

        hanntei[count]=tmp.textContent;
        mekuri[count]=elm_id;

        console.log(hanntei);
        console.log(mekuri);

        if(count==1){
            count=0;
                return judge();
        }else{
            count++;
            return click();
        }
}
//---------------------------------------------------------
let field = document.getElementById("field");


//乱数を作る
function rand(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
}
//カードをシャッフル
for(let i=cards.length-1;i>0;i--){
    let r=rand(0,i);
    let tmp=cards[i];
    cards[i]=cards[r];
    cards[r]=tmp;
}

console.log(cards);
//カードシャッフル（配列シャッフル）完了
for(let i=0;i<cards.length;i++){
    let elm = document.createElement("div");
    //class付与
    elm.className="card";
    //id付与
    elm.id = i;

    elm.textContent="";

    field.appendChild(elm);
    elm.onclick=click;
}
