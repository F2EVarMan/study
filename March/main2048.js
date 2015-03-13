var board=new Array(); //4*4的格子
var score=0;	//游戏分数
var hasConflicted=new Array(); //判断每个小格子只能叠加一次

var startX=0,
      startY=0,
      endX=0,
      endY=0;	
$(function(){
	//移动端准备工作
	prepareForMobile();
	/*开始游戏*/
	newGame();
})
function prepareForMobile(){
	//设置主体 的 宽高 边距
	//如果页面宽度大于500就设置绝对位置
	if(documentWidth>500){
		gridContainerWidth=500;
		cellSpace=20;
		cellSideLength=100;
	}
	$("#gridContainer").css('width',gridContainerWidth - 2*cellSpace)
	$("#gridContainer").css('height',gridContainerWidth - 2*cellSpace)
	$("#gridContainer").css('padding',cellSpace)
	$("#gridContainer").css('border-radius',0.02*gridContainerWidth)

	$(".grid-cell").css('width',cellSideLength)
	$(".grid-cell").css('height',cellSideLength)
	$(".grid-cell").css('border-radius',0.02*cellSideLength)
}
function newGame(){
   /*
   初始化棋盘格

    */
   init();
   //随机两个格子里面生成数字
   generateOneNumber();
   generateOneNumber();
}
function init(){
	/*对16格子的位置进行赋值*/
	for (var i = 0;i <4; i++) {
		for(var j=0;j<4;j++){

			/*首先根据i和j取得小格子*/
			var gridCell=$("#grid-cell-" + i + "-" + j);
			/*根据i和j计算小格子的坐标值*/
			gridCell.css('top',getPosTop(i,j));
			gridCell.css('left',getPosLeft(i,j));
			
		}
	};

	/*把board变为二维数组初始化的时候值都为0*/
	for(var i=0;i<4;i++){
		board[i]=new Array();
		hasConflicted[i]=new Array();
		for(var j=0;j<4;j++){
			board[i][j]=0;
			hasConflicted[i][j]=false;  //初始的时候每个格子都没有进行过碰撞
		}
	}
	/*对前端number-cell元素进行操作*/
	updateBoardView();
	//初始化分数
	score=0;
}

function updateBoardView(){
	//如果当前游戏里已经有了Number-cell 首先全部删除
	$(".number-cell").remove();
	//根据当前的board值来添加新的Number-cell元素
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			//对每一个board元素都生成一个number-cell
			$("#gridContainer").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			var theNumberCell=$("#number-cell-"+i+"-"+j);
			
			//board为0的时候不显示
			if(board[i][j] == 0){
				theNumberCell.css("width","0");
				theNumberCell.css("height","0");
				theNumberCell.css('top',getPosTop(i,j)+cellSideLength/2);
				theNumberCell.css('left',getPosLeft(i,j)+cellSideLength/2);
				theNumberCell.css('font-size',"20px" );

			}else{
				//不为0的时候大小位置和grid-cell一样 颜色根据board里面的值来设定,数字就是board里面的值
				theNumberCell.css("width",cellSideLength);
				theNumberCell.css("height",cellSideLength);
				theNumberCell.css('top',getPosTop(i,j));
				theNumberCell.css('left',getPosLeft(i,j));
				theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
				theNumberCell.css('color',getNumberColor(board[i][j]));
				theNumberCell.text(getNumberText(board[i][j]));
				theNumberCell.css('font-size',"20px" );
				//theNumberCell.text(board[i][j])


			}
			hasConflicted[i][j]=false;  //新一轮开始每个格子的可叠加状态 重置
		}
		$('.number-cell').css('line-height',cellSideLength+'px') //因为移动端格子大小不一样需要设置行高
		$('.number-cell').css('font-size',0.2*cellSideLength+'px')
	}
}
//随机在一个空白的地方生成数字
function generateOneNumber(){
	//判断还有没有空白的地方
	if( nospace(board) ){
		return false;
	}
	//随机一个位置 
	//0 到3的数字
	var randx=parseInt(Math.floor(Math.random() * 4)) ;
	var randy=parseInt(Math.floor(Math.random() * 4)) ;
	var times=0;
	while (times <50){
		if(board[randx][randy] == 0){
			break;
		}
		//如果位置上有数字就接着 生成随机数
		 randx=parseInt(Math.floor(Math.random() * 4)) ;
		 randy=parseInt(Math.floor(Math.random() * 4)) ;
		 times ++;
	}
	if(times==50){
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				if(board[i][j] == 0){
					randx=i;
					randy=j;
				}
			}
		}
	}

	//随机一个数字
	//随机生成2或者4
	//用random生成一个随机的浮点数如果浮点数小于0.5就生成2否则就生成4
	//巧妙使用Math.random 以 5 5成的概率随机生成 2和4
	var randNumber=Math.random() < 0.5 ? 2 : 4;
	//放到位置上
	board[randx][randy]=randNumber;
	//生成数字有一个动画效果
	showNumberWithAnimation(randx,randy,randNumber);
	return true;
}
//响应键盘事件
$(document).keydown(function(event){
	//组织按键默认行为
	event.preventDefault();

	switch(event.keyCode){
		case 37: //left
			//所有数字如果能像左移动都会像左移动
			if(moveLeft()){
				//如果移动成功就新生成一个数字
				setTimeout("generateOneNumber()",210);
				//判断当前游戏是否结束
				setTimeout("isgameover()",300);
			}
			break;
		case 38: //top
			if(moveTop()){
				//如果移动成功就新生成一个数字
				setTimeout("generateOneNumber()",210);
				//判断当前游戏是否结束
				setTimeout("isgameover()",300);
			}
			break;
		case 39: //right
			if(moveRight()){
				//如果移动成功就新生成一个数字
				setTimeout("generateOneNumber()",210);
				//判断当前游戏是否结束
				setTimeout("isgameover()",300);

			}
			break;
		case 40: //down
			if(moveDown()){
				//如果移动成功就新生成一个数字
				setTimeout("generateOneNumber()",210);
				//判断当前游戏是否结束
				setTimeout("isgameover()",300);
			}
			break;
		default:
			break;		
	}
})
//移动端触控事件
//触摸开始

