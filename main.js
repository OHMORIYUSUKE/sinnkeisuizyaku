let cards=[
    "A","2","3","4","5","6","7","8","9","10","J","Q","K",
    "A","2","3","4","5","6","7","8","9","10","J","Q","K",
];

let hanntei=["hoge","fuga"];
let mekuri=["hoge","fuga"];
let scoer=0;
let mekuriCount=0;

document.getElementById("scoer").textContent=scoer;

let finish = function(){
    window.alert(`終了!
スコアは${scoer}です。`);
}

let uragaeshi = function(){

        for(let i=0;i<cards.length;i++){
            if(document.getElementById(i).style.backgroundColor!=="red" && document.getElementById(i).textContent==cards[i]){
                document.getElementById(i).textContent="";

                --scoer;
                document.getElementById("scoer").textContent=scoer;
                //console.log(scoer);
                // hanntei=["hoge","fuga"];
                // mekuri=["hoge","fuga"];
            }else if(document.getElementById(i).style.backgroundColor==="red"){
                document.getElementById(i).textContent=cards[i];
            }
        }
  }

function judge(){

    if(mekuri[0]==mekuri[1]){
        window.alert("❕エラー❕\n同じカードです。");
        document.getElementById(mekuri[0]).textContent="";
        --scoer;
        document.getElementById("scoer").textContent=scoer;
    }
    else if(hanntei[0]==hanntei[1] && mekuri[0]!=mekuri[1]){
        //window.alert("正解");
            scoer=scoer+20;
            document.getElementById("scoer").textContent=scoer;

            document.getElementById(mekuri[0]).style.backgroundColor="red";
            document.getElementById(mekuri[1]).style.backgroundColor="red";

            document.getElementById(mekuri[0]).style.pointerEvents="none";
            document.getElementById(mekuri[1]).style.pointerEvents="none";

            mekuriCount=mekuriCount+2;
            if(mekuriCount==cards.length){
                setTimeout(finish,600);
            }
    }else{
        //不正解
        
        setTimeout(uragaeshi, 1000);
        
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
console.log("バグを見つけてください。お願いします。");
console.log("at click (main.js:64)at HTMLDivElement.click (main.js:86)は原因が分かりませんでした。")

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
