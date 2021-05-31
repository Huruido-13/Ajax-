function main(){
    const userid = document.getElementById('text-box').value;
    fetchUserInfo(userid)
    .then((userInfo) => createView(userInfo))
    .then((view) => displayView(view))
    .catch((error) => {
        console.error(`エラーが発生しました(${error})`);
    });
    console.log("こっちのほうがはやいよー");
}

function escapeSpecialChars(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function escapeHTML(strings, ...values) {
    return strings.reduce((result, str, i) => {
        const value = values[i - 1];
        if (typeof value === "string") {
            return result + escapeSpecialChars(value) + str;
        } else {
            return result + String(value) + str;
        }
    });
}

function fetchUserInfo(userId) {
    return fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
            }
            else {
                console.log("githubステータスの読み込みに成功しました");
                return response.json();
            };}
        )
    }

function createView(userInfo){
    return escapeHTML`
                <h4>${userInfo.name} (@${userInfo.login})</h4>
                <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
                <dl>
                    <dt>Location</dt>
                    <dd>${userInfo.location}</dd>
                    <dt>Repositories</dt>
                    <dd>${userInfo.public_repos}</dd>
                </dl>
                `;
}

function displayView(view){
    const result = document.getElementById("result");
    result.innerHTML = view;
}


// ボタンを動的に作成し、作成したボタンからさらにボタンを作成。
//その後、2回目に作成したボタンのonclickにfetchUserInfo()関数を渡すメソッド（練習用に作成）
// function addNewbutton() {
//     const sect = document.querySelector("body");
//     const para = document.createElement('button');
//     para.textContent = "github取得";
//     para.onclick = fetchUserInfo;
//     sect.appendChild(para);
// }

// function main(){
//     const sect = document.querySelector("body");

//     const para = document.createElement('button');
    
//     para.textContent = "github情報ボタンを発生させます";
//     para.onclick = addNewbutton;
//     sect.appendChild(para);
// }


