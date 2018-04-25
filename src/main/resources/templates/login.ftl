<#--<#import "macros/generalFrame.ftl" as general />-->
<#--<#import "macros/formMacros.ftl" as form />-->
<#import "/spring.ftl" as spring />


<#escape x as x?html>
    <#--<@general.frame title="骜顺SAAS业务系统">-->

<body style="background-color: #cccccc;">
    <div class=" " style="margin-top:100px;width: 98%">

        <div class="col-md-2 col-md-offset-5">
            <#if error?? && error.isPresent()>
                <p class="text-danger"><@spring.message code="login.error"/></p>
            </#if>


            <form action='/login' method="post"  id="fm">
                <div class="form-group">
                    <label for="username" class="control-label" >用户名</label>
                    <input class="form-control" type="text" name="username" id="username" autofocus>
                </div>
                <div class="form-group">
                    <label for="password" class="control-label"  >密 码</label>
                    <input class="form-control" type="password" name="password" id="password"  onkeydown='if(event.keyCode==13){$("#fm").submit();}'>
                </div>
                <button class="button button-block button-rounded button-primary button-small" style="width: 100%" type="submit">登 录</button>
            </form>
        </div>
    </div>

</body>

</#escape>