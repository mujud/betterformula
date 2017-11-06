declare var fieldTreeController
export class Completions {
	private static buildFields(){
        var fieldsMap = {}
    	var childrenMap = {}
        fieldTreeController.tree.rootList[0].children.forEach( el => {
        	var rootElement = fieldTreeController.tree.rootList[0].key
        	var isValid = true
        	var type = el.attributes.type
        	var val = el.key
        	if(el.isLeaf && type == "Lookup")
        		type = "ID"
        	else if(type == "Lookup"){
        		val+= "."
        		if(el.hasOwnProperty("children"))
	        		this.buildChildren(el,childrenMap,rootElement)
	        	else
	        		isValid = false
        	}
        	if(isValid)
        		fieldsMap[el.key] = [val,type,el.labelName]
        })
        for(var i = 1 ; i <  fieldTreeController.tree.rootList.length ; i++){
        	var val = fieldTreeController.tree.rootList[i].key;
        	fieldsMap[val] = [val.replace("$","\\$")+".","Group MetaData",null]
        	childrenMap[val] = {}
        	fieldTreeController.tree.rootList[i].children.forEach( childEl => {
				childrenMap[val][childEl.key] = [childEl.key,"MetaData",childEl.labelName]
        	})
        }
        return [fieldsMap,childrenMap];
    }
    private static buildChildren(el,childrenMap,rootElement){
    	childrenMap[el.key] = {}
    	el.children.forEach( childEl => {
    		var isValid = true
    		var type = childEl.attributes.type
        	var val = childEl.key
        	if(childEl.isLeaf && type == "Lookup")
        		type = "ID"
        	else if(type == "Lookup"){
        		val+= "."
        		if(childEl.hasOwnProperty("children"))
	        		this.buildChildren(el,childrenMap,rootElement)
	        	else
	        		isValid = false
        	}
        	if(isValid)
	        	childrenMap[el.key][childEl.key] = [val,type,childEl.labelName]
    	})
    }
	public static factory(require){
		function is(token, type) {
		    return token.type.lastIndexOf(type) > -1;
		}
		var BetterformulaCompletions = function() {};
		(function() {

		    this.getCompletions = function(state, session, pos, prefix) {
		        var token = session.getTokenAt(pos.row, pos.column);
		        var line = session.getLine(pos.row).substr(0, pos.column);
		        var objectRelation = line.match(/[\$\w\d]+(?=\.[\w\d]*$)/)
		        console.log(objectRelation)
		        if(objectRelation != null){
			        return this.getObjectFieldCompletions(line,objectRelation[0]);
		        }else
			        return this.getFunctionCompletions(state, session, pos, prefix);

		    };
			this.getObjectFieldCompletions = function(line,objectRelation) {
				var fieldsMap = Object.keys(fieldChildrenMap[objectRelation]);
		        console.log(fieldsMap)

		        return fieldsMap.map(function(fld){
		            return {
		                caption: fld,
		                snippet: fieldChildrenMap[objectRelation][fld][0],
		                meta: fieldChildrenMap[objectRelation][fld][1],
		                score: Number.MAX_VALUE,
		                docHTML: fieldChildrenMap[objectRelation][fld][2]
		            };
		        });
			}
		    this.getFunctionCompletions = function(state, session, pos, prefix) {
		        var line = session.getLine(pos.row).substr(0, pos.column);
		        console.log(line)
		        var functions = Object.keys(functionMap);
		        return functions.map(function(func){
		            return {
		                caption: func,
		                snippet: functionMap[func][0],
		                meta: functionMap[func][1],
		                score: Number.MAX_VALUE,
		                docHTML: functionMap[func][2]
		            };
		        });
		    };

		}).call(BetterformulaCompletions.prototype);
		var fieldChildrenMap = {}
		var functionMap = {
			"BEGINS": [
			    "BEGINS(${1:text},${2:compare_text})",
			    "Boolean function",
			    "Determines if text begins with specific characters and returns TRUE if it does. Returns FALSE if it does not."
			],
			"BLANKVALUE": [
			    "BLANKVALUE(${1:expression},${2:substitute_expression})",
			    "Boolean function",
			    "Determines if an expression has a value and returns a substitute expression if it does not. If the expression has a value, returns the value of the expression."
			],
			"BR": [
			    "BR()",
			    "Format function",
			    "Inserts a line break in a string of text."
			],
			"CASE": [
			    "CASE(${1:expression},${2:value1},${3:result1})",
			    "Conditional function",
			    "Checks a given expression against a series of values. If the expression is equal to a value, returns the corresponding result. If it is not equal to any values, it returns the else_result."
			],
			"CASESAFEID": [
			    "CASESAFEID(${1:objectId})",
			    "Boolean function",
			    "Converts a 15-character ID to a case-insensitive 18-character ID."
			],
			"CEILING": [
			    "CEILING(${0:number})",
			    "Number function",
			    "Rounds a number up to the nearest integer."
			],
			"CONTAINS": [
			    "CONTAINS(${1:field},${2:string})",
			    "Number function",
			    "Compares two arguments of text and returns TRUE if the first argument contains the second argument. If not, returns FALSE."
			],
			"DATE": [
			    "DATE(${1:year},${2:month},${3:day})",
			    "Date function",
			    "Returns a date value from year, month, and day values you enter. "
			],
			"DATEVALUE": [
			    "DATEVALUE(${0:expression})",
			    "Date function",
			    "Returns a date value for a date/time or text expression."
			],
			"DATETIMEVALUE": [
			    "DATETIMEVALUE(${1:expression})",
			    "Date function",
			    "Returns a year, month, day and GMT time value. "
			],
			"DAY": [
			    "DAY(${1:date})",
			    "Date function",
			    "Returns a day of the month in the form of a number between 1 and 31."
			],
			"DISTANCE": [
			    "DISTANCE(${1:mylocation1},${2:mylocation2},${3:unit})",
			    "Geo function",
			    "Calculates the distance between two locations in miles or kilometers."
			],
			"EXP": [
			    "EXP(${1:number})",
			    "Calculate function",
			    "Returns a value for e raised to the power of a number you specify."
			],
			"FIND": [
			    "FIND(${1:search_text},${2:field_name})",
			    "Text function",
			    "Returns the position of a string within a string of text represented as a number."
			],
			"FLOOR": [
			    "FLOOR(${1:number})",
			    "Calculate function",
			    "Returns a number rounded down to the nearest integer."
			],
			"GEOLOCATION": [
			    "GEOLOCATION(${1:latitude},${2:longitude})",
			    "Geo function",
			    "Returns a geolocation based on the provided latitude and longitude. Must be used with the DISTANCE function."
			],
			"GETRECORDIDS": [
			    "GETRECORDIDS(${1:object_type})",
			    "Geo function",
			    "Returns an array of strings in the form of record IDs for the selected records in a list, such as a list view or related list."
			],
			"GETSESSIONID": [
			    "GETSESSIONID()",
			    "Data function",
			    "Returns the user’s session ID."
			],
			"HTMLENCODE": [
			    "HTMLENCODE(${1:text})",
			    "Format function",
			    "Encodes text and merge field values for use in HTML by replacing characters that are reserved in HTML, such as the greater-than sign (>), with HTML entity equivalents, such as &gt;."
			],
			"HYPERLINK": [
			    "HYPERLINK(${1:url},${2:friendly_name},${3:target})",
			    "Format function",
			    "Creates a link to a URL specified that is linkable from the text specified."
			],
			"IF": [
			    "IF(${1:logical_test},${2:value_if_true},${3:value_if_false})",
			    "Conditional function",
			    "Determines if expressions are true or false. Returns a given value if true and another value if false."
			],
			"IMAGE": [
			    "IMAGE(${1:image_url},${2:alternate_text},${3:height},${4:width})",
			    "Display function",
			    "Inserts an image with alternate text and height/width specifications."
			],
			"INCLUDE": [
			    "INCLUDE(${1:source},${2:inputs})",
			    "Data function",
			    "Returns content from an s-control snippet. Use this function to reuse common code in many s-controls."
			],
			"INCLUDES": [
			    "INCLUDES(${1:multiselect_picklist_field},${2:text_literal})",
			    "Boolean function",
			    "Determines if any value selected in a multi-select picklist field equals a text literal you specify."
			],
			"ISBLANK": [
			    "ISBLANK(${1:expression})",
			    "Boolean function",
			    "Determines if an expression has a value and returns TRUE if it does not. If it contains a value, this function returns FALSE."
			],
			"ISCLONE": [
			    "ISCLONE(})",
			    "Boolean function",
			    "Checks if the record is a clone of another record and returns TRUE if one item is a clone. Otherwise, returns FALSE."
			],
			"ISNEW": [
			    "ISNEW()",
			    "Boolean function",
			    "Checks if the formula is running during the creation of a new record and returns TRUE if it is. If an existing record is being updated, this function returns FALSE."
			],
			"ISNULL": [
			    "ISNULL(${1:field_name})",
			    "Boolean function",
			    "Determines if an expression is null (blank) and returns TRUE if it is. If it contains a value, this function returns FALSE."
			],
			"ISNUMBER": [
			    "ISNUMBER(${1:field_name})",
			    "Boolean function",
			    "Determines if a text value is a number and returns TRUE if it is. Otherwise, it returns FALSE."
			],
			"JSENCODE": [
			    "JSENCODE(${1:text})",
			    "Format function",
			    "Encodes text and merge field values for use in JavaScript by inserting escape characters, such as a backslash (\\), before unsafe JavaScript characters, such as the apostrophe (')."
			],
			"JSINHTMLENCODE": [
			    "JSINHTMLENCODE(${1:text})",
			    "Text function",
			    "Encodes text and merge field values for use in JavaScript inside HTML tags by replacing characters that are reserved in HTML with HTML entity equivalents and inserting escape characters before unsafe JavaScript characters."
			],
			"JUNCTIONIDLIST": [
			    "JUNCTIONIDLIST(${1:id},${2:id2},${3:id3},...)",
			    "Data function",
			    "A JunctionIDList is a string array of referenced ID values that represent the many-to-many relationship of an underlying junction entity."
			],
			"SUBSTITUTE": [
			    "SUBSTITUTE(${1:text},${2:old_text},${3:new_text})",
			    "Text function",
			    "Substitutes new text for old text in a text string."
			],
			"LEFT": [
			    "LEFT(${1:text},${2:num_chars})",
			    "Text function",
			    "Returns the specified number of characters from the beginning of a text string."
			],
			"LEN": [
			    "LEN(${1:text})",
			    "Text function",
			    "Returns the number of characters in a specified text string."
			],
			"LINKTO": [
			    "LINKTO(${1:label},${2:target},${3:id})",
			    "Format function",
			    "Returns a relative URL in the form of a link (href and anchor tags) for a custom s-control or Salesforce page."
			],
			"LOWER": [
			    "LOWER(${1:text})",
			    "Text function",
			    "Converts all letters in the specified text string to lowercase. Any characters that are not letters are unaffected by this function. Locale rules are applied if a locale is provided."
			],
			"MAX": [
			    "SUBSTITUTE(${1:number},${2:number},${3:number},....)",
			    "Number function",
			    "Returns the highest number from a list of numbers."
			],
			"MID": [
			    "MID(${1:text},${2:start_num},${3:num_chars})",
			    "Text function",
			    "Returns the specified number of characters from the middle of a text string given the starting position."
			],
			"Min": [
			    "Min(${1:number},${2:number},${3:number},....)",
			    "Number function",
			    "Returns the lowest number from a list of numbers."
			],
			"MONTH": [
			    "MONTH(${1:date})",
			    "Date function",
			    "Returns the month, a number between 1 (January) and 12 (December) in number format of a given date."
			],
			"NOW": [
			    "NOW()",
			    "Date function",
			    "Returns a date/time representing the current moment."
			],
			"NULLVALUE": [
			    "NULLVALUE(${1:expression},${2:substitute_expression})",
			    "Text function",
			    "Substitutes new text for old text in a text string."
			],
			"PRIORVALUE": [
			    "PRIORVALUE(${1:field})",
			    "Data function",
			    "Returns the previous value of a field"
			],
			"REGEX": [
			    "REGEX(${1:text},${2:regex_text},${3:new_text})",
			    "Text function",
			    "	Compares a text field to a regular expression and returns TRUE if there is a match. Otherwise, it returns FALSE. A regular expression is a string used to describe a format of a string according to certain syntax rules."
			]
		};
		var results = this.buildFields()
		console.log("Children Map")
		console.log(results[1])
		Object.assign(functionMap,results[0])
		fieldChildrenMap = results[1]
		return BetterformulaCompletions;
	}
}