var body = JSON["parse"]($response["body"]);
body.vipList = [{
	isAutoDeduct: "0",
	isYear: "1",
	payId: "0",
	isVip: "1",
	vipLevel: "7",
	register: "0",
	expireDate: "20991231",
	payName: "---",
	vipDayGrow: "20",
	vipGrow: "840",
	vasid: "2",
	vasType: "5"
}];
$done({ body: JSON["stringify"](body) });
