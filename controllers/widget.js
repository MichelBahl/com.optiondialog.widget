var args = arguments[0] || {};

var optionsVisible	=	false;
var windowVisible	=	false;
var options			= 	args.options;
var cancel			= 	args.cancel;
var optionTitle		= 	args.title;
var showBorder		=	args.showBorder || false;
var rowIndex		=	0;
var selectedOption	=	null;
var isOptionCreated	=	false;
var settings		=	args.settings || {};

settings.duration			=	settings.animationDuration || 500;
settings.backgoundColorFrom	=	settings.backgoundColorFrom || "#4C000000";
settings.backgoundColorTo	=	settings.backgoundColorTo || "#00000000";
settings.delayClickEvent	=	settings.delayClickEvent || false;

/*	Worker
 * 
 */
function createOptions(){
	
	if(optionTitle){
		$.optionTitleLabel.text	=	optionTitle;
	}
	
	for(rowIndex in options){
		
		var optionView  = Widget.createController('option',{	optionNumber: rowIndex,
																selected: false,
																showBorder: showBorder,
																captionLabel: options[rowIndex],
																rowType: selectedOption ==  options[rowIndex] ? "selected":"option"}).getView();
	
	
		$.optionRowsWrapper.add(optionView);
	}
	
	if(cancel){
		
		var optionCancelView  = Widget.createController('option',{	optionNumber: Number( rowIndex ) + 1,
																	selected: false,
																	captionLabel: cancel,
																	showBorder: false,
																	rowType: "cancel"}).getView();
	
	
		$.optionRowsWrapper.add(optionCancelView);
	}
}

function toggleOptions(args){
	
	args	=	args || {};
	var completeAnimation	=	args.onCompleteAnimation || function(){};
	var animation 			= 	Titanium.UI.createAnimation();
	
	var animationHandler = function() {
	  animation.removeEventListener('complete',animationHandler);

	  completeAnimation();
	  optionsVisible = !optionsVisible;	
	};

	animation.addEventListener('complete',animationHandler);	
	
	if(!optionsVisible){
		animation.bottom = 0;
	}else{
		animation.bottom = -$.optionWrapper.rect.height;
	}
	
	animation.duration = settings.duration;
	$.optionWrapper.animate(animation);	
}

function toggleWindow(args){
	
	args	=	args || {};
	var completeAnimation	=	args.onCompleteAnimation || function(){};
	var animation 			= 	Titanium.UI.createAnimation();
	
	var animationHandler = function() {
	  animation.removeEventListener('complete',animationHandler);

	  completeAnimation();
	  windowVisible = !windowVisible;	
	};

	animation.addEventListener('complete',animationHandler);	
	
	if(!windowVisible){
		animation.backgroundColor	=	settings.backgoundColorFrom;
	}else{
		animation.backgroundColor	=	settings.backgoundColorTo;
	}
	
	animation.duration = settings.duration;
	$.optionWindow.animate(animation);	
}
//--------------------------------------------------------------------------

/* Exported functions
 * 
 */
function setOptions(opts) {
	options = opts;
	createOptions();
}
function show(){
	
	for (var d = $.optionRowsWrapper.children.length-1; d >= 0; d--) {
	    $.optionRowsWrapper.remove($.optionRowsWrapper.children[d]);
	}	
	
	!isOptionCreated && createOptions();

	
	if(OS_IOS ){
		$.optionWindow.open();
		$.optionWrapper.bottom = - $.optionWrapper.rect.height;
	}else if (OS_ANDROID){
		$.optionWrapper.bottom = - $.optionWrapper.rect.height;
		$.optionWindow.setVisible(true);
	}
	

	toggleOptions();
	toggleWindow();
}

function setSelectedOption(option){
	
	selectedOption	=	option;
};
//--------------------------------------------------------------------------

function triggerClickEvent (e) {

	$.trigger('click', {
		
		index: e.source.optionNumber,
		source: e.source
	});  
}
/*	UI Eventlistener
 * 
 */
function doClickOptionDialog (e) {
	
	e.source.options = options;
	 
	toggleWindow();
	toggleOptions({
		onCompleteAnimation: function(){
			if(OS_IOS ){
				$.optionWindow.close();
			}else if (OS_ANDROID){
				$.optionWindow.setVisible(false);
			}
			
			settings.delayClickEvent && triggerClickEvent(e);
		}
	});	

	!settings.delayClickEvent && triggerClickEvent(e);	
}
//--------------------------------------------------------------------------

exports.setOptions = setOptions;
exports.setSelectedOption = setSelectedOption;
exports.show = show;
exports.options = options;