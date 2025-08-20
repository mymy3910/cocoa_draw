//入力された対象者たちと抽選人数を取得する
const targets_el = document.getElementById("targets");
const target_el  = document.getElementById("target");
//結果と残人数の出力欄取得
const subject_el = document.getElementById("subject");
const left_el = document.getElementById("left");
//操作ボタン取得
const draw_button = document.getElementById("draw_button");
const reset_button = document.getElementById("reset_button");

//抽選ボタンクリックで抽選イベント発火
function draw_winners(){
    //null許容ナシ
    const raw = targets_el.value || ""; 
    //抽選対象の配列をカンマ区切りで作成する（空白、重複除去あり）
    const tokens = raw.split(",").map(s => s.trim()).filter(Boolean); 
    const master_list = Array.from(new Set(tokens));
    //元の抽選対象者リストを保護したまま残人数用をコピー
    const pool = [...master_list];

    //抽選人数の入力値が未入力だった場合は数値の0に変換して負の値（マイナス）は絶対に入れない
    const target_number = Math.max(0, Number(target_el.value || 0));

    //対象人数が0と入力された場合のエラーハンドリング
    if (pool.length === 0) {
        subject_el.textContent = "対象者がいません。";
        return;
   }

    //抽選処理
    //対象人数取得
    const draw_count = Math.min(target_number, pool.length);
    //対象者を入れる配列の作成
    let winners = [];

    //ランダムに抽選対象者人数分（draw_count）をループで取得   
    for (let i = 0; i < draw_count; i++){
        //ランダムに残人数から抽選開始
        const rand_index = Math.floor(Math.random() * pool.length);
        //抽選結果を配列にどんどん詰めていく
        const winner = pool[rand_index]; 
        //作った空の箱に抽選結果を配列として追加
        winners.push(winner);
        //抽選対象が重複しないように１度選ばれた人は削除する
        pool.splice(rand_index, 1);
    }

    //取得した対象者表示
    subject_el.innerHTML = winners.join("<br>");
    if (target_number > draw_count) {
        subject_el.innerHTML += `<br><small>※残りが不足していたので ${draw_count} 名のみ抽選</small>`;
    }

    //抽選対象者の残り人数を表示する
    function update_left(){
        left_el.textContent = `${pool.length}人`;
    }

    update_left();
}
    
//リセットボタン押下時
function reset(){
   //もろもろリセット
    target_el.value = "";
    targets_el.value = "";
    subject_el.textContent = "";
    left_el.textContent = "0人"; // リセット時は0人に戻す 
};

// イベントリスナーの登録
draw_button.addEventListener('click', draw_winners);
reset_button.addEventListener('click', reset);

// 初期表示（残り人数を0人にする）
left_el.textContent = "0人";