const coreLangKeywords = {"arguments":"மூலம்","await":"காத்திரு","break":"உடை","case":"வாதம்","catch":"பிடி","class":"வார்ப்பு","const":"திகழி","continue":"தொடர்க","debugger":"பிழைகாணி","default":"கூறாநிலை","delete":"அழி","do":"செய்","else":"அல்லது","enum":"அஞ்சறைப்பெட்டி","eval":"வரையறு","export":"ஏற்று","extends":"நீட்சி","false":"பொய்","finally":"எதுவானாலும்","for":"கண்ணி","function":"வினை","if":"நிலை","implements":"செயற்பாடு","import":"இறக்கு","in":"உடைய","instanceof":"உரு","interface":"இடைமுகம்","let":"அனுமதி","new":"புதிய","null":"பொட்டல்","package":"தொகுப்பு","private":"தனி","protected":"அரண்","public":"பொது","return":"விளைவு","static":"மாறா","super":"தாய்","switch":"மன்றம்","this":"என்","throw":"விடு","true":"மெய்","try":"முயல்","typeof":"சிமிழிவகை","var":"சிமிழி","void":"வெற்று","while":"காளை","with":"உடன்","yield":"ஈட்டு"};

const browserObjects = {"console.log": "நிகழ்ச்சி", "alert": "எச்சரிக்க"};

const englishToதமிழ்Keys = coreLangKeywords;

const தமிழ்ToEnglishKeys = Object.entries(Object.assign({}, coreLangKeywords, browserObjects)).reduce((i, [k,v]) => Object.assign(i,{[v]: k}), {});

async function loadFile(src) {

    let resp = null;
    
    try {
        
        resp = await fetch(src);

    } catch(e) {

        console.log("Error on loading file: ", e);

        return false;
        
    }

    let body = null;

    if(resp) body = await resp.text();

    return body;

};

const replaceKeywords = (st, obj) => {
    
    let keywords = Object.keys(obj);

    let replacer = new RegExp(keywords.join("|"),"gi")

    return st.replace(replacer, matched => obj[matched]);
}

const englishToதமிழ் = source => replaceKeywords(source, englishToதமிழ்Keys);

const தமிழ்ToEnglish = source => replaceKeywords(source, தமிழ்ToEnglishKeys);

const run = code => {

    try {

	eval(code);

    } catch(e) {

	console.log("Error: ", e);

    }

};

const compile = sourceCode => run(தமிழ்ToEnglish(sourceCode));

async function compileScripts() {
    
    let scripts = document.querySelectorAll("script");

    for(let script of scripts) {

        if(script.type == "text/mozhi") {

	    if(script.src) {

	        let contents = await loadFile(script.src);

                compile(contents);

	    } else {

	        compile(script.textContent);

	    }
        }
    } 
};

/* For browsers */
if(typeof window != "undefined") window.addEventListener('DOMContentLoaded', compileScripts);

/* For node */
if(typeof module != "undefined" && module.exports) module.exports = {englishToதமிழ், தமிழ்ToEnglish, run, compile};
