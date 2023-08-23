let op1 = '', op2 = '', opr = '', sflag = 0, flag = 0, mf = 0, ans = '', dis = '';

function add(op1, op2){
    num = parseFloat(op1) + parseFloat(op2);
    return parseFloat(num.toFixed(4));
}

function sub(op1, op2){
    num = parseFloat(op1) - parseFloat(op2);
    return parseFloat(num.toFixed(4));
}

function mul(op1, op2){
    num = parseFloat(op1) * parseFloat(op2);
    return parseFloat(num.toFixed(4));
}

function div(op1, op2){
    num = parseFloat(op1) / parseFloat(op2);
    return parseFloat(num.toFixed(4));
}

function operate(op1, op2, opr) {
    if (opr == '+'){
        return add(op1, op2);
    }
    else if(opr == '-'){
        return sub(op1, op2);
    }
    else if(opr == '*'){
        return mul(op1, op2);
    }
    else if(opr == '/'){
        return div(op1, op2);
    }
}


const clear = document.getElementById("clear");
const del = document.getElementById("delete");

function clr(){
    clear.addEventListener("click", () => {
        dis = '';
        op1 = '';
        op2 = '';
        ans = '';
        document.getElementById("text").value = '';
        document.getElementById("number").value = '';
        flag = 0;
        sflag = 0;
    });
}

function dele(){
    del.addEventListener("click", () => {
        sliced = document.getElementById("text").value;
        document.getElementById("text").value = sliced.slice(0,-1);
        if(flag == 0){
            if(sflag == 0){
                op1 = sliced.slice(0,-1);
                dis = op1;
            }
            else {
                sflag = 0;
                opr = ''
                dis = sliced.slice(0,-1);
            }
        }
        if(flag == 1){
            if(sflag == 0){
                op2 = sliced.slice(0,-1);
                dis = op2;
            }
            else {
                sflag = 0;
                opr = '';
                dis = sliced.slice(0,-1);
                flag = 0;
            }
        }
    });
}

const ops = document.getElementsByClassName("op");

function setUpButtonClickEvent(){
    clr();
    dele();
    for(const op of ops){
        op.addEventListener("click", () => {
            if(op.value == "-" && mf == 0 && op1 == ''){
                if (flag == 0){
                    op1 += op.value;
                    dis = op1;
                    
                }
                else if (flag == 1){
                    op2 += op.value;
                    dis = op2;
                }
                document.getElementById("text").value = dis;
                mf = 1;
            }
            else if(op.value == "+" || op.value == "-" ||op.id == "*" ||op.id == "/"){              
                if(sflag != 1){
                    opr = op.id;
                    dis += opr;
                    document.getElementById("text").value = dis;
                    flag = 1;
                    sflag = 1; 
                    if(op1 != '' && op2 != ''){
                        op1 = ans;
                        op2 = ''; 
                    }
                    mf = 0;
                }
            }
            else if(op.value == "=") {
                if(op1 == '' || op2 == ''){
                    op1 = ans;
                    op2 = '';
                }
                else if(!isFinite(ans)){
                    op1 = '';
                    op2 = '';
                }
                else{
                    ans = operate(op1, op2, opr);
                    document.getElementById("number").value = ans;
                    op1 = ans;
                    op2 = '';
                    dis += '';
                    document.getElementById("text").value = dis;
                }
                flag = 0;
            }
            else if(flag == 1 )
            {   
                if(op2.includes(".") && op.value == "."){
                    document.getElementById("text").value = op2;
                }
                else{
                    if(!isFinite(op1) || op1 == 0)
                        flag = 0;
                    op2 += op.value;
                    ans = operate(op1, op2, opr);
                    document.getElementById("number").value = ans;
                    document.getElementById("text").value = op2;
                    dis = ans;
                    sflag = 0;
                }
            }
            else {
                if(op1.includes(".") && op.value == "."){
                    document.getElementById("text").value = op1;
                }
                else{
                    if(!isFinite(op1) && op1 != "-")//this needs some fix but will do the job
                        op1 = "";
                    op1 += op.value;
                    document.getElementById("text").value = op1;
                    dis = op1;
                    sflag = 0;
                }
            }
        });
    }
}
setUpButtonClickEvent();
