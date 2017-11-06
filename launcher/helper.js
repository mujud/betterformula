function loadScripts(base,urls) {
  var url = base;
  var endpoint = urls.pop();
  url += endpoint;
  var script = makeScript(url,function(){
    if(urls.length > 0)
      loadScripts(base,urls);
  });
  document.body.appendChild(script);
}
function makeScript(url,completeCallback){
  var script = document.createElement('script');
  var done = false;
  script.src = url;
  script.onload = script.onreadystatechange = function(){
     if ( !done && (!this.readyState ||
          this.readyState == "loaded" || this.readyState == "complete") ) {
       done = true;
       completeCallback();
    }
  };
  return script;
}
function loadStyles(base,urls){
  var url = base;
  var endpoint = urls.pop();
  url += endpoint;
  var script = makeStyle(url,function(){
    if(urls.length > 0)
      loadStyles(base,urls);
  });
  document.head.appendChild(script);
}
function makeStyle(url,completeCallback){
  var script = document.createElement('style');
  var done = false;
  script.src = url;
  script.onload = script.onreadystatechange = function(){
     if ( !done && (!this.readyState ||
          this.readyState == "loaded" || this.readyState == "complete") ) {
       done = true;
       completeCallback();
    }
  };
  return script;
}
function injectTab(parentClass,text,className){
  if(
    document.getElementsByClassName(parentClass).length ==  0
    || document.getElementsByClassName("miniTabList")[0].children[1].children[0].text != "Advanced Formula"
    )
    return false;
  var liEl = document.createElement('li');
  var aEl = document.createElement('a');
  aEl.className = className;
  aEl.href="#";
  var text = document.createTextNode(text);
  aEl.appendChild(text);
  liEl.appendChild(aEl);
  document.getElementsByClassName(parentClass)[0].append(liEl);
  return true;
}
function injectApp(){
  document.getElementById("CalculatedFormula").parentElement.insertBefore(document.createElement('app-root'),document.getElementById("CalculatedFormula"));
}