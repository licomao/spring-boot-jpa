<input id="msg" type="hidden" value="${message}" />
<input name="responsePage" id="responsePage" type="hidden" value="${responsePage}" />
<script>
    var msg = document.getElementById("msg").value;
    var responsePage = document.getElementById("responsePage").value;
    alert(msg);
    if(responsePage == "") {
        window.close;
    }else {
        window.location.href = responsePage;
    }
</script>