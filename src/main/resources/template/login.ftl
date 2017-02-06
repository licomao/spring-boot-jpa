<#--<#import "macros/generalFrame.ftl" as general />-->
<#--<#import "macros/formMacros.ftl" as form />-->
<#import "/spring.ftl" as spring />


<#escape x as x?html>
    <@general.frame title="XXXX业务系统">

    <script>
        $(function () {
            $("#fm").submit();
        });

    </script>
<body style="background-color: #cccccc;">
    <div class=" " style="margin-top:100px;width: 98%">
        <img src="">
        <div class="row text-center">
            <img src="/stylesheets/images/index_logo.png"  width="250px;">
            <p style="font-size: 25px;">
               xxxxxx业务系统
            </p>
        </div>
        <div class="col-md-2 col-md-offset-5">
            <#if error?? && error.isPresent()>
                <p class="text-danger"><@spring.message code="login.error"/></p>
            </#if>
            <form action='/login' method="post"  id="fm">
                <div class="form-group">
                    <input class="form-control" type="text" name="username" id="username" value="admintest"  readonly style="display: none">
                </div>
                <div class="form-group">
                    <input class="form-control" type="password" name="password" id="password"  value="111111"  readonly style="display: none">
                </div>
                <button class="btn btn-primary  btn-block" type="submit">试用账户登录</button>
            </form>
        </div>
    </div>
</body>
    </@general.frame>

</#escape>