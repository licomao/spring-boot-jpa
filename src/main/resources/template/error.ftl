<#-- @ftlroot "." -->
<#import "macros/generalFrame.ftl" as general />

<#escape x as x?html>

<#function rand min max>
    <#local now = .now?long?c />
    <#local randomNum = _rand +
    ("0." + now?substring(now?length-1) + now?substring(now?length-2))?number />
    <#if (randomNum > 1)>
        <#assign _rand = randomNum % 1 />
    <#else>
        <#assign _rand = randomNum />
    </#if>
    <#return (min + ((max - min) * _rand))?round />
</#function>
<#assign _rand = 0.36 />

<@general.frame title="出错啦">
<div class="container">
    <div class="row">
        <div class="span12">
            <div class="hero-unit center-text">
                <h1>
                    <#if status == 404 >
                        无法找到请求页面
                    <#elseif status == 400>
                        请求参数错误
                    <#elseif status == 405>
                        非法请求
                    <#elseif status == 500>
                        服务器异常
                    <#else>
                        请求失败
                    </#if>
                    <small><font face="Tahoma" color="red">Error ${status}</font></small></h1>
                <br />
                <#assign words={
                    "0":"也许抽根烟回来就好了……",
                    "1":"你打开的姿势不对……",
                    "2":"呵呵～嘿嘿～"} />
                <p>${words[rand(0,2)?string]}</p>
                <a href="/" class="btn btn-large btn-info"><i class="icon-home icon-white"></i>回首页</a>
                <a href="#" class="btn btn-large btn-default" onclick="history.go(-1);"><i class="icon-home icon-white"></i>返回前一页面</a>
            </div>
            <br />
            <p>
                ${trace!""?html}
            </p>
        </div>
    </div>
</div>
</@general.frame>

</#escape>