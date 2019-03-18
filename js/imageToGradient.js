/* global require, createjs, ss, sftl */
(function () {
    "use strict";

    var _canvas, _img;

    var _barcodeWidth = 400;
    var _barcodeHeight = 50;
    //console.log(barcodes.imageList);

    for(var b=0; b<barcodes.imageList.length; b++){
    	setTimeout(_loadImage.bind(null, b),b*100);
    }


    function _loadImage(index){
    	_img = new Image();
		_img.addEventListener('load', _convertWholeImage, false);
    	//_img.addEventListener('load', _convertRandomTenth, false);
    	_img.src = 'images/'+barcodes.imageList[index]+'.png';
    	_img.num = index;
    }

    function _convertRandomTenth(){
    	_canvas = document.getElementById("theCanvas");
    	var ctx = _canvas.getContext('2d');
    	ctx.drawImage(_img,0,0);

    	var imageData = ctx.createImageData(_barcodeWidth, _barcodeHeight);

    	var gradientString = 'title="'+barcodes.imageList[_img.num]+'" smooth=yes ';

    	var startIndex = Math.floor(Math.random()*(_barcodeWidth*0.9));

    	for(var i=startIndex; i<startIndex + _barcodeWidth/10; i++){
    		var pixel = ctx.getImageData(i, _barcodeHeight, 1, 1);
			var data = pixel.data;
  			var rgbstring = 'rgb(' + data[0] + ', ' + data[1] + ', ' + data[2]+')';
    		var rgbObj = {r:data[0], g:data[1], b:data[2]};
    		var bgr = barcodes.Colors.rgbToBgrInt(rgbObj);
    		gradientString += ("index="+i*10+" color="+bgr+" ");
    	}

    	console.log(gradientString+"\n\n");
    }

    function _convertWholeImage(){
	   	_canvas = document.getElementById("theCanvas");
    	var ctx = _canvas.getContext('2d');
    	ctx.drawImage(_img,0,0);

    	var imageData = ctx.createImageData(_barcodeWidth, _barcodeHeight);

    	var gradientString = 'title="'+barcodes.imageList[_img.num]+'" smooth=yes ';

    	for(var i=0; i<_barcodeWidth; i++){
    		var pixel = ctx.getImageData(i, _barcodeHeight, 1, 1);
			var data = pixel.data;
  			var rgbstring = 'rgb(' + data[0] + ', ' + data[1] + ', ' + data[2]+')';
    		var rgbObj = {r:data[0], g:data[1], b:data[2]};
    		var bgr = barcodes.Colors.rgbToBgrInt(rgbObj);
    		gradientString += ("index="+i+" color="+bgr+" ");
    	}

    	console.log(gradientString+"\n\n");
    }
}());