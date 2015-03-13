//数字显示动画
function showNumberWithAnimation(randx,randy,randNumber){
	//先获取到对应的Number-cell
	var numberCell=$("#number-cell-"+randx+"-"+randy);
	//当生成数字时number-cell的外观就有一定改善
	numberCell.css("background-color",getNumberBackgroundColor(randNumber))
	numberCell.css("color",getNumberColor(randNumber))
	 numberCell.text( getNumberText( randNumber ) );
	//动画效果
	numberCell.animate({
		width: cellSideLength,
		height: cellSideLength,
		top:getPosTop(randx,randy),
		left:getPosLeft(randx,randy)
		},50);
}
//移动动画
function showMoveAnimation(fromx,fromy,tox,toy){

	//首先拿到from位置的number-cell
	var numberCell=$("#number-cell-"+fromx+"-"+fromy);
	//然后用动画把他移动到 to 位置
	numberCell.animate({
		top:getPosTop(tox,toy),
		left:getPosLeft(tox,toy)
	},200);
	
}
//显示更新分数
function updateScore(score){
	$("#score").text(score)
}