<#macro accordionItem itemId itemLabel>
<div class="panel panel-primary">
    <div class="panel-heading" role="tab">
         <h4 class="panel-title">
             <a role="button" data-toggle="collapse" data-parent="#accordion" href="#${itemId?html}">
                 ${itemLabel?html}
             </a>
         </h4>
    </div>
    <div id="${itemId?html}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
        <ul class="list-group">
            <#nested/>
        </ul>
    </div>
</div>
</#macro>