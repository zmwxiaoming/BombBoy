class Lobby extends BaseScene implements eui.UIComponent {


	private avatarView: eui.Group;
	private nameView: eui.Label;
	private btnChaosFaction: eui.Button; //  乱斗模式

	public constructor() {
		super();
		console.log('[INFO] Lobby');

	}
	public onShow(par) {
		console.log("[Lobby] onShow:" + par);
		super.onShow(par);
		if (par != null) {
			Toast.show("检测到掉线,正在重连");
			setTimeout(function () {
				SceneManager.showScene(TeamReady, par);
			}.bind(this), 1000);
		}
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance)
		switch (partName) {
			case "avatar":
				this.avatarView = instance;
				break;
			case "name":
				this.nameView = instance;
				break;
			case "chaos_faction":
				this.btnChaosFaction = instance;
				break;
		}
	}

	public onCreated(): void {
		console.log("[Lobby] [onCreated] " + this.name);
		let ImageX = 0, ImageY = 0, ImageWidth = 72, ImageHeight = 72;
		ImageLoader.showAsyncByCrossUrl(this.avatarView, GameData.avatar, ImageX, ImageY, ImageWidth, ImageHeight);
		this.nameView.text = GameData.userID + "";
		this.btnChaosFaction.enabled = false;
		RombBoyMatchvsEngine.getInstance.setReconnectTimeOut();
	}


	public onClick(name: string, v: egret.DisplayObject) {
		switch (name) {
			case "back":
				RombBoyMatchvsEngine.getInstance.loginOut();
				SceneManager.back();
				break;
			case "chaos_faction":
				Toast.show("暂未开放，敬请期待");
				break;
			case "player_team":
				egret.log("组队开始");
				SceneManager.showScene(TeamReady);
				break;
		}
	}

}