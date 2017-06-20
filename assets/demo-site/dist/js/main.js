function Drawer(e){this.drawerContainer=e,this.drawer=e.querySelector(".drawer"),this.active=!1,this.toggle=function(){this.active?this._hideDrawer():this._showDrawer()},this._showDrawer=function(){this.active=!0,this.drawerContainer.classList.add("in");var e=this;requestAnimationFrame(function(){requestAnimationFrame(function(){e.drawerContainer.classList.add("active"),document.body.addEventListener("touchend",e._onBodyClick)})})},this._removeDrawer=function(){this.drawerContainer.removeEventListener("transitionend",this._removeDrawer),this.active=!1,this.drawerContainer.classList.remove("in")},this._hideDrawer=function(){document.body.removeEventListener("touchend",this._onBodyClick),this.drawerContainer.classList.remove("active"),this.drawerContainer.addEventListener("transitionend",this._removeDrawer)},this._onBodyClick=function(e){this.active&&(this.drawer.contains(e.target)||this._hideDrawer())},this._init=function(){this._onBodyClick=this._onBodyClick.bind(this),this._removeDrawer=this._removeDrawer.bind(this)},this._init()}function CodeBlock(e){this.body=e,this.btn=e.querySelector(".demo-code--copy"),this._addEventListeners=function(){this.clipboard.on("success",function(e){}),this.clipboard.on("error",function(e){throw new Error(e)})},this._init=function(){var e=this;this.clipboard=new Clipboard(this.btn,{text:function(t){return e.body.innerText}}),this._addEventListeners()},this._init()}var headerIcon=document.getElementById("headerIcon"),drawer=new Drawer(document.getElementById("drawerContainer"));headerIcon.addEventListener("click",function(){drawer.toggle()});for(var codeBlocks=document.querySelectorAll(".demo-code"),i=0;i<codeBlocks.length;i+=1)new CodeBlock(codeBlocks[i]);