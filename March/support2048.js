//获取当前设备屏幕的宽度
documentWidth=window.screen.availWidth;
//主体宽度
gridContainerWidth=0.92 *documentWidth;
//每个格子的宽度
cellSideLength=0.18*documentWidth;
//每个格子的距离
cellSpace=0.04*documentWidth;
//根据I和j获取每个小格子的top值
function getPosTop(i,j){
	return cellSpace + i*(cellSpace+cellSideLength);
}
//根据I和j获取每个小格子的left值
function getPosLeft(i,j){
	return cellSpace + j*(cellSpace+cellSideLength);
}

//根据数值来设置背景色
function getNumberBackgroundColor(number){
 switch(number){
 	case 2:
 		return "#eee4de";
 		break;
 	case 4:
 		return "#ede0c8";
 		break;
 	case 8:
 		return "#CCC200";
 		break;
 	case 16:
 		return "#f59563";
 		break;
 	case 32:
 		return "#f67e5f";
 		break;
 	case 64:
 		return "#f65e3b";
 		break;
 	case 128:
 		return "#edcf72";
 		break;
 	case 256:
 		return "#edcc61";
 		break;
 	case 512:
 		return "#9c0";
 		break;
 	case 1024:
 		return "#33b5e5";
 		break;
 	case 2048:
 		return "#09c";
 		break;
 	case 4096:
 		return "#a6c";
 		break;
 	case 8192:
 		return "#93c";
 		break;			
 }
 return black;
}

function getNumberColor(number){
	if(number <=4){
		return "#776e65"
	}
	return "white";
}
//根据数字来显示文字内容
function getNumberText( number ){
    switch( number ){
        case 2:return "练气";break;
        case 4:return "筑基";break;
        case 8:return "结丹";break;
        case 16:return "元婴";break;
        case 32:return "化神";break;
        case 64:return "婴变";break;
        case 128:return "问鼎";break;
        case 256:return "阴虚阳实";break;
        case 512:return "碎涅三境";break;
        case 1024:return "空涅";break;
        case 2048:return "空灵";break;
        case 4096:return "空玄";break;
        case 8192:return "空劫";break;
    }

    return "black";
}
function nospace(board){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j] == 0){
				return false;
			}
		}
	}
	return true;
}

//判断能不能向左移动
function canMoveLeft(board){
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			//左边第0列不需要遍历 所以 J=1
			//如果ij不等于0 相当格子于存在数字的话
			
			if(board[i][j]!==0){
				//如果这个格子左侧的元素为0 说明可以向左移动
				//如果左侧元素等于当前自己元素上的数字 那么这两个格子的元素就可以合并 依然可以向左移动
				if(board[i][j-1] == 0 || board[i][j-1] == board[i][j]){
					return true;

				}
				
				
			}
		}
	}
	//整个循环还不能 向左移动的话 就 返回false;
	return false;

}
function canMoveRight(board){
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(board[i][j]!=0){
				if(board[i][j+1]==0 || board[i][j+1]==board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}



function canMoveUp(board){
	for(var j=0;j<4;j++){
		for(var i=1;i<4;i++){
			if(board[i][j]!=0){
				if(board[i-1][j]==0 || board[i-1][j]==board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}
function canMoveDown(board){
	for(var j=0;j<4;j++){
		for(var i=2;i>=0;i--){
			if(board[i][j]!=0){
				if(board[i+1][j] == 0 || board[i+1][j] == board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}
//判断移动过程中有没有障碍
function noBlockHorizontal(row,col1,col2,board){
	for(var i=col1 +1;i<col2;i++){
		//如果过程中有不等于0的元素相当于有障碍物
		if(board[row][i]!=0){
			return false;
		}
	}
	return true;
}
//
function noBlockVerticall(col,row1,row2,board){
	for(var i=row1+1;i<row2;i++){
		if(board[i][col]!=0){
			return false;
		}
	}
	return true;
}

function nomove(board){
	if(canMoveLeft(board) ||
		canMoveDown(board)||
		canMoveUp(board) ||
		canMoveRight(board)
		){
		return false;
	}
	return true;
}