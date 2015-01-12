/*

Infratus methods

*/

/*
var pipeline = [
		{$match:{common_name:"Piotr_Stypula"}},
		{$group: {_id:"$common_name", bytes_sent: {$sum:"$bytes_sent"}, bytes_received: {$sum:"$bytes_received"}}}
	];
var res = collOvpnClientsHistory.aggregate(pipeline);
console.log("CLIENTS: "+EJSON.stringify(res));
*/
//
// EOF
//