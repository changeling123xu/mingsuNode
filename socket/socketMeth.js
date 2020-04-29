export function addUser(data){
	data = data || {};

	var uid = data.id || '',
		name = data.name || '';

	//没有UID或者昵称, 或者已经存在的, 触发 error
	if(!uid || !name || typeof onlineUsers[uid] !== 'undefined'){
		this.emit('error');
		return;
	}

	//将 UID 记录至当前的 socket 中, 以便在 disconnect 时使用
	this.uid = uid;

	onlineUsers[uid] = {
		uid: uid,
		name: name,
		type: data.type === 1 ? 1 : 0,
		available: data.type === 1,
		socket: this
	};

	if(onlineUsers[uid].type === 1){//如果是客服
		log(name, '\t登入系统!');

		this.emit('log', '欢迎登陆!');
	}else{//普通用户, 则自动查找客服
		log(name, '\t来了...');

		this.emit('log', '连接成功, 正在为你转接客服... ');

		tryFindKefuForUid(uid);
	}
}

export function removeUser(){
	var uid = this.uid,
		user = onlineUsers[uid];

	if(!uid || !user){
		return;
	}

	log(user.name, '\t关闭了会话!');

	var target = user.target;

	if(target){
		switch(user.type){
			case 1://客服
				if(target.socket){
					target.socket.emit('log', '客服已退出会话!');
					target.socket.emit('error');
				}
				break;
			default:
				target.available = true;//恢复 与当前访客所关联的那个 客服的可用状态

				if(target.socket){//告诉客服和你会话的这个人,关闭了连接
					target.socket.emit('log', '访客已关闭会话');
				}
				break;
		}

		delete target.target;//断开 关联
		delete user.target;//断开 关联
	}

	clearTimeout(timers[uid]);

	target = user = null;

	//从在线用户列表中, 删除这个用户
	delete onlineUsers[uid];
}

export function onMessage(data){
	data = data || {};

	var uid = this.uid,
		message = data.message,
		user = onlineUsers[uid];


	//没有UID, 或者UID是无效的, 或者这个用户没有与之关联的那个人, 或者 没有消息, 则什么也不做
	if(!uid || !user || !user.target || !message){
		return;
	}

	log(user.name, ':', message);

	//将消息转发到与当前用户对应的那个人身上 =,=
	user.target.socket.emit('new message', {username:user.name, message: message});
}

export function onError(e){
	if(e){
		var user = onlineUsers[this.uid];

		if(user){
			log(user.name, e);
		}else{
			log(this.uid, e);
		}

		//出错时, 尝试将当前 socket 所对应的用户 从 onlineUser 中移除掉
		removeUser.call(this);
	}
}
