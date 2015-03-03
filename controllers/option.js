var args = arguments[0] || {};

var optionsLabel	=	args.captionLabel;
var rowType			=	args.rowType;
var optionNumber	=	args.optionNumber;
var showBorder		=	args.showBorder || false;
var rowStyle 		= 	null;
var labelStyle 		= 	null;

if (rowType == "cancel") {
	rowStyle = $.createStyle ({classes: ['cancelRowView']});
	labelStyle = $.createStyle ({classes: ['cancelLabel']});
}
else if (rowType == "option") {
	rowStyle = $.createStyle ({classes: ["optionRowView"]});
	labelStyle = $.createStyle ({classes: ['optionLabel']});
}else if(rowType == "selected"){
	rowStyle = $.createStyle ({classes: ["selectedRowView"]});
	labelStyle = $.createStyle ({classes: ['selectedLabel']});
}

showBorder && $.borderContainer.setVisible(true);

$.optionView.applyProperties(rowStyle);
$.optionRowLabel.applyProperties(labelStyle);
$.optionRowLabel.text = optionsLabel;


$.optionView.optionNumber	= optionNumber;