//events.touches 存储坐标
document.addEventListener('touchstart',function(event){
	//取得坐标
	startX=event.touches[0].pageX;
	startY=event.touches[0].pageY;
})
//阻止触摸的默认行为
document.addEventListener('touchmove',function(event){
	event.preventDefault();
})
//触摸结束
document.addEventListener('touchend',function(event){
	endX=event.changedTouches[0].pageX;
	endY=event.changedTouches[0].pageY;


	var deltaX=endX-startX;
	var deltaY=endY-startY;
	//判断 如果用户 移动范围小到一定程度 就判断他没有移动 而是点击 
	if(Math.abs(deltaX) < 0.3*documentWidth && Math.abs(deltaY)<0.3*documentWidth){
		return;
	}
	//x轴滑动
	if(Math.abs(deltaX)>=Math.abs(deltaY)){
			
			if(deltaX>0){
				//右滑动
				if(moveRight()){
				//如果移动成功就新生成一个数字
				setTimeout("generateOneNumber()",210);
				//判断当前游戏是否结束
				setTimeout("isgameover()",300);

				}

			}else{
				//左滑动
				if(moveLeft()){
				//如果移动成功就新生成一个数字
				setTimeout("generateOneNumber()",210);
				//判断当前游戏是否结束
				setTimeout("isgameover()",300);
				}

			}
	}
	else{
		//Y轴滑动
		if(deltaY>0){
			//向下滑动
			if(moveDown()){
				//如果移动成功就新生成一个数字
				setTimeout("generateOneNumber()",210);
				//判断当前游戏是否结束
				setTimeout("isgameover()",300);
			}
		}else{
			//向上滑动
			if(moveTop()){
				//如果移动成功就新生成一个数字
				setTimeout("generateOneNumber()",210);
				//判断当前游戏是否结束
				setTimeout("isgameover()",300);
			}
		}

	}
})
//游戏结束
function isgameover(){
	if(nospace(board)&&nomove(board)){
		gameover();
	}
}
function gameover(){
	alert("游戏结束~小傻子")
}
//左移
function moveLeft(){
	//判断当前是否可以向左移动
	if(!canMoveLeft(board)){
		return false;
	}
	//对需要判断的后三列进行遍历
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			//只要当前块数字不等于0就有可能可以移动
			if(board[i][j]!=0){
				//对当前 元素左侧的所有元素进行遍历
				for(var k=0;k<j;k++){
					//判断左侧的是不是没有数字 并且 路程中没有障碍物 
					if(board[i][k] == 0 && noBlockHorizontal(i,k,j,board)){
						// 可以移动
						showMoveAnimation(i,j,i,k);
						//在当前判断下 i,k 是没有元素的(i,k就是左侧的元素)
						//所以i,k赋值为i,j
						board[i][k]=board[i][j]
						board[i][j]=0;
						continue;
					}
					//如果左侧的值和当前值是相等的 并且中间没有障碍物而且hasconficted的值是false 也可以移动
					else if(board[i][k] == board[i][j] &&noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]){
						//可以移动并且 数字叠加
						showMoveAnimation(i,j,i,k);
						//两个位置数字叠加
						board[i][k]=board[i][k]+board[i][j]
						board[i][j]=0;
						//加分
						score +=board[i][k]
						//把加完的分数更新到前台
						updateScore(score);
						//发生叠加以后把hasconficted的值设置为ture 表示 这个格子已经叠加过了
						hasConflicted[i][k]=true;
						continue;
					}
				}
			}
		}
	}
	//重置界面显示数字
	setTimeout("updateBoardView()",200);
	return true;
}
//右移动
function moveRight(){
	if(!canMoveRight(board)){
		return false;
	}
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(board[i][j] !=0){
				for(var k=3;k>j;k--){
					if(board[i][k] ==0 && noBlockHorizontal(i,k,j,board)){
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[i][k] == board[i][j] &&noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]){
						//可以移动并且 数字叠加
						showMoveAnimation(i,j,i,k);
						//两个位置数字叠加
						board[i][k]=board[i][k]+board[i][j]
						board[i][j]=0;
						//加分
						score +=board[i][k]
						//把加完的分数更新到前台
						updateScore(score);
						//发生叠加以后把hasconficted的值设置为ture 表示 这个格子已经叠加过了
						hasConflicted[i][k]=true;
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}

function moveTop(){
	if(!canMoveUp(board)){
		return false;
	}
	for(var j=0;j<4;j++){
		for(var i=1;i<4;i++){
			if(board[i][j]!=0){
				for(var k=0;k<i;k++){
					//判断左侧的是不是没有数字 并且 路程中没有障碍物 
					if(board[k][j] == 0 && noBlockVerticall(j,k,i,board)){
						// 可以移动
						showMoveAnimation(i,j,k,j);
						//在当前判断下 i,k 是没有元素的(i,k就是左侧的元素)
						//所以i,k赋值为i,j
						board[k][j]=board[i][j]
						board[i][j]=0;
						continue;
					}
					//如果左侧的值和当前值是相等的 并且中间没有障碍物 也可以移动
					else if(board[k][j] == board[i][j] &&noBlockVerticall(j,k,i,board) && !hasConflicted[k][j]){
						//可以移动并且 数字叠加
						showMoveAnimation(i,j,k,j);
						//两个位置数字叠加
						board[k][j] *=2;
						board[i][j]=0;
						//加分
						score +=board[k][j]
						//把加完的分数更新到前台
						updateScore(score);
						//发生叠加以后把hasconficted的值设置为ture 表示 这个格子已经叠加过了
						hasConflicted[k][j]=true;
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}

function moveDown(){
	if(!canMoveDown(board)){
		return false;
	}
	for(var j=0;j<4;j++){
		for(var i=2;i>=0;i--){
			if(board[i][j] !=0){
				for(var k=3;k>i;k--){
					if(board[k][j] ==0 && noBlockVerticall(j,i,k,board)){
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[k][j] == board[i][j] &&noBlockVerticall(j,i,k,board) && !hasConflicted[k][j]){
						//可以移动并且 数字叠加
						showMoveAnimation(i,j,k,j);
						//两个位置数字叠加
						board[k][j]*=2;
						board[i][j]=0;
						//加分
						score +=board[k][j]
						//把加完的分数更新到前台
						updateScore(score);
						//发生叠加以后把hasconficted的值设置为ture 表示 这个格子已经叠加过了
						hasConflicted[k][j]=true;
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}