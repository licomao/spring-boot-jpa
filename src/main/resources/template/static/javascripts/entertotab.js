function checkobjvisual(e) //检查控件是否可见
{
    var objvis = false;
    if (e) {
        if (e.offsetHeight > 0) {
            objvis = true;
        }
        if (e.offsetTop > 0) {
            objvis = true;
        }
        
         if (e.readOnly == true) {
             objvis = false;  
       }  
      
    }
    return objvis;
}


//查找下一个控件
function focunext(next_id) {


    var code;
    if (!e) {
        var e = window.event;
    }
    if (e.keyCode) {
        code = e.keyCode;
    }
    else if (e.which) {
        code = e.which;
    }
    if (code == 13) {


        if (next_id)
        {document.getElementById(next_id).focus(); }
        else {
            var inputList = document.getElementsByTagName("input");
            // 循坏这个集合，包括了所有的input。
            var nextindex;
            nextindex = -1;
            for (i = 0; i < inputList.length; i++) {
                if (inputList[i] == document.activeElement) {
                    var acobj = document.activeElement;
                    nextindex = i + 1;
                    
                    while ((!checkobjvisual(inputList[nextindex])) && (nextindex <= inputList.length)) {
                        nextindex = nextindex + 1;
                    }
                    if (inputList[nextindex])  inputList[nextindex].focus();
                    break;
                }
            }
            
        }
    }
}


document.onkeydown = function(e) {
    var code;
    if (!e) {
        var e = window.event;
    }
    if (e.keyCode) {
        code = e.keyCode;
    }
    else if (e.which) {
        code = e.which;
    }


    if (code == 8) {
        if (document.activeElement.readOnly == true || document.activeElement.disabled == true)
        { return false; }
    }


    if (code == 13) {
        if (document.activeElement.type == "textarea") {
            return;
        }
        if (document.activeElement.type != "submit" && document.activeElement.type != "button") {
 
            // event.keyCode = 9;
            focunext();
            return false;
        }
    }

}