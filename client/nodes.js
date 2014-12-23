Template.nodes.helpers({

    // We called example_settings when calling the volcanoTable template
    example_settings : function() {

        return {
			collection: collNodes,
			fields: [
				/*{
					key: 'name',
					label: 'Name',
					input: 'text',
					required: true,
					filter: true
				},*/
				{
					key: 'title',
					label: 'Title',
					input: 'text',
					required: true,
					filter: true
				},
				{
					key: 'host',
					label: 'Host',
					input: 'text',
					required: true,
					filter: true
				},
				{
					key: 'type',
					label: 'Device type',
					input: 'text',
					required: true,
					filter: true
				},
				{
					key: 'parents',
					label: 'Location',
					input: 'text',
					required: false,
					filter: true,
					fn: function(value, record) {
						var ret = '?';
						//console.log("group: "+record.parents[0]);
						res = collNodesGroups.find({name: record.parents[0]}).fetch();
						//console.log(EJSON.stringify(res));
						return res.title;
					}
					
				},
				{
					key: 'last_check_res',
					label: 'Status',
					input: 'text',
					required: true,
					filter: false,
					fn: function(value, record) {
						//console.log("value="+value+", record="+EJSON.stringify(record));
						var ret = "unknown";
						for (var i=0, len=record.services.length; i<len; i++){
							//console.log("type: "+record.services[i].type);
							if (record.services[i].enable){
								if (record.services[i].last_check_res !== 'OK'){
									ret = 'ERROR';
									break;
								};
								ret = 'OK';
							};
						};
						return ret;
					}
				},
			]
		}
	}
});

/*
Template.volcanotable_example.helpers({

    // We called example_settings when calling the volcanoTable template
    example_settings : function() {

        return {

            // The collection that the data is coming from
            collection : Clients,

            // Additionally, 'where' can be used here as well and will filter out results that are already published
            where : {
                location : 'Tampa'
            },

            fields : [
                {
                    // Defines the field in the collection
                    key      : 'name',

                    // Displays in the header of the table
                    label    : 'Client Name',

                    // Specifies that this field will be editable with an input of type text
                    input    : 'text',

                    // Specify additional attributes for this field
                    input_attributes : {
                        'class'        : 'name_class',
                        'data-example' : 'yes'
                    }

                    // Indicates that this is a required field
                    // when inserting or updating the field
                    required : true,

                    // When filtering, lets us know we can filter on this field
                    filter   : true
                },
                {
                    key    : 'location',
                    label  : 'Location',
                    input  : 'text',
                    filter : true
                },
                {
                    key    : 'phone',
                    label  : 'Phone',
                    input  : 'text',
                    filter : true
                },
                {
                    key    : 'annual_sales',
                    label  : 'Annual Sales',
                    fn     : function(value, record) {
                        var sales = record.annual_sales;
                        if(!sales) {
                            return;
                        }

                        var parts = sales.toString().split(".");
                        parts[0]  = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                        return parts.join(".");
                    }
                }
            ]
        };
    }
});
*/