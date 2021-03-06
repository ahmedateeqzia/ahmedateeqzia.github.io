////////////////////////////////////////////////////////////////////////
//	JQueery for Tooltip of Ahmed-Ateeq-Zia  v 1.0
//	Publisher and Developer: Usama Ahmed
//	E-mail: usamaahmed7@yahoo.com
//	Web-site: www.ahmedateeqzia.blogspot.com
//	Copyright: � 1994-2020 Ahmeds Media Inc
//	Warning ! This Script is marked as copyright laws.
//	You have not permition to view or use it contains for any use.
////////////////////////////////////////////////////////////////////////
var uniTipTag = "a,img,p,div,span,zia,iframe,embed,input,table,tr,td";
var uniTipClass = "aaztip";
var uniTipX = 6;
var uniTipY = 6;
var offsetX = uniTipX, offsetY = uniTipY, elewidth = null, eleheight = null, tipid = null, tiptop = null, tipbot = null, tipcapin=null, tippointin=null, altText=false;
var x=0, y=0, WinWidth=0, WinHeight=0, TipWidth=0, TipHeight=0, CapHeight=0, PointHeight=0;
init = function () {
	var elementList = uniTipTag.split(",");
	for(var j = 0; j < elementList.length; j++) {	
		var elements = document.getElementsByTagName(elementList[j]);
		
		if(elements) {
			for (var i = 0; i < elements.length; i ++) {
				if (uniTipClass != '') {
				
					var elClass = elements[i].className;
					var elClassList = uniTipClass.split(",");
					
					for (var h=0; h < elClassList.length; h++) { if (elClass.match(elClassList[h])) unitipize(elements[i]); }
					
				} else unitipize(elements[i]);
			}
		}
	}
}
unitipize = function (element) {
	var a = element;
	altText = (a.alt && a.getAttribute("alt") != '' ) ? true : false;
	var sTitle = (altText == true) ? a.getAttribute("alt") : a.getAttribute("title");				
	if(sTitle) {
		a.onmouseover = function() {build(a, sTitle);};
		a.onmouseout = function() {hide(a, sTitle);};
	}
}
build = function (a, sTitle) {
	
	if (a.title) a.title = "";
	if (altText==true) a.alt = "";
	
	var tipContainer = document.createElement("div");
	tipContainer.setAttribute("id", "unitip");
	document.body.appendChild(tipContainer);
	
	var tipContainerTop = document.createElement("div");
	tipContainerTop.setAttribute("id", "unitippoint");
	tipContainer.appendChild(tipContainerTop);
	
	var tipContainerMid = document.createElement("div");
	tipContainerMid.setAttribute("id", "unitipmid");
	tipContainer.appendChild(tipContainerMid);
	
	var tipContainerBot = document.createElement("div");
	tipContainerBot.setAttribute("id", "unitipcap");
	tipContainer.appendChild(tipContainerBot);

	tipid = document.getElementById("unitip");
	tippoint = document.getElementById("unitippoint");
	tipmid = document.getElementById("unitipmid");
	tipcap = document.getElementById("unitipcap");
	
	document.getElementById("unitipmid").innerHTML = sTitle;
	tipid.style.position = "absolute";
	tipid.style.display = "block";
	
	elewidth = document.getElementById("unitipmid").offsetWidth;
	eleheight = document.getElementById("unitip").offsetHeight;
	
	WinWidth = document.body.offsetWidth;
	WinHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
	
	CapHeight = document.getElementById('unitipcap').offsetHeight;
	PointHeight = document.getElementById('unitippoint').offsetHeight;
	
	if (typeof pngfix=="function") {
		if (tippoint.currentStyle.backgroundImage.match(/\.png/gi)) {
			var tipP = tippoint.innerHTML;
			
			tippoint.id = 'unitipP';
			
			tippoint.style.overflow = "hidden";
			tippoint.style.height = PointHeight + "px";
			tippoint.style.width = elewidth + "px";
			tippoint.style.position = "relative";
			tippoint.style.display = "block";
			
			tippoint.innerHTML = '<div id="unitippoint">' + tipP + '</div>';
			
			tippointin = document.getElementById("unitippoint");
			tippointin.style.width = (elewidth * 2) + "px";
			tippointin.style.height = (PointHeight * 2) + "px";
			tippointin.style.backgroundImage = tippoint.style.backgroundImage;
			tippointin.style.position = "absolute";
			
			tippoint.style.backgroundImage = "none";
		}
		if (tipcap.currentStyle.backgroundImage.match(/\.png/gi)) {
			var tipC = tipcap.innerHTML;
			
			tipcap.id = 'unitipC';
			
			tipcap.style.overflow = "hidden";
			tipcap.style.height = CapHeight + "px";
			tipcap.style.width = elewidth + "px";
			tipcap.style.position = "relative";
			tipcap.style.display = "block";
			
			tipcap.innerHTML = '<div id="unitipcap">' + tipP + '</div>';
			
			tipcapin = document.getElementById("unitipcap");
			tipcapin.style.height = (CapHeight * 2) + "px";
			tipcapin.style.backgroundImage = tipcap.style.backgroundImage;
			tipcapin.style.position = "absolute";
			
			tipcap.style.backgroundImage = "none";
		}
		
		pngfix();
		
	}
	
	document.onmousemove = function (evt) {move (evt)};
}
move = function (evt) {
	
	if (window.event) {
		x = window.event.clientX;
		y = window.event.clientY;
		
		if (document.documentElement.scrollLeft) tipid.style.left = (TipWidth >= WinWidth ) ? ((x - offsetX - elewidth) + document.documentElement.scrollLeft) + "px" :  (x + offsetX + document.documentElement.scrollLeft) + "px";
		else tipid.style.left = (TipWidth >= WinWidth ) ? ((x - offsetX - elewidth) + document.body.scrollLeft) + "px" :  (x + offsetX + document.body.scrollLeft) + "px";
		
		if (document.documentElement.scrollTop) tipid.style.top = (TipHeight >= WinHeight) ? ((y - offsetY - eleheight) + document.documentElement.scrollTop) + "px" : (y + offsetY + document.documentElement.scrollTop) + "px";
		else tipid.style.top = (TipHeight >= WinHeight) ? ((y - offsetY - eleheight) + document.body.scrollTop) + "px" : (y + offsetY + document.body.scrollTop) + "px";
		
	} else {
		x = evt.clientX;
		y = evt.clientY;	
		
		tipid.style.left = (TipWidth >= WinWidth ) ? ((x - offsetX - elewidth) + window.scrollX) + "px" :  (x + offsetX + window.scrollX) + "px";
		tipid.style.top = (TipHeight >= WinHeight) ? ((y - offsetY - eleheight) + window.scrollY) + "px" : (y + offsetY + window.scrollY) + "px";
	}
	
	TipWidth = x + elewidth + 20;
	TipHeight = y + eleheight + 20;
	
	if (TipHeight >= WinHeight ) {
		tipid.removeChild(tippoint);
		tipid.removeChild(tipmid);
		tipid.removeChild(tipcap);
		tipid.appendChild(tipcap);
		tipid.appendChild(tipmid);
		tipid.appendChild(tippoint);
	} else {
		tipid.removeChild(tippoint);
		tipid.removeChild(tipmid);
		tipid.removeChild(tipcap);
		tipid.appendChild(tippoint);
		tipid.appendChild(tipmid);
		tipid.appendChild(tipcap);
	}
	
	if (TipHeight >= WinHeight) {
		
		if (document.getElementById('uniTipP')) {
			tippointin.style.left = (TipWidth >= WinWidth ) ? "-" + elewidth + "px" : "0px";
			tippointin.style.top = "-" + PointHeight + "px";
		} else tippoint.style.backgroundPosition = (TipWidth >= WinWidth ) ? "right bottom" : "left bottom";
		
		if (document.getElementById('uniTipC')) tipcapin.style.top = "-" + CapHeight + "px";
		else tipcap.style.backgroundPosition = "0 -" + CapHeight + "px";
		
	} else {
		
		if (document.getElementById('uniTipP')) {
			tippointin.style.left = (TipWidth >= WinWidth ) ? "-" + elewidth + "px" : "0px";
			tippointin.style.top = "0px";
		} else tippoint.style.backgroundPosition = (TipWidth >= WinWidth ) ? "right top" : "left top";
		
		if (document.getElementById('uniTipC')) tipcapin.style.top = "0px";
		else tipcap.style.backgroundPosition = "0 0";
		
	}
}
hide = function (a, sTitle) {
	document.getElementById("unitipmid").innerHTML = "";
	document.onmousemove = '';
	document.body.removeChild(tipid);
	tipid.style.display = "none";
	if (altText==false) a.setAttribute("title", sTitle);
	else a.setAttribute("alt", sTitle);
	altText=false;
}
if (window.addEventListener) window.addEventListener("load", init, false);
if (window.attachEvent) window.attachEvent("onload", init);
function AAZWall1600x1200(url) {
    popupWindow = window.open(
        url,'popUpWindow','height=1200,width=1600,left=0,top=0,resizable=no,scrollbars=no,toolbar=no,menubar=no,location=no,directories=no,status=yes')
}
function AAZWall1024x768(url) {
    popupWindow = window.open(
        url,'popUpWindow','height=768,width=1024,left=0,top=0,resizable=no,scrollbars=no,toolbar=no,menubar=no,location=no,directories=no,status=yes')
}
function AAZWall800x600(url) {
    popupWindow = window.open(
        url,'popUpWindow','height=600,width=800,left=6,top=6,resizable=no,scrollbars=no,toolbar=no,menubar=no,location=no,directories=no,status=yes')
}
function AAZWall640x480(url) {
    popupWindow = window.open(
        url,'popUpWindow','height=480,width=640,left=12,top=12,resizable=no,scrollbars=no,toolbar=no,menubar=no,location=no,directories=no,status=yes')
}
function AAZWall320x240(url) {
    popupWindow = window.open(
        url,'popUpWindow','height=240,width=320,left=32,top=32,resizable=no,scrollbars=no,toolbar=no,menubar=no,location=no,directories=no,status=yes')
}
//	End of Tooltip JQueery
////////////////////////////////////////////////////////////////////////