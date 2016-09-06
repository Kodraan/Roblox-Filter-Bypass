
//Just a heads-up this is my first time doing this. It's messy and gross, I could've done this much better

var lowChars = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]; //these are the normal characters
var capChars = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

var altLow = ["𝐚","ᖯ","ϲ","ԁ","е","𝖿","ɡ","һ","і","ϳ","𝗄","׀","m","ո","ο","р","ԛ","𝗋","ѕ","𝗍","ս","∨","ԝ","х","y","z"]; //these are the special characters
var altCap = ["А","Β","Ϲ","Ꭰ","Ε","ᖴ","Ԍ","Η","Ɩ","Ϳ","Κ","Ꮮ","Μ","Ν","Ο","Ρ","ⵕ","ꓣ","Ѕ","Τ","Ս","Ꮩ","Ԝ","Χ","Υ","Ζ"];

try{
	var post = document.getElementById("ctl00_cphRoblox_Createeditpost1_PostForm_PostButton");
	var body = document.getElementById("ctl00_cphRoblox_Createeditpost1_PostForm_PostBody");
	makeButton();
}
catch(err) {
	console.log(err.message);
}

function makeButton() {
	var msg = document.getElementById("ctl00_cphRoblox_Createeditpost1_PostForm_PostBody").value;
	if (msg.search("SKIPFILTERKODRAN") != -1) { //super hacky way to do this :s
		msg = msg.substring(16,msg.length);
		body.value = msg;
		post.click();
	}
	
	var allSpans = document.getElementsByTagName('span');
	function lookFor(span){
		if (span.getAttribute("style")=="float:right"){
			var x = document.createElement("button"); //create button 
			x.value=" Post without filter (BETA) ";
			x.innerHTML = " Post without filter (BETA) ";
			span.appendChild(x);
			x.addEventListener("click", postMessage);
		}
	}
	for (var i = 0, len = allSpans.length; i < len; i++) {
		lookFor(allSpans[i]);
	}
}

function isUpper(c) { //Is character c uppercase?
	if (c == c.toUpperCase()) {
		return true;
	} else {
		return false;
	}
}

function findPos(c,u) { //find position of character c in table
	if (u == true) {
		for (var i = 0, len = capChars.length; i < len; i++) {
			if (capChars[i] == c) {
				return i;
			}
		}
	} else {
		for (var i = 0, len = lowChars.length; i < len; i++) {
			if (lowChars[i] == c) {
				return i;
			}
		}
	}
	return false;
}
function convertString(s) { //convert string to weird characters
	var nS = "";
	for (var i = 0, len = s.length; i < len; i++) {
		var str = s.substring(i,i+1);
		if (isUpper(str)) {
			var pos = findPos(str, true) 
			if (pos != false) {
				nS = nS + altCap[pos];
			} else {
				nS = nS + str
			}
		} else {
			var pos = findPos(str, false) 
			if (pos != false) {
				nS = nS + altLow[pos];
			} else {
				nS = nS + str
			}
		}
	}
	return nS;
}

function postMessage() {
	var msg = body.value;
	msg = convertString(msg);
	body.value = "SKIPFILTERKODRAN"+msg;
}